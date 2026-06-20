const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

if (typeof fetch !== "function") {
  throw new Error("Node 18 vagy ujabb verzio kell a bepitett fetch miatt.");
}

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const TOKEN_STORE_PATH = path.join(ROOT, ".data", "google-business-token.json");
const SITE_REVIEWS_PATH = path.join(ROOT, ".data", "site-reviews.json");
const REVIEW_CACHE_TTL_MS = Number(process.env.GOOGLE_BUSINESS_CACHE_TTL_MS || 300000);
const BUSINESS_SCOPE = "https://www.googleapis.com/auth/business.manage";
const oauthStates = new Map();
const reviewsCache = new Map();
const rateLimitBuckets = new Map();

const SECURITY_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
  ].join("; "),
  "Permissions-Policy": "camera=(), microphone=(), payment=(), usb=(), geolocation=(self)",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

const RATE_LIMITS = {
  googleBusinessRead: { windowMs: 60 * 1000, max: 20 },
  googleBusinessRefresh: { windowMs: 5 * 60 * 1000, max: 2 },
  oauthStart: { windowMs: 5 * 60 * 1000, max: 4 },
  siteReviewsPost: { windowMs: 60 * 1000, max: 8 },
};

const BLOCKED_STATIC_SEGMENTS = new Set([
  ".agents",
  ".codex",
  ".data",
  ".git",
  ".github",
  "node_modules",
]);

const BLOCKED_STATIC_FILES = new Set([
  ".env",
  ".env.development",
  ".env.local",
  ".env.production",
  "google-business-token.json",
  "site-reviews.json",
]);

loadDotEnv(path.join(ROOT, ".env"));

const MIME_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
};

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
}

function httpError(statusCode, message, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function withSecurityHeaders(headers = {}) {
  return {
    ...SECURITY_HEADERS,
    ...headers,
  };
}

function getClientIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor || "";
  return (forwardedValue.split(",")[0] || request.socket.remoteAddress || "unknown").trim();
}

function checkRateLimit(request, key, options) {
  const now = Date.now();
  const bucketKey = `${key}:${getClientIp(request)}`;
  const bucket = rateLimitBuckets.get(bucketKey);

  if (!bucket || now - bucket.startedAt > options.windowMs) {
    rateLimitBuckets.set(bucketKey, {
      count: 1,
      startedAt: now,
    });
    return;
  }

  bucket.count += 1;

  if (bucket.count > options.max) {
    throw httpError(429, "Tul sok keres. Kerlek, probald ujra kesobb.");
  }

  if (rateLimitBuckets.size > 1000) {
    for (const [existingKey, existingBucket] of rateLimitBuckets.entries()) {
      if (now - existingBucket.startedAt > 10 * 60 * 1000) {
        rateLimitBuckets.delete(existingKey);
      }
    }
  }
}

function isLocalRequest(request) {
  const host = String(request.headers.host || "").split(":")[0].toLowerCase();
  const remoteAddress = String(request.socket.remoteAddress || "");

  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    remoteAddress === "127.0.0.1" ||
    remoteAddress === "::1" ||
    remoteAddress === "::ffff:127.0.0.1"
  );
}

function requireGoogleBusinessApiAccess(request) {
  const expectedToken = process.env.GOOGLE_BUSINESS_ADMIN_TOKEN || "";

  if (expectedToken) {
    const providedHeader = request.headers["x-admin-token"];
    const providedToken = Array.isArray(providedHeader) ? providedHeader[0] : providedHeader || "";
    const expectedBuffer = Buffer.from(expectedToken);
    const providedBuffer = Buffer.from(providedToken);

    if (
      expectedBuffer.length === providedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, providedBuffer)
    ) {
      return;
    }

    throw httpError(401, "Hianyzik vagy ervenytelen az admin API token.");
  }

  if (isLocalRequest(request)) {
    return;
  }

  throw httpError(403, "A Google Business API vegpontok csak helyben vagy admin tokennel erhetoek el.");
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  response.writeHead(statusCode, withSecurityHeaders({
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "application/json; charset=utf-8",
  }));
  response.end(body);
}

function sendHtml(response, statusCode, html) {
  response.writeHead(statusCode, withSecurityHeaders({
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(html),
    "Content-Type": "text/html; charset=utf-8",
  }));
  response.end(html);
}

function redirect(response, location) {
  response.writeHead(302, withSecurityHeaders({
    Location: location,
    "Cache-Control": "no-store",
  }));
  response.end();
}

function getRequestOrigin(request) {
  const protocolHeader = request.headers["x-forwarded-proto"];
  const protocol = Array.isArray(protocolHeader)
    ? protocolHeader[0]
    : protocolHeader || "http";

  return `${protocol}://${request.headers.host}`;
}

function getGoogleConfig(request) {
  return {
    accountName: process.env.GOOGLE_BUSINESS_ACCOUNT_NAME || "",
    clientId: process.env.GOOGLE_BUSINESS_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_BUSINESS_CLIENT_SECRET || "",
    locationName: process.env.GOOGLE_BUSINESS_LOCATION_NAME || "",
    locationTitleMatch: process.env.GOOGLE_BUSINESS_LOCATION_TITLE_MATCH || "",
    redirectUri:
      process.env.GOOGLE_BUSINESS_REDIRECT_URI ||
      `${getRequestOrigin(request)}/api/google-business/oauth/callback`,
  };
}

function getStoredTokenData() {
  if (!fs.existsSync(TOKEN_STORE_PATH)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(TOKEN_STORE_PATH, "utf8"));
  } catch {
    return null;
  }
}

async function saveStoredTokenData(tokenData) {
  await fsp.mkdir(path.dirname(TOKEN_STORE_PATH), { recursive: true });
  await fsp.writeFile(
    TOKEN_STORE_PATH,
    JSON.stringify(
      {
        ...tokenData,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );
}

function getRefreshToken() {
  const storedTokenData = getStoredTokenData();
  return process.env.GOOGLE_BUSINESS_REFRESH_TOKEN || storedTokenData?.refresh_token || "";
}

function buildGoogleReviewsUrl(locationTitle) {
  const title = locationTitle || "Gyros Box Gyongyos";
  return `https://www.google.com/search?q=${encodeURIComponent(`${title} velemenyek`)}`;
}

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function clampReviewRating(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.max(1, Math.min(5, Math.round(numeric)));
}

function sanitizeStoredSiteReview(entry, index = 0) {
  const name = String(entry?.name || "").trim();
  const text = String(entry?.text || "").trim();
  const rating = clampReviewRating(entry?.rating);
  const createdAt = Number.isFinite(Date.parse(entry?.createdAt || ""))
    ? new Date(entry.createdAt).toISOString()
    : new Date().toISOString();
  const id = String(entry?.id || `site-review-${index + 1}`).trim() || `site-review-${index + 1}`;

  if (!name || !text || !rating) {
    return null;
  }

  return {
    createdAt,
    id,
    name,
    rating,
    text,
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let totalLength = 0;

  for await (const chunk of request) {
    totalLength += chunk.length;

    if (totalLength > 1024 * 1024) {
      throw httpError(413, "Tul nagy kerestestorzs.");
    }

    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");

  if (!rawBody.trim()) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw httpError(400, "Ervenytelen JSON kerestest.");
  }
}

async function getStoredSiteReviews() {
  if (!fs.existsSync(SITE_REVIEWS_PATH)) {
    return [];
  }

  try {
    const parsed = JSON.parse(await fsp.readFile(SITE_REVIEWS_PATH, "utf8"));
    const reviews = Array.isArray(parsed) ? parsed : parsed?.reviews;
    return Array.isArray(reviews) ? reviews : [];
  } catch {
    return [];
  }
}

async function saveStoredSiteReviews(reviews) {
  await fsp.mkdir(path.dirname(SITE_REVIEWS_PATH), { recursive: true });
  await fsp.writeFile(
    SITE_REVIEWS_PATH,
    JSON.stringify(
      {
        reviews,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function listSiteReviews() {
  const stored = await getStoredSiteReviews();

  return stored
    .map((entry, index) => sanitizeStoredSiteReview(entry, index))
    .filter(Boolean)
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
}

function buildSiteReviewsPayload(reviews) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1))
    : 0;

  return {
    averageRating,
    reviews,
    totalReviews,
  };
}

function cleanupOauthStates() {
  const now = Date.now();

  for (const [state, createdAt] of oauthStates.entries()) {
    if (now - createdAt > 15 * 60 * 1000) {
      oauthStates.delete(state);
    }
  }
}

function buildOauthStartUrl(request) {
  cleanupOauthStates();

  const config = getGoogleConfig(request);

  if (!config.clientId || !config.clientSecret) {
    throw httpError(
      400,
      "Hianyzik a GOOGLE_BUSINESS_CLIENT_ID vagy a GOOGLE_BUSINESS_CLIENT_SECRET.",
    );
  }

  const state = crypto.randomBytes(24).toString("hex");
  oauthStates.set(state, Date.now());

  const params = new URLSearchParams({
    access_type: "offline",
    client_id: config.clientId,
    prompt: "consent",
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: BUSINESS_SCOPE,
    state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeCodeForTokens(request, code) {
  const config = getGoogleConfig(request);
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw httpError(502, "Nem sikerult a Google OAuth token csere.", errorText);
  }

  return tokenResponse.json();
}

async function getAccessToken(request) {
  const config = getGoogleConfig(request);
  const refreshToken = getRefreshToken();

  if (!config.clientId || !config.clientSecret) {
    throw httpError(
      400,
      "Hianyzik a Google Business Profile OAuth beallitas.",
      {
        required: [
          "GOOGLE_BUSINESS_CLIENT_ID",
          "GOOGLE_BUSINESS_CLIENT_SECRET",
        ],
      },
    );
  }

  if (!refreshToken) {
    throw httpError(
      401,
      "Nincs Google refresh token. Elobb engedelyezni kell az OAuth kapcsolatot.",
      {
        oauthStartUrl: buildOauthStartUrl(request),
      },
    );
  }

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw httpError(502, "Nem sikerult friss access tokent kerni a Google-tol.", errorText);
  }

  const tokenPayload = await tokenResponse.json();

  if (!tokenPayload.access_token) {
    throw httpError(502, "A Google token valaszbol hianyzik az access token.");
  }

  return tokenPayload.access_token;
}

async function googleApiJson(url, accessToken) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw httpError(502, "Google Business Profile API hiba.", errorText);
  }

  return response.json();
}

async function listAccounts(accessToken) {
  const payload = await googleApiJson(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    accessToken,
  );

  return payload.accounts || [];
}

async function listLocationsForAccount(accessToken, accountName) {
  const locations = [];
  let pageToken = "";

  do {
    const url = new URL(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
    );
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("readMask", "name,title,metadata.placeId");

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const payload = await googleApiJson(url.toString(), accessToken);
    locations.push(...(payload.locations || []));
    pageToken = payload.nextPageToken || "";
  } while (pageToken);

  return locations;
}

async function getLocationDetails(accessToken, locationName) {
  const url = new URL(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${locationName}`,
  );
  url.searchParams.set("readMask", "name,title,metadata.placeId");
  return googleApiJson(url.toString(), accessToken);
}

function pickMatchingLocation(locations, titleMatch) {
  const normalizedNeedle = normalizeText(titleMatch);

  if (!normalizedNeedle) {
    return null;
  }

  const exactMatch = locations.find(
    (location) => normalizeText(location.title) === normalizedNeedle,
  );

  if (exactMatch) {
    return exactMatch;
  }

  return (
    locations.find((location) => normalizeText(location.title).includes(normalizedNeedle)) ||
    null
  );
}

async function resolveLocation(accessToken, request) {
  const config = getGoogleConfig(request);

  if (config.locationName) {
    try {
      const details = await getLocationDetails(accessToken, config.locationName);
      return {
        locationName: config.locationName,
        locationTitle: details.title || config.locationName,
      };
    } catch {
      return {
        locationName: config.locationName,
        locationTitle: config.locationName,
      };
    }
  }

  const accounts = config.accountName
    ? [{ name: config.accountName }]
    : await listAccounts(accessToken);

  if (!accounts.length) {
    throw httpError(404, "Nem talalhato Google Business Profile fiok.");
  }

  const allLocations = [];

  for (const account of accounts) {
    const locations = await listLocationsForAccount(accessToken, account.name);

    locations.forEach((location) => {
      allLocations.push({
        ...location,
        accountName: account.name,
      });
    });
  }

  if (!allLocations.length) {
    throw httpError(404, "Nem talalhato egyetlen kezelt hely sem a fiokban.");
  }

  if (config.locationTitleMatch) {
    const matchedLocation = pickMatchingLocation(allLocations, config.locationTitleMatch);

    if (!matchedLocation) {
      throw httpError(
        404,
        "Nem talalhato a megadott cimre illo hely.",
        {
          locationTitleMatch: config.locationTitleMatch,
        },
      );
    }

    return {
      locationName: matchedLocation.name,
      locationTitle: matchedLocation.title || matchedLocation.name,
    };
  }

  if (allLocations.length === 1) {
    return {
      locationName: allLocations[0].name,
      locationTitle: allLocations[0].title || allLocations[0].name,
    };
  }

  throw httpError(
    400,
    "Tobb hely is elerheto, ezert meg kell adni a GOOGLE_BUSINESS_LOCATION_NAME vagy GOOGLE_BUSINESS_LOCATION_TITLE_MATCH erteket.",
    {
      locations: allLocations.map((location) => ({
        name: location.name,
        title: location.title || "",
      })),
    },
  );
}

async function fetchAllReviews(accessToken, locationName, forceRefresh = false) {
  const cached = reviewsCache.get(locationName);

  if (!forceRefresh && cached && Date.now() - cached.timestamp < REVIEW_CACHE_TTL_MS) {
    return cached.payload;
  }

  const reviews = [];
  let pageToken = "";
  let averageRating = null;
  let totalReviewCount = null;

  do {
    const url = new URL(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`);
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const payload = await googleApiJson(url.toString(), accessToken);
    reviews.push(...(payload.reviews || []));
    averageRating = payload.averageRating ?? averageRating;
    totalReviewCount = payload.totalReviewCount ?? totalReviewCount;
    pageToken = payload.nextPageToken || "";
  } while (pageToken);

  const normalizedPayload = {
    averageRating,
    reviews,
    totalReviewCount: Number(totalReviewCount || reviews.length),
  };

  reviewsCache.set(locationName, {
    payload: normalizedPayload,
    timestamp: Date.now(),
  });

  return normalizedPayload;
}

async function handleOauthCallback(request, response, url) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  cleanupOauthStates();

  if (!code || !state || !oauthStates.has(state)) {
    throw httpError(400, "Ervenytelen vagy lejart OAuth callback allapot.");
  }

  oauthStates.delete(state);

  const tokenPayload = await exchangeCodeForTokens(request, code);

  if (!tokenPayload.refresh_token) {
    throw httpError(
      400,
      "A Google nem adott refresh tokent. Ellenorizd, hogy a prompt=consent futott-e.",
    );
  }

  await saveStoredTokenData(tokenPayload);

  sendHtml(
    response,
    200,
    `<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <title>Google kapcsolat kesz</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 32px; background: #111; color: #f7f0e8; }
      .card { max-width: 720px; margin: 0 auto; padding: 24px; border-radius: 18px; background: #1e1713; border: 1px solid #3a2b22; }
      a { color: #ffb85a; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Google Business Profile kapcsolat sikeres</h1>
      <p>A refresh token el lett mentve a szerveren. Most mar betoltheto az osszes review a weboldalon.</p>
      <p><a href="/">Vissza a weboldalra</a></p>
    </div>
  </body>
</html>`,
  );
}

async function handleStatus(request, response) {
  const config = getGoogleConfig(request);
  const missing = [];

  if (!config.clientId) {
    missing.push("GOOGLE_BUSINESS_CLIENT_ID");
  }

  if (!config.clientSecret) {
    missing.push("GOOGLE_BUSINESS_CLIENT_SECRET");
  }

  if (!config.locationName && !config.locationTitleMatch) {
    missing.push("GOOGLE_BUSINESS_LOCATION_NAME vagy GOOGLE_BUSINESS_LOCATION_TITLE_MATCH");
  }

  sendJson(response, 200, {
    configured: missing.length === 0,
    hasRefreshToken: Boolean(getRefreshToken()),
    locationName: config.locationName,
    locationTitleMatch: config.locationTitleMatch,
    missing,
    oauthStartUrl:
      config.clientId && config.clientSecret ? buildOauthStartUrl(request) : null,
    tokenStorePath: TOKEN_STORE_PATH,
  });
}

async function handleAccounts(request, response) {
  const accessToken = await getAccessToken(request);
  const accounts = await listAccounts(accessToken);

  sendJson(response, 200, {
    accounts: accounts.map((account) => ({
      accountName: account.accountName || "",
      name: account.name,
      type: account.type || "",
      role: account.role || "",
    })),
  });
}

async function handleLocations(request, response, url) {
  const accessToken = await getAccessToken(request);
  const requestedAccountName = url.searchParams.get("accountName");
  const accounts = requestedAccountName
    ? [{ name: requestedAccountName }]
    : await listAccounts(accessToken);
  const locations = [];

  for (const account of accounts) {
    const accountLocations = await listLocationsForAccount(accessToken, account.name);

    accountLocations.forEach((location) => {
      locations.push({
        accountName: account.name,
        name: location.name,
        placeId: location.metadata?.placeId || "",
        title: location.title || "",
      });
    });
  }

  sendJson(response, 200, { locations });
}

async function handleReviews(request, response, url) {
  const accessToken = await getAccessToken(request);
  const forceRefresh = url.searchParams.get("refresh") === "1";

  if (forceRefresh) {
    checkRateLimit(request, "google-business-refresh", RATE_LIMITS.googleBusinessRefresh);
  }

  const location = await resolveLocation(accessToken, request);
  const reviewsPayload = await fetchAllReviews(
    accessToken,
    location.locationName,
    forceRefresh,
  );

  sendJson(response, 200, {
    averageRating: reviewsPayload.averageRating,
    locationName: location.locationName,
    locationTitle: location.locationTitle,
    reviews: reviewsPayload.reviews,
    reviewsUrl: buildGoogleReviewsUrl(location.locationTitle),
    totalReviewCount: reviewsPayload.totalReviewCount,
  });
}

async function handleSiteReviewsGet(response) {
  const reviews = await listSiteReviews();
  sendJson(response, 200, buildSiteReviewsPayload(reviews));
}

async function handleSiteReviewsPost(request, response) {
  checkRateLimit(request, "site-reviews-post", RATE_LIMITS.siteReviewsPost);

  const body = await readJsonBody(request);
  const newReview = sanitizeStoredSiteReview(
    {
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      name: body.name,
      rating: body.rating,
      text: body.text,
    },
    0,
  );

  if (!newReview) {
    throw httpError(
      400,
      "A velemenyhez nev, szoveg es 1-5 kozotti ertekeles kell.",
    );
  }

  if (newReview.name.length > 40) {
    throw httpError(400, "A nev legfeljebb 40 karakter lehet.");
  }

  if (newReview.text.length < 8) {
    throw httpError(400, "A velemeny legyen legalabb 8 karakter.");
  }

  if (newReview.text.length > 400) {
    throw httpError(400, "A velemeny legfeljebb 400 karakter lehet.");
  }

  const reviews = await listSiteReviews();
  reviews.unshift(newReview);
  await saveStoredSiteReviews(reviews);

  sendJson(response, 201, buildSiteReviewsPayload(reviews));
}

function resolveStaticPath(pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const normalizedFilePath = path.resolve(ROOT, relativePath);
  const relativeFromRoot = path.relative(ROOT, normalizedFilePath);
  const pathSegments = relativeFromRoot.split(path.sep).filter(Boolean);
  const fileName = pathSegments[pathSegments.length - 1] || "";

  if (
    !relativeFromRoot ||
    relativeFromRoot.startsWith("..") ||
    path.isAbsolute(relativeFromRoot)
  ) {
    throw httpError(403, "Tiltott fajl eleres.");
  }

  if (
    pathSegments.some((segment) => BLOCKED_STATIC_SEGMENTS.has(segment)) ||
    BLOCKED_STATIC_FILES.has(fileName.toLowerCase()) ||
    fileName.toLowerCase().startsWith(".env.")
  ) {
    throw httpError(404, "A kert fajl nem talalhato.");
  }

  return normalizedFilePath;
}

async function serveStaticFile(response, urlOrPathname) {
  const pathname = typeof urlOrPathname === "string" ? urlOrPathname : urlOrPathname.pathname;
  const searchParams = typeof urlOrPathname === "string" ? new URLSearchParams() : urlOrPathname.searchParams;
  let filePath = resolveStaticPath(pathname);

  try {
    const fileStat = await fsp.stat(filePath);

    if (fileStat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const fileBuffer = await fsp.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";

    const responseHeaders = withSecurityHeaders({
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      "Content-Length": fileBuffer.length,
      "Content-Type": contentType,
    });

    if (
      extension === ".html" &&
      path.basename(filePath).toLowerCase() === "index.html" &&
      searchParams.get("mobile-preview") === "1"
    ) {
      delete responseHeaders["X-Frame-Options"];
    }

    response.writeHead(200, responseHeaders);
    response.end(fileBuffer);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw httpError(404, "A kert fajl nem talalhato.");
    }

    throw error;
  }
}

function sendApiError(response, error) {
  sendJson(response, error.statusCode || 500, {
    error: error.message || "Ismeretlen szerverhiba.",
    details: error.details || null,
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", getRequestOrigin(request));

  try {
    if (request.method === "POST" && url.pathname === "/api/site-reviews") {
      await handleSiteReviewsPost(request, response);
      return;
    }

    if (request.method !== "GET") {
      throw httpError(405, "Csak GET keresesek tamogatottak.");
    }

    if (url.pathname === "/api/site-reviews") {
      await handleSiteReviewsGet(response);
      return;
    }

    if (url.pathname === "/api/google-business/status") {
      requireGoogleBusinessApiAccess(request);
      checkRateLimit(request, "google-business-read", RATE_LIMITS.googleBusinessRead);
      await handleStatus(request, response);
      return;
    }

    if (url.pathname === "/api/google-business/oauth/start") {
      requireGoogleBusinessApiAccess(request);
      checkRateLimit(request, "oauth-start", RATE_LIMITS.oauthStart);
      redirect(response, buildOauthStartUrl(request));
      return;
    }

    if (url.pathname === "/api/google-business/oauth/callback") {
      await handleOauthCallback(request, response, url);
      return;
    }

    if (url.pathname === "/api/google-business/accounts") {
      requireGoogleBusinessApiAccess(request);
      checkRateLimit(request, "google-business-read", RATE_LIMITS.googleBusinessRead);
      await handleAccounts(request, response);
      return;
    }

    if (url.pathname === "/api/google-business/locations") {
      requireGoogleBusinessApiAccess(request);
      checkRateLimit(request, "google-business-read", RATE_LIMITS.googleBusinessRead);
      await handleLocations(request, response, url);
      return;
    }

    if (url.pathname === "/api/google-business/reviews") {
      requireGoogleBusinessApiAccess(request);
      checkRateLimit(request, "google-business-read", RATE_LIMITS.googleBusinessRead);
      await handleReviews(request, response, url);
      return;
    }

    await serveStaticFile(response, url);
  } catch (error) {
    if (url.pathname.startsWith("/api/")) {
      sendApiError(response, error);
      return;
    }

    sendHtml(
      response,
      error.statusCode || 500,
      `<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <title>Szerverhiba</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 32px; background: #111; color: #f7f0e8; }
      .card { max-width: 720px; margin: 0 auto; padding: 24px; border-radius: 18px; background: #1e1713; border: 1px solid #3a2b22; }
      pre { white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${error.statusCode || 500}</h1>
      <pre>${String(error.message || "Ismeretlen hiba.")}</pre>
    </div>
  </body>
</html>`,
    );
  }
});

server.listen(PORT, () => {
  console.log(`Helyi szerver fut: http://localhost:${PORT}`);
});
