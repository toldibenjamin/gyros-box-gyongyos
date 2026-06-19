const INTRO_ONLY_TOPBAR_PREVIEW = false;

const menuData = [
  {
    category: "Gyrosok",
    label: "Kínálat",
    description: "Klasszikus street food kedvencek friss zöldségekkel és karakteres szószokkal.",
    visual: "gyros",
    items: [
      {
        name: "Klasszikus gyros pita",
        details: "Fűszeres hús, friss saláta, paradicsom, hagyma, házi szósz.",
        price: "2490 Ft",
      },
      {
        name: "Csípős gyros box",
        details: "Ropogós hasáb, extra csípős öntet és gazdag feltét.",
        price: "2790 Ft",
      },
      {
        name: "Sajtos gyros wrap",
        details: "Lágy tortilla, olvadt sajt és szaftos gyros töltelék.",
        price: "2690 Ft",
      },
    ],
  },
  {
    category: "Tálak",
    label: "Kínálat",
    description: "Laktató összeállítások azoknak, akik teljes értékű étkezésre vágynak.",
    visual: "plate",
    items: [
      {
        name: "Gyros tál",
        details: "Hús, hasábburgonya, friss köret és választható öntet.",
        price: "3790 Ft",
      },
      {
        name: "Box mix tál",
        details: "Gyros, grill zöldségek, rizs és fokhagymás öntet.",
        price: "4290 Ft",
      },
      {
        name: "Dupla húsos tál",
        details: "Extra hús, plusz köret és gazdag saláta.",
        price: "4690 Ft",
      },
    ],
  },
  {
    category: "Italok",
    label: "Kínálat",
    description: "A gyors ebéd vagy vacsora mellé jól működő frissítő választék.",
    visual: "drink",
    items: [
      {
        name: "Üdítők",
        details: "Szénsavas és cukormentes változatok több ízben.",
        price: "590 Ft-tól",
      },
      {
        name: "Ásványvíz",
        details: "Szénsavas vagy mentes, praktikus kiszerelésben.",
        price: "450 Ft",
      },
      {
        name: "Jeges tea",
        details: "Könnyű, frissítő kísérő a fűszeres fogások mellé.",
        price: "690 Ft",
      },
    ],
  },
];

const openingHours = [
  { day: "hétfő", label: "Hétfő", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "kedd", label: "Kedd", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "szerda", label: "Szerda", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "csütörtök", label: "Csütörtök", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "péntek", label: "Péntek", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "szombat", label: "Szombat", time: "10:00-18:00", open: "10:00", close: "18:00" },
  { day: "vasárnap", label: "Vasárnap", time: "Zárva", closed: true },
];

const openingHourOverrides = {
  "2026-04-06": {
    time: "Húsvét miatt zárva",
    closed: true,
    note: "Ma Húsvét miatt zárva tartunk.",
  },
};

const HOURS_COUNTDOWN_CIRCLE_RADIUS = 48;
const HOURS_COUNTDOWN_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * HOURS_COUNTDOWN_CIRCLE_RADIUS;
let openingHoursTicker = null;

const SITE_REVIEWS_API_PATH = "/api/site-reviews";
const SITE_REVIEWS_STORAGE_KEY = "gyros-box-site-reviews";
const SITE_REVIEWS_RESET_MARKER_KEY = "gyros-box-site-reviews-reset";
const SITE_REVIEWS_RESET_VERSION = "2026-04-07-clear-tests-2";
const GOOGLE_REVIEWS_FALLBACK = {
  rating: "4,9",
  totalReviews: "460",
};

const SITE_VERSION = "v1.4.0";
const SITE_RELEASES = [
  {
    version: "v1.4.0",
    date: "2026.06.19.",
    huTitle: "Kétnyelvű oldal és étlap",
    enTitle: "Bilingual site and menu",
    huItems: [
      "Magyar és angol nyelvváltó került a felső lécbe és a mobil menübe.",
      "Angol módban az étlap nevei, leírásai és allergén címkéi is fordulnak.",
      "A nyelvváltó nagyobb, stabil zászló ikonokat kapott.",
    ],
    enItems: [
      "Hungarian and English language switcher added to the top bar and mobile menu.",
      "In English mode, menu names, descriptions and allergen labels are translated.",
      "The language switcher now uses larger, stable flag icons.",
    ],
  },
  {
    version: "v1.3.0",
    date: "2026.06.19.",
    huTitle: "Mobil rendelés és menü javítás",
    enTitle: "Mobile ordering and menu polish",
    huItems: [
      "Telefonon a Rendelés leadása gomb mindig látható lett.",
      "A Foodora és Wolt opciók a rendelés gomb fölött nyílnak meg.",
      "A mobil menü keskenyebb, egymás alatti gombos elrendezést kapott.",
    ],
    enItems: [
      "The Order button is now always visible on mobile.",
      "Foodora and Wolt options open above the order button.",
      "The mobile menu now uses a narrower stacked layout.",
    ],
  },
  {
    version: "v1.2.0",
    date: "2026.06.19.",
    huTitle: "Telefonos nézet finomítások",
    enTitle: "Mobile view improvements",
    huItems: [
      "Kompaktabb lett a nyitvatartás és a vélemények blokk telefonon.",
      "A kapcsolat oldal új háttérképeket és tisztább mobil elrendezést kapott.",
      "A 360 fokos csúszka telefonon el lett rejtve.",
    ],
    enItems: [
      "Opening hours and reviews became more compact on mobile.",
      "The contact page received new backgrounds and a cleaner mobile layout.",
      "The 360-degree slider is hidden on mobile.",
    ],
  },
  {
    version: "v1.1.0",
    date: "2026.06.19.",
    huTitle: "Új bemutatkozó rész",
    enTitle: "New intro section",
    huItems: [
      "A főcím Gyros Box Gyöngyös névre változott.",
      "A kezdő kép nagyobb, nyújtottabb és enyhén homályos lett.",
      "A bemutatkozó szöveg rövidebb, tisztább megfogalmazást kapott.",
    ],
    enItems: [
      "The main title changed to Gyros Box Gyöngyös.",
      "The hero image became larger, taller and slightly blurred.",
      "The intro copy was shortened and cleaned up.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026.06.19.",
    huTitle: "Weboldal indulás",
    enTitle: "Website launch",
    huItems: [
      "Elindult a Gyros Box Gyöngyös bemutató weboldal.",
      "Bekerült a menü, nyitvatartás, vélemények és kapcsolat rész.",
    ],
    enItems: [
      "The Gyros Box Gyöngyös showcase website launched.",
      "Menu, opening hours, reviews and contact sections were added.",
    ],
  },
];

let googleReviewsSnapshot = {
  placeName: "Gyros Box Gy&ouml;ngy&ouml;s",
  rating: GOOGLE_REVIEWS_FALLBACK.rating,
  totalReviews: GOOGLE_REVIEWS_FALLBACK.totalReviews,
  reviewsUrl: "https://www.google.com/search?q=Gyros+Box+Gy%C3%B6ngy%C3%B6s+v%C3%A9lem%C3%A9nyek",
};

const reviewSortOptions = [
  { id: "latest", label: "Leg&uacute;jabb" },
  { id: "highest", label: "Legjobb &eacute;rt&eacute;kel&eacute;s" },
  { id: "lowest", label: "Legrosszabb &eacute;rt&eacute;kel&eacute;s" },
  { id: "oldest", label: "Legr&eacute;gebbi" },
];

let reviewsData = [];

const LANGUAGE_STORAGE_KEY = "gyros-box-language";
const DAY_LABELS_EN = {
  "h\u00e9tf\u0151": "Monday",
  kedd: "Tuesday",
  szerda: "Wednesday",
  "cs\u00fct\u00f6rt\u00f6k": "Thursday",
  "p\u00e9ntek": "Friday",
  szombat: "Saturday",
  "vas\u00e1rnap": "Sunday",
};
const I18N = {
  hu: {
    title: "Gyros Box Gy\u00f6ngy\u00f6s | Friss street food Gy\u00f6ngy\u00f6s sz\u00edv\u00e9ben",
    description:
      "Gyros Box Gy\u00f6ngy\u00f6s: friss street food, gyors kiszolg\u00e1l\u00e1s, helyben fogyaszt\u00e1s, elvitel \u00e9s h\u00e1zhozsz\u00e1ll\u00edt\u00e1s Gy\u00f6ngy\u00f6s k\u00f6zpontj\u00e1ban.",
    preview: "Telefonos n&eacute;zet",
    navIntro: "Bemutatkoz&aacute;s",
    navMenu: "Men&uuml;",
    navHours: "Nyitvatart&aacute;s",
    navReviews: "V&eacute;lem&eacute;nyek",
    navContact: "Kapcsolat",
    order: "Rendel&eacute;s lead&aacute;sa",
    languageLabel: "Nyelv",
    heroEyebrow: "Gy&ouml;ngy&ouml;s street food",
    heroLead: "Friss, gyors, &iacute;zletes street food Gy&ouml;ngy&ouml;s sz&iacute;v&eacute;ben.",
    heroCopy:
      "Gyors, friss &eacute;s laktat&oacute; gyros a v&aacute;rosk&ouml;zpontban &ndash; helyben fogyaszt&aacute;sra vagy elvitelre, megb&iacute;zhat&oacute; &iacute;zekkel.",
    menuButton: "Men&uuml; megtekint&eacute;se",
    contactButton: "T&eacute;rk&eacute;p &eacute;s kapcsolat",
    dineIn: "Helyben fogyaszt&aacute;s",
    takeaway: "Elvitel",
    delivery: "H&aacute;zhozsz&aacute;ll&iacute;t&aacute;s",
    cueEyebrow: "Bels&#337; fot&oacute;k lentebb",
    cueTitle: "N&eacute;zd meg a helyet bel&uuml;lr&#337;l",
    hoursTitle: "Heti rend",
    hoursIntro:
      "H&eacute;tf&#337;t&#337;l vas&aacute;rnapig rendezve az eg&eacute;sz heti nyitvatart&aacute;s, hogy egy pillant&aacute;ssal l&aacute;sd a mai napot &eacute;s a heti ritmust.",
    hoursWeekly: "Heti nyitvatart&aacute;s",
    today: "Ma",
    todayLabel: "Mai nap",
    open: "Nyitva",
    closed: "Z&aacute;rva",
    nowOpen: "Most nyitva",
    nextOpening: "K&ouml;vetkez&#337; nyit&aacute;s",
    closesIn: "z&aacute;r&aacute;sig",
    opensIn: "nyit&aacute;sig",
    openUntil: "-ig nyitva",
    openAt: "-kor nyitunk",
    loadingHours: "Nyitvatart&aacute;s bet&ouml;lt&eacute;se...",
    contactMap: "T&eacute;rk&eacute;p",
    contactTitle: "Kapcsolatba l&eacute;pn&eacute;l vel&uuml;nk?",
    address: "C&iacute;m",
    messenger: "&Iacute;rj Messengeren",
    email: "E-mail",
    openMap: "Megnyit&aacute;s Google T&eacute;rk&eacute;pen",
    reviewsEyebrow: "Vend&eacute;gv&eacute;lem&eacute;nyek",
    reviewsSummary: "V&eacute;lem&eacute;nyek &ouml;sszefoglal&aacute;sa",
    reviewsCount: "v&eacute;lem&eacute;ny",
    reviewsUnchecked: "A v&eacute;lem&eacute;nyek nincsenek ellen&#337;rizve",
    ownReview: "Saj&aacute;t v&eacute;lem&eacute;ny",
    name: "N&eacute;v",
    rating: "&Eacute;rt&eacute;kel&eacute;s",
    review: "V&eacute;lem&eacute;ny",
    reviewPlaceholder: "&Iacute;rd meg p&aacute;r mondatban, milyen volt.",
    submit: "K&uuml;ld&eacute;s",
    footerSmall: "Helyben fogyaszt&aacute;sra, elvitelre &eacute;s rendel&eacute;sre.",
    foodoraSmall: "Gyros Box Gy&ouml;ngy&ouml;s",
    woltSmall: "Gyros Box oldal",
    versionButton: "Verzi&oacute;",
    versionEyebrow: "Weboldal friss&iacute;t&eacute;sek",
    versionTitle: "Gyros Box Gy&ouml;ngy&ouml;s verzi&oacute;",
    currentVersion: "Aktu&aacute;lis verzi&oacute;",
  },
  en: {
    title: "Gyros Box Gy\u00f6ngy\u00f6s | Fresh street food in the heart of Gy\u00f6ngy\u00f6s",
    description:
      "Gyros Box Gy\u00f6ngy\u00f6s: fresh street food, fast service, dine-in, takeaway and delivery in downtown Gy\u00f6ngy\u00f6s.",
    preview: "Phone preview",
    navIntro: "About",
    navMenu: "Menu",
    navHours: "Opening hours",
    navReviews: "Reviews",
    navContact: "Contact",
    order: "Order now",
    languageLabel: "Language",
    heroEyebrow: "Gy&ouml;ngy&ouml;s street food",
    heroLead: "Fresh, fast and tasty street food in the heart of Gy&ouml;ngy&ouml;s.",
    heroCopy:
      "Fast, fresh and filling gyros in the city center &ndash; for dine-in or takeaway, with reliable flavors.",
    menuButton: "View menu",
    contactButton: "Map and contact",
    dineIn: "Dine-in",
    takeaway: "Takeaway",
    delivery: "Delivery",
    cueEyebrow: "Interior photos below",
    cueTitle: "Take a look inside",
    hoursTitle: "Weekly schedule",
    hoursIntro:
      "Opening hours from Monday to Sunday, arranged so you can see today and the whole week at a glance.",
    hoursWeekly: "Weekly opening hours",
    today: "Today",
    todayLabel: "Today",
    open: "Open",
    closed: "Closed",
    nowOpen: "Open now",
    nextOpening: "Next opening",
    closesIn: "closing",
    opensIn: "opening",
    openUntil: " open until",
    openAt: " opens at",
    loadingHours: "Loading opening hours...",
    contactMap: "Map",
    contactTitle: "Want to contact us?",
    address: "Address",
    messenger: "Message us on Messenger",
    email: "E-mail",
    openMap: "Open in Google Maps",
    reviewsEyebrow: "Guest reviews",
    reviewsSummary: "Reviews summary",
    reviewsCount: "reviews",
    reviewsUnchecked: "Reviews are not verified",
    ownReview: "Your review",
    name: "Name",
    rating: "Rating",
    review: "Review",
    reviewPlaceholder: "Write a few sentences about your visit.",
    submit: "Send",
    footerSmall: "For dine-in, takeaway and ordering.",
    foodoraSmall: "Gyros Box Gy&ouml;ngy&ouml;s",
    woltSmall: "Gyros Box page",
    versionButton: "Version",
    versionEyebrow: "Website updates",
    versionTitle: "Gyros Box Gy&ouml;ngy&ouml;s version",
    currentVersion: "Current version",
  },
};

let currentLanguage = (() => {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "hu";
  } catch {
    return "hu";
  }
})();

function getText(key) {
  return I18N[currentLanguage]?.[key] || I18N.hu[key] || "";
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.innerHTML = value;
  }
}

function getOpeningHoursDayLabel(entry) {
  return currentLanguage === "en" ? DAY_LABELS_EN[entry.day] || entry.label : entry.label;
}

function getOpeningHoursTime(entry) {
  if (currentLanguage === "en" && entry.closed) {
    return "Closed";
  }

  return entry.time;
}

function canUseLocalStorage() {
  try {
    const testKey = "__gyros_box_reviews_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function readLocalSiteReviews() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(SITE_REVIEWS_STORAGE_KEY);
    const parsed = JSON.parse(rawValue || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalSiteReviews(reviews) {
  if (!canUseLocalStorage()) {
    return false;
  }

  try {
    window.localStorage.setItem(SITE_REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return true;
  } catch {
    return false;
  }
}

function clearStoredSiteReviewsOnce() {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    const currentVersion = window.localStorage.getItem(SITE_REVIEWS_RESET_MARKER_KEY);

    if (currentVersion === SITE_REVIEWS_RESET_VERSION) {
      return;
    }

    window.localStorage.removeItem(SITE_REVIEWS_STORAGE_KEY);
    window.localStorage.setItem(SITE_REVIEWS_RESET_MARKER_KEY, SITE_REVIEWS_RESET_VERSION);
  } catch {
    // If localStorage is blocked, there is nothing else to clean up here.
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAverageRatingValue(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return "0,0";
  }

  return numeric.toFixed(1).replace(".", ",");
}

function formatHungarianRelativeAge(ageDays) {
  const safeDays = Math.max(0, Math.round(Number(ageDays) || 0));

  if (safeDays === 0) {
    return "ma";
  }

  if (safeDays < 30) {
    return `${safeDays} napja`;
  }

  if (safeDays < 365) {
    const months = Math.max(1, Math.round(safeDays / 30));
    return `${months} h&oacute;napja`;
  }

  const years = Math.max(1, Math.round(safeDays / 365));
  return `${years} &eacute;ve`;
}

function getAgeDaysFromIsoString(value) {
  const timestamp = Date.parse(value || "");

  if (!Number.isFinite(timestamp)) {
    return 0;
  }

  const diffMs = Date.now() - timestamp;
  return Math.max(0, Math.floor(diffMs / 86400000));
}

function getStarRatingValue(value) {
  const ratings = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  if (typeof value === "number") {
    return value;
  }

  return ratings[value] || 0;
}

function buildReviewMeta(ratingValue, ageDays) {
  return `${ratingValue}/5 &bull; ${formatHungarianRelativeAge(ageDays)}`;
}

function buildStarsMarkup(value) {
  const rounded = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));

  return Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < rounded;
    return `<span class="reviews-stars__star${isFilled ? " is-filled" : ""}" aria-hidden="true">${isFilled ? "\u2605" : "\u2606"}</span>`;
  }).join("");
}

function getAverageRatingNumber() {
  const numeric = Number(String(googleReviewsSnapshot.rating || "0").replace(",", "."));
  return Number.isFinite(numeric) ? Math.max(0, Math.min(5, numeric)) : 0;
}

function getReviewDistributionStats() {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const snapshotTotal = Math.max(0, Number(googleReviewsSnapshot.totalReviews || 0));
  const total = snapshotTotal;

  if (snapshotTotal > 0) {
    const averageRating = getAverageRatingNumber();
    const profile = averageRating >= 4.8
      ? [0.92, 0.05, 0.015, 0.009, 0.006]
      : averageRating >= 4.5
        ? [0.8, 0.12, 0.04, 0.025, 0.015]
        : averageRating >= 4
          ? [0.64, 0.18, 0.09, 0.05, 0.04]
          : [0.46, 0.24, 0.14, 0.09, 0.07];
    const estimated = profile.map((share) => Math.floor(snapshotTotal * share));
    let remainder = snapshotTotal - estimated.reduce((sum, value) => sum + value, 0);

    estimated[0] += remainder;
    counts[5] = estimated[0];
    counts[4] = estimated[1];
    counts[3] = estimated[2];
    counts[2] = estimated[3];
    counts[1] = estimated[4];
  }

  return Array.from({ length: 5 }, (_, index) => {
    const stars = 5 - index;
    const count = counts[stars];
    const percentage = total ? Math.max(6, Math.round((count / total) * 100)) : 0;

    return {
      stars,
      count,
      percentage: count ? percentage : 0,
    };
  });
}

function buildReviewDistributionMarkup() {
  return getReviewDistributionStats()
    .map(
      ({ stars, percentage }) => `
        <div class="reviews-score__bar-row">
          <span class="reviews-score__bar-label">${stars}</span>
          <div class="reviews-score__bar-track" aria-hidden="true">
            <span class="reviews-score__bar-fill" style="width: ${percentage}%"></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function getReviewerInitial(name = "") {
  const decoded = decodeHtmlEntities(name).trim();
  return escapeHtml((decoded.charAt(0) || "V").toUpperCase());
}

function buildRatingStarIcon() {
  return `
    <svg class="reviews-rating-picker__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.9l2.82 5.72 6.31.92-4.56 4.45 1.08 6.28L12 17.3l-5.65 2.97 1.08-6.28L2.87 9.54l6.31-.92L12 2.9Z"></path>
    </svg>
  `;
}

function mapStoredReviewToClient(review, index) {
  const ageDays = getAgeDaysFromIsoString(review.createdAt);
  const ratingValue = Math.max(1, Math.min(5, getStarRatingValue(review.rating)));
  const tags = [];
  const dateLabel = formatHungarianRelativeAge(ageDays);

  if (ageDays <= 7) {
    tags.push("&Uacute;j");
  }

  return {
    id: escapeHtml(review.id || `site-review-${index + 1}`),
    name: escapeHtml((review.name || "Vend&eacute;g").trim()),
    meta: buildReviewMeta(ratingValue, ageDays),
    text: escapeHtml((review.text || "").trim() || "Sz&ouml;veg n&eacute;lk&uuml;li &eacute;rt&eacute;kel&eacute;s."),
    note: review.note ? escapeHtml(review.note) : "",
    tags,
    dateLabel,
    ratingValue,
    ageDays,
    relevanceRank: index + 1,
  };
}

function syncReviewsSnapshotToDom() {
  const title = document.getElementById("reviews-panel-title");
  const scoreTitle = document.getElementById("reviews-score-title");
  const scoreEmpty = document.getElementById("reviews-score-empty");
  const scoreStats = document.getElementById("reviews-score-stats");
  const scoreValue = document.getElementById("reviews-score-value");
  const scoreCount = document.getElementById("reviews-score-count");
  const scoreMeta = document.getElementById("reviews-score-meta");
  const scoreStars = document.getElementById("reviews-score-stars");
  const scoreDistribution = document.getElementById("reviews-score-distribution");
  const googleChip = document.getElementById("reviews-google-chip");
  const googleChipScore = document.getElementById("reviews-google-chip-score");
  const googleChipStars = document.getElementById("reviews-google-chip-stars");
  const googleChipCount = document.getElementById("reviews-google-chip-count");
  const googleCta = document.getElementById("reviews-google-cta");
  const formMessage = document.getElementById("reviews-form-message");
  const averageRating = getAverageRatingNumber();

  if (title) {
    title.innerHTML = getText("reviewsEyebrow");
  }

  if (scoreTitle) {
    scoreTitle.innerHTML = getText("reviewsSummary");
  }

  if (scoreEmpty) {
    scoreEmpty.hidden = true;
  }

  if (scoreStats) {
    scoreStats.hidden = false;
  }

  if (scoreValue) {
    scoreValue.textContent = googleReviewsSnapshot.rating;
  }

  if (scoreCount) {
    scoreCount.innerHTML = `${googleReviewsSnapshot.totalReviews} ${getText("reviewsCount")}`;
  }

  if (scoreMeta) {
    scoreMeta.hidden = false;
    scoreMeta.innerHTML = `${getText("reviewsUnchecked")} <span class="reviews-score__meta-info" aria-hidden="true">i</span>`;
  }

  if (scoreStars) {
    scoreStars.innerHTML = buildStarsMarkup(averageRating);
  }

  if (scoreDistribution) {
    scoreDistribution.innerHTML = buildReviewDistributionMarkup();
  }

  if (googleChip) {
    googleChip.href = googleReviewsSnapshot.reviewsUrl || "#reviews-form";
  }

  if (googleChipScore) {
    googleChipScore.textContent = googleReviewsSnapshot.rating;
  }

  if (googleChipStars) {
    googleChipStars.innerHTML = buildStarsMarkup(averageRating);
  }

  if (googleChipCount) {
    googleChipCount.textContent = `(${googleReviewsSnapshot.totalReviews})`;
  }

  if (googleCta) {
    googleCta.href = googleReviewsSnapshot.reviewsUrl || "#reviews-form";
  }

  if (formMessage && !reviewsData.length && !formMessage.dataset.locked) {
    formMessage.textContent = "";
  }
}

function applySiteReviewsPayload(payload = {}) {
  const reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
  reviewsData = reviews.map((review, index) => mapStoredReviewToClient(review, index));
  googleReviewsSnapshot = {
    ...googleReviewsSnapshot,
    placeName: escapeHtml(payload.placeName || payload.locationTitle || googleReviewsSnapshot.placeName),
    reviewsUrl: payload.reviewsUrl || googleReviewsSnapshot.reviewsUrl,
  };
  syncReviewsSnapshotToDom();
  renderReviewsBrowser();
}

function buildLocalSiteReviewsPayload(reviews) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? Number((reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews).toFixed(1))
    : 0;

  return {
    averageRating,
    reviews,
    totalReviews,
  };
}

function createLocalSiteReview(reviewInput) {
  return {
    createdAt: new Date().toISOString(),
    id: `local-review-${Date.now()}`,
    name: reviewInput.name,
    rating: reviewInput.rating,
    text: reviewInput.text,
  };
}

async function hydrateSiteReviews() {
  const total = document.getElementById("reviews-browser-total");

  try {
    if (total) {
      total.innerHTML = "V&eacute;lem&eacute;nyek bet&ouml;lt&eacute;se...";
    }

    const response = await fetch(SITE_REVIEWS_API_PATH, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Site reviews API error: ${response.status}`);
    }

    const payload = await response.json();
    applySiteReviewsPayload(payload);
  } catch (error) {
    console.warn("A sajat velemenyek nem tolthetok be, helyi tarolasra valtunk.", error);
    applySiteReviewsPayload(buildLocalSiteReviewsPayload(readLocalSiteReviews()));
  }
}

async function submitSiteReview(reviewInput) {
  let response;

  try {
    response = await fetch(SITE_REVIEWS_API_PATH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewInput),
    });
  } catch (error) {
    const reviews = readLocalSiteReviews();
    reviews.unshift(createLocalSiteReview(reviewInput));

    if (!writeLocalSiteReviews(reviews)) {
      throw new Error("Most nem sikerult elmenteni a velemenyt.");
    }

    return buildLocalSiteReviewsPayload(reviews);
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Nem sikerult elkuldeni a velemenyt.");
  }

  return payload;
}

const menuShowcaseCategories = [
  { id: "popular", label: "N&eacute;pszer&#369;", accent: "N&eacute;pszer&#369;" },
  { id: "smash-burgers", label: "Smash burgerek", accent: "Burger" },
  { id: "pitas", label: "Gyros pit&aacute;k", accent: "Pita" },
  { id: "twists", label: "Twistek", accent: "Twist" },
  { id: "plates", label: "Gyros t&aacute;lak", accent: "T&aacute;l" },
  { id: "boxes", label: "Gyros boxok", accent: "Box" },
  { id: "falafel", label: "Falafelek", accent: "Falafel" },
  { id: "snacks", label: "Snackek, Falatk&aacute;k", accent: "Snack" },
  { id: "sides", label: "K&ouml;retek", accent: "K&ouml;ret" },
  { id: "drinks", label: "&Uuml;d&iacute;t&#337;k", accent: "&Uuml;d&iacute;t&#337;" },
];

const menuCategoryLabelsEn = {
  popular: "Popular",
  "smash-burgers": "Smash burgers",
  pitas: "Gyros pitas",
  twists: "Twisters",
  plates: "Gyros plates",
  boxes: "Gyros boxes",
  falafel: "Falafel",
  snacks: "Snacks",
  sides: "Sides",
  drinks: "Drinks",
};

function getMenuCategoryLabel(category) {
  return currentLanguage === "en" ? menuCategoryLabelsEn[category.id] || category.label : category.label;
}

const menuTextTranslationsEn = [
  ["N\u00e9pszer\u0171", "Popular"],
  ["Gyros t\u00e1l", "Gyros plate"],
  ["GYROS T\u00c1L", "GYROS PLATE"],
  ["GYROS PIT\u00c1BAN", "GYROS IN PITA"],
  ["S\u00dcLTKRUMPLI CHEDDAR SAJTSZ\u00d3SSZAL", "FRIES WITH CHEDDAR CHEESE SAUCE"],
  ["G\u00d6R\u00d6G GYROS T\u00c1L", "GREEK GYROS PLATE"],
  ["Sajtos gyros t\u00e1l", "Cheese gyros plate"],
  ["Sajtos", "Cheese"],
  ["sajtos", "cheese"],
  ["ny\u00e1rsr\u00f3l vagdalt f\u0171szeres csirkecombfalatok", "spiced chicken thigh slices carved from the spit"],
  ["csirkecombfalatok", "chicken thigh pieces"],
  ["ropog\u00f3s z\u00f6lds\u00e9gekkel", "with crisp vegetables"],
  ["ropog\u00f3s z\u00f6lds\u00e9gek", "crisp vegetables"],
  ["v\u00e1laszthat\u00f3 k\u00f6ret", "side of your choice"],
  ["fejesk\u00e1poszta", "cabbage"],
  ["lila hagyma", "red onion"],
  ["k\u00edgy\u00f3uborka", "cucumber"],
  ["paradicsom", "tomato"],
  ["tzatziki\u00f6ntet", "tzatziki sauce"],
  ["feta sajt", "feta cheese"],
  ["olivabogy\u00f3", "olives"],
  ["h\u00e1zi f\u0171szers\u00f3val \u00e9s amerikai cheddar sajtsz\u00f3sszal", "with house seasoning salt and American cheddar cheese sauce"],
  ["Allerg\u00e9nek", "Allergens"],
  ["glut\u00e9n", "gluten"],
  ["tejterm\u00e9k", "dairy"],
  ["tej", "milk"],
  ["must\u00e1r", "mustard"],
  ["sz\u00f3ja", "soy"],
  ["toj\u00e1s", "egg"],
  ["di\u00f3f\u00e9le", "nuts"],
  ["szez\u00e1mmag", "sesame"],
  ["Aktu\u00e1lis \u00e1r az \u00e9tlapon", "Current price on the menu"],
  ["Friss aj\u00e1nlat", "Fresh pick"],
  ["Vend\u00e9gkedvenc", "Guest favorite"],
  ["Street food tipp", "Street food tip"],
  ["Kieg\u00e9sz\u00edt\u0151 v\u00e1laszt\u00e9k", "Extras"],
  ["Gyorsan elk\u00e9sz\u00fcl\u0151, n\u00e9pszer\u0171 fog\u00e1s a napi k\u00edn\u00e1latb\u00f3l.", "A quick, popular dish from the daily selection."],
  ["Laktat\u00f3 \u00f6ssze\u00e1ll\u00edt\u00e1s friss hozz\u00e1val\u00f3kkal \u00e9s karakteres \u00edzekkel.", "A filling choice with fresh ingredients and bold flavors."],
  ["K\u00f6nnyen v\u00e1laszthat\u00f3, n\u00e9pszer\u0171 fog\u00e1s gyors eb\u00e9dre vagy vacsor\u00e1ra.", "An easy favorite for a quick lunch or dinner."],
  ["\u00dcd\u00edt\u0151k, k\u00f6retek \u00e9s plusz felt\u00e9tek az aktu\u00e1lis k\u00edn\u00e1lat szerint.", "Drinks, sides and extra toppings depending on the current selection."],
  ["Sajtburger h\u00e1zi sz\u00f3sszal", "Cheeseburger with house sauce"],
  ["Sajtburger klasszikus", "Classic cheeseburger"],
  ["S\u00fclt krumpli cheddar sajtsz\u00f3sszal", "Fries with cheddar cheese sauce"],
  ["S\u00fclt krumpli", "Fries"],
  ["2 db h\u00faspog\u00e1csa, sajtszelet, uborkaszelet, grillezett hagyma, h\u00e1zi sz\u00f3sz", "2 beef patties, cheese slice, pickle slices, grilled onion, house sauce"],
  ["2 db h\u00faspog\u00e1csa, sajtszelet, uborkaszelet, grillezett hagyma, must\u00e1r, ketchup", "2 beef patties, cheese slice, pickle slices, grilled onion, mustard, ketchup"],
  ["2 db h\u00faspog\u00e1csa", "2 beef patties"],
  ["sajtszelet", "cheese slice"],
  ["uborkaszelet", "pickle slices"],
  ["grillezett hagyma", "grilled onion"],
  ["h\u00e1zi sz\u00f3sz", "house sauce"],
  ["h\u00e1zi f\u0171szers\u00f3val", "with house seasoning salt"],
  ["h\u00e1zi f\u0171szers\u00f3val \u00e9s amerikai cheddar sajtsz\u00f3sszal", "with house seasoning salt and American cheddar cheese sauce"],
  ["Gyros pit\u00e1ban csak h\u00fassal \u00e9s sz\u00f3sszal", "Gyros in pita with meat and sauce only"],
  ["Extra h\u00fasos gyros pit\u00e1ban", "Extra-meat gyros in pita"],
  ["Gyros pit\u00e1ban", "Gyros in pita"],
  ["nagy adag ny\u00e1rsr\u00f3l vagdalt f\u0171szeres csirkecombfalatok", "large portion of spiced chicken thigh slices carved from the spit"],
  ["nagy adag", "large portion of"],
  ["tzatziki\u00f6ntet, pita", "tzatziki sauce, pita"],
  ["Gyros twist-gyros eredeti, g\u00f6r\u00f6g lep\u00e9nykeny\u00e9rbe csavarva", "Original gyros twist wrapped in Greek flatbread"],
  ["Gyros twist extra h\u00fassal", "Gyros twist with extra meat"],
  ["Gyros twist csak h\u00fassal \u00e9s sz\u00f3sszal", "Gyros twist with meat and sauce only"],
  ["g\u00f6r\u00f6g lep\u00e9nykeny\u00e9r pir\u00edtva", "toasted Greek flatbread"],
  ["Gyros box (kis gyros t\u00e1l)", "Gyros box (small gyros plate)"],
  ["G\u00f6r\u00f6g gyros box (kis gyros t\u00e1l)", "Greek gyros box (small gyros plate)"],
  ["Sajtos gyros box (kis gyros t\u00e1l)", "Cheese gyros box (small gyros plate)"],
  ["G\u00f6r\u00f6g gyros t\u00e1l", "Greek gyros plate"],
  ["reszelt trappista sajt", "grated Trappista cheese"],
  ["Falafel pit\u00e1ban", "Falafel in pita"],
  ["Falafel t\u00e1l", "Falafel plate"],
  ["G\u00f6r\u00f6g falafel t\u00e1l", "Greek falafel plate"],
  ["Sajtos falafel t\u00e1l", "Cheese falafel plate"],
  ["falafelgoly\u00f3k ropog\u00f3s z\u00f6lds\u00e9gekkel", "falafel balls with crisp vegetables"],
  ["falafelgoly\u00f3k v\u00e1laszthat\u00f3 k\u00f6rettel", "falafel balls with a side of your choice"],
  ["falafelgoly\u00f3k", "falafel balls"],
  ["v\u00e1laszthat\u00f3 k\u00f6rettel", "with a side of your choice"],
  ["fejes k\u00e1poszta", "cabbage"],
  ["tzatziki \u00f6ntettel", "with tzatziki sauce"],
  ["tzatziki\u00f6ntettel", "with tzatziki sauce"],
  ["pit\u00e1val", "with pita"],
  ["feta sajttal, olivabogy\u00f3val", "with feta cheese and olives"],
  ["feta sajttal", "with feta cheese"],
  ["olivabogy\u00f3val", "olives"],
  ["reszelt trappista sajttal", "with grated Trappista cheese"],
  ["sajttal", "with cheese"],
  ["Hagymakarika", "Onion rings"],
  ["R\u00e1ntott trappista sajt", "Breaded Trappista cheese"],
  ["Csirke nuggets corn flakes pan\u00edrban", "Chicken nuggets in corn flakes coating"],
  ["Pan\u00edrozott mini csirkemellfil\u00e9 ropog\u00f3s bund\u00e1ban", "Breaded mini chicken breast fillets in crispy coating"],
  ["Mozzarella rudacsk\u00e1k", "Mozzarella sticks"],
  ["7db hagymakarika v\u00e1laszthat\u00f3 extr\u00e1kkal", "7 onion rings with optional extras"],
  ["2db r\u00e1ntott trappista", "2 breaded Trappista cheese pieces"],
  ["6db nuggets v\u00e1laszthat\u00f3 extr\u00e1kkal", "6 nuggets with optional extras"],
  ["3db mini csirkemellfil\u00e9 v\u00e1laszthat\u00f3 extr\u00e1kkal", "3 mini chicken breast fillets with optional extras"],
  ["5db sajtrudacska v\u00e1laszthat\u00f3 extr\u00e1kkal", "5 cheese sticks with optional extras"],
  ["Pir\u00edtott g\u00f6r\u00f6g lep\u00e9nykeny\u00e9r", "Toasted Greek flatbread"],
  ["Has\u00e1bburgonya", "Fries"],
  ["\u00c9desburgonya", "Sweet potato fries"],
  ["Friss sal\u00e1ta", "Fresh salad"],
  ["A k\u00e9p illusztr\u00e1ci\u00f3", "Image for illustration only"],
  ["Frissen v\u00e1gott ropog\u00f3s k\u00e1poszta, lilahagyma, k\u00edgy\u00f3uborka, paradicsom \u00f6sszeforgatva.", "Freshly cut crisp cabbage, red onion, cucumber and tomato mixed together."],
  ["Pepsi (0,33 l) dobozos", "Pepsi (0.33 l) can"],
  ["Pepsi max (0,33 l) dobozos", "Pepsi Max (0.33 l) can"],
  ["Dr. Pepper (0,33 l) dobozos", "Dr. Pepper (0.33 l) can"],
  ["Pepsi (0,5 l)", "Pepsi (0.5 l)"],
  ["Pepsi max (0,5 l)", "Pepsi Max (0.5 l)"],
  ["Schweppes narancs (0,5 l)", "Schweppes Orange (0.5 l)"],
  ["Schweppes tonic (0,5 l)", "Schweppes Tonic (0.5 l)"],
  ["Schweppes pink tonic (0,5 l)", "Schweppes Pink Tonic (0.5 l)"],
  ["Schweppes canada dry (0,5 l)", "Schweppes Canada Dry (0.5 l)"],
  ["Schweppes citrus mix (0,5 l)", "Schweppes Citrus Mix (0.5 l)"],
  ["Gatorade j\u00e9gm\u00e1lna (0,5 l)", "Gatorade Ice Raspberry (0.5 l)"],
  ["Lipton citrom (0,5 l)", "Lipton Lemon (0.5 l)"],
  ["Lipton \u0151szibarack (0,5 l)", "Lipton Peach (0.5 l)"],
  ["Lipton z\u00f6ld epres (0,5 l)", "Lipton Green Strawberry (0.5 l)"],
  ["Lipton z\u00f6ld (0,5 l)", "Lipton Green Tea (0.5 l)"],
  ["Toma meggy (0,5 l)", "Toma Sour Cherry (0.5 l)"],
  ["Toma multivitamin (0,5 l)", "Toma Multivitamin (0.5 l)"],
  ["Toma alma (0,5 l)", "Toma Apple (0.5 l)"],
  ["Szentkir\u00e1lyi sz\u00e9nsavas \u00e1sv\u00e1nyv\u00edz (0,5 l)", "Szentkir\u00e1lyi sparkling mineral water (0.5 l)"],
  ["Szentkir\u00e1lyi sz\u00e9nsavmentes \u00e1sv\u00e1nyv\u00edz (0,5 l)", "Szentkir\u00e1lyi still mineral water (0.5 l)"],
  ["50 Ft visszav\u00e1lt\u00e1si d\u00edj", "50 Ft deposit fee"],
  ["Ft-t\u00f3l", "Ft+"],
  ["0,5 l", "0.5 l"],
  ["0,33 l", "0.33 l"],
  ["330 ml", "330 ml"],
  ["zeller", "celery"],
];

function translateMenuTextToEnglish(value = "") {
  if (currentLanguage !== "en" || !value) {
    return value;
  }

  return [...menuTextTranslationsEn]
    .sort((first, second) => second[0].length - first[0].length)
    .reduce((currentValue, [from, to]) => currentValue.split(from).join(to), value);
}

function translateMenuTextNodesToEnglish(root) {
  if (currentLanguage !== "en" || !root) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    node.nodeValue = translateMenuTextToEnglish(node.nodeValue);
  });
}

const menuShowcaseSlots = [
  {
    title: "Friss aj&aacute;nlat",
    description: "Gyorsan elk&eacute;sz&uuml;l&#337;, n&eacute;pszer&#369; fog&aacute;s a napi k&iacute;n&aacute;latb&oacute;l.",
    price: "Aktu&aacute;lis &aacute;r az &eacute;tlapon",
  },
  {
    title: "Vend&eacute;gkedvenc",
    description: "Laktat&oacute; &ouml;ssze&aacute;ll&iacute;t&aacute;s friss hozz&aacute;val&oacute;kkal &eacute;s karakteres &iacute;zekkel.",
    price: "Aktu&aacute;lis &aacute;r az &eacute;tlapon",
  },
  {
    title: "Street food tipp",
    description: "K&ouml;nnyen v&aacute;laszthat&oacute;, n&eacute;pszer&#369; fog&aacute;s gyors eb&eacute;dre vagy vacsor&aacute;ra.",
    price: "Aktu&aacute;lis &aacute;r az &eacute;tlapon",
  },
  {
    title: "Kieg&eacute;sz&iacute;t&#337; v&aacute;laszt&eacute;k",
    description: "&Uuml;d&iacute;t&#337;k, k&ouml;retek &eacute;s plusz felt&eacute;tek az aktu&aacute;lis k&iacute;n&aacute;lat szerint.",
    price: "Aktu&aacute;lis &aacute;r az &eacute;tlapon",
  },
];

const menuShowcaseCollections = {
  "smash-burgers": {
    items: [
      {
        id: "sajtburger-hazi-szosszal",
        name: "Sajtburger h&aacute;zi sz&oacute;sszal",
        description: "2 db h&uacute;spog&aacute;csa, sajtszelet, uborkaszelet, grillezett hagyma, h&aacute;zi sz&oacute;sz",
        cardPrice: "2490 Ft",
        image: "menu-fotok/smash-burgerek/67e66b8d2138c41481a4b295.avif",
        allergens: "glut&eacute;n, szez&aacute;mmag, toj&aacute;s, sz&oacute;ja, must&aacute;r, tej",
      },
      {
        id: "sajtburger-klasszikus",
        name: "Sajtburger klasszikus",
        description: "2 db h&uacute;spog&aacute;csa, sajtszelet, uborkaszelet, grillezett hagyma, must&aacute;r, ketchup",
        cardPrice: "2490 Ft",
        image: "menu-fotok/smash-burgerek/67e66c05404d96b94e8a3100.avif",
        allergens: "glut&eacute;n, zeller, must&aacute;r, tej",
      },
      {
        id: "sult-krumpli",
        name: "S&uuml;lt krumpli",
        description: "h&aacute;zi f&#369;szers&oacute;val",
        cardPrice: "790 Ft",
        image: "menu-fotok/smash-burgerek/67e66cb583869aca4361d3a5.avif",
        allergens: "",
        badge: "N&eacute;pszer&#369;",
      },
      {
        id: "sult-krumpli-cheddar-sajtszosszal",
        name: "S&uuml;lt krumpli cheddar sajtsz&oacute;sszal",
        description: "h&aacute;zi f&#369;szers&oacute;val &eacute;s amerikai cheddar sajtsz&oacute;sszal",
        cardPrice: "1290 Ft",
        image: "menu-fotok/smash-burgerek/67e66d06404d96b94e8a3145.avif",
        allergens: "tej, sz&oacute;ja",
      },
    ],
  },
  pitas: {
    items: [
      {
        id: "gyros-pitaban-classic",
        name: "Gyros pit&aacute;ban",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet, pita",
        cardPrice: "1999 Ft",
        image: "menu-fotok/gyros-pitak/e3bcb044-667d-11ee-a0b8-cebfe8e79371_650c311db552debdde26a597.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
        badge: "N&eacute;pszer&#369;",
      },
      {
        id: "extra-husos-gyros-pitaban",
        name: "Extra h&uacute;sos gyros pit&aacute;ban",
        description:
          "nagy adag ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet, pita",
        cardPrice: "2199 Ft",
        image: "menu-fotok/gyros-pitak/efb5b512-667d-11ee-b0c9-f67bd020a477_650c311db552debdde26a599.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "gyros-pitaban-csak-hussal",
        name: "Gyros pit&aacute;ban csak h&uacute;ssal &eacute;s sz&oacute;sszal",
        description: "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, tzatziki&ouml;ntet, pita",
        cardPrice: "2299 Ft",
        image: "menu-fotok/gyros-pitak/f8791d9c-667d-11ee-8e2c-26b085e0e8a1_650c311db552debdde26a59b.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
    ],
  },
  twists: {
    items: [
      {
        id: "gyros-twist-eredeti",
        name: "Gyros twist-gyros eredeti, g&ouml;r&ouml;g lep&eacute;nykeny&eacute;rbe csavarva",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet, g&ouml;r&ouml;g lep&eacute;nykeny&eacute;r pir&iacute;tva",
        cardPrice: "2099 Ft",
        image: "menu-fotok/twistek/e3ce00ba-667d-11ee-add9-ca11b5480cb1_650c311db552debdde26a59d.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "gyros-twist-extra-hussal",
        name: "Gyros twist extra h&uacute;ssal",
        description:
          "nagy adag ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet, g&ouml;r&ouml;g lep&eacute;nykeny&eacute;r pir&iacute;tva",
        cardPrice: "2249 Ft",
        image: "menu-fotok/twistek/efb525ac-667d-11ee-8888-26b085e0e8a1_650c311db552debdde26a59f.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "gyros-twist-csak-hussal",
        name: "Gyros twist csak h&uacute;ssal &eacute;s sz&oacute;sszal",
        description: "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, tzatziki&ouml;ntet, g&ouml;r&ouml;g lep&eacute;nykeny&eacute;r pir&iacute;tva",
        cardPrice: "2399 Ft",
        image: "menu-fotok/twistek/e866f58c-667d-11ee-aa1f-bedfa7164a2f_650c311db552debdde26a5a1.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
    ],
  },
  plates: {
    items: [
      {
        id: "gyros-tal",
        name: "Gyros t&aacute;l",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet",
        cardPrice: "3349 Ft",
        image: "menu-fotok/gyros-talak/e3cedf80-667d-11ee-a691-5a478b0b3ad2_650c311db552debdde26a5a3.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
        badge: "N&eacute;pszer&#369;",
      },
      {
        id: "gorog-gyros-tal",
        name: "G&ouml;r&ouml;g gyros t&aacute;l",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), feta sajt, olivabogy&oacute;, tzatziki&ouml;ntet",
        cardPrice: "3799 Ft",
        image: "menu-fotok/gyros-talak/efb55e6e-667d-11ee-8102-fa4cbcecc809_650c311db552debdde26a5a5.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
      },
      {
        id: "sajtos-gyros-tal",
        name: "Sajtos gyros t&aacute;l",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), reszelt trappista sajt, tzatziki&ouml;ntet",
        cardPrice: "3799 Ft",
        image: "menu-fotok/gyros-talak/e3d457ee-667d-11ee-92e3-f2a1cbe7cd32_650c311db552debdde26a5a7.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
      },
    ],
  },
  boxes: {
    items: [
      {
        id: "gyros-box-kis-gyros-tal",
        name: "Gyros box (kis gyros t&aacute;l)",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet",
        cardPrice: "2499 Ft",
        image: "menu-fotok/gyros-boxok/b2e0d36c-6996-11ee-bb9e-1ed3a03f0d1e_e3cedf80_667d_11ee_a691_5a478b0b3ad2_650c311db552debdde26a5a3.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
      },
      {
        id: "gorog-gyros-box-kis-gyros-tal",
        name: "G&ouml;r&ouml;g gyros box (kis gyros t&aacute;l)",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), feta sajt, olivabogy&oacute;, tzatziki&ouml;ntet",
        cardPrice: "2749 Ft",
        image: "menu-fotok/gyros-boxok/b960b450-6996-11ee-b98d-1659f7399121_efb55e6e_667d_11ee_8102_fa4cbcecc809_650c311db552debdde26a5a5.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
      },
      {
        id: "sajtos-gyros-box-kis-gyros-tal",
        name: "Sajtos gyros box (kis gyros t&aacute;l)",
        description:
          "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), reszelt trappista sajt, tzatziki&ouml;ntet",
        cardPrice: "2749 Ft",
        image: "menu-fotok/gyros-boxok/c30e52f0-6996-11ee-ac7f-ca680d7b9413_e3d457ee_667d_11ee_92e3_f2a1cbe7cd32_650c311db552debdde26a5a7.avif",
        allergens: "tej, must&aacute;r, sz&oacute;ja",
      },
    ],
  },
  falafel: {
    items: [
      {
        id: "falafel-pitaban",
        name: "Falafel pit&aacute;ban",
        description:
          "falafelgoly&oacute;k ropog&oacute;s z&ouml;lds&eacute;gekkel (fejes k&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki &ouml;ntettel, pit&aacute;val",
        cardPrice: "1999 Ft",
        image: "menu-fotok/falafelek/e866b680-667d-11ee-b48d-7ab9acb36901_650c311db552debdde26a5af.avif",
        allergens: "glut&eacute;n, tej, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "falafel-tal",
        name: "Falafel t&aacute;l",
        description:
          "falafelgoly&oacute;k v&aacute;laszthat&oacute; k&ouml;rettel, ropog&oacute;s z&ouml;lds&eacute;gekkel (fejes k&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki &ouml;ntettel",
        cardPrice: "3349 Ft",
        image: "menu-fotok/falafelek/e8694198-667d-11ee-9b66-ea79827740a5_650c311db552debdde26a5b1.jpg",
        allergens: "glut&eacute;n, tej, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "gorog-falafel-tal",
        name: "G&ouml;r&ouml;g falafel t&aacute;l",
        description:
          "falafelgoly&oacute;k v&aacute;laszthat&oacute; k&ouml;rettel, ropog&oacute;s z&ouml;lds&eacute;gekkel (fejes k&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), feta sajttal, olivabogy&oacute;val, tzatziki&ouml;ntettel",
        cardPrice: "3799 Ft",
        image: "menu-fotok/falafelek/efb56990-667d-11ee-94fd-62cc8ce5229b_650c311db552debdde26a5b3.avif",
        allergens: "glut&eacute;n, tej, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "sajtos-falafel-tal",
        name: "Sajtos falafel t&aacute;l",
        description:
          "falafelgoly&oacute;k v&aacute;laszthat&oacute; k&ouml;rettel, ropog&oacute;s z&ouml;lds&eacute;gekkel (fejes k&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), reszelt trappista sajttal, tzatziki &ouml;ntettel",
        cardPrice: "3799 Ft",
        image: "menu-fotok/falafelek/f7d6639a-667d-11ee-b283-ca11b5480cb1_650c311db552debdde26a5b5.jpg",
        allergens: "glut&eacute;n, tej, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
    ],
  },
  snacks: {
    items: [
      {
        id: "hagymakarika",
        name: "Hagymakarika",
        description: "7db hagymakarika v&aacute;laszthat&oacute; extr&aacute;kkal",
        cardPrice: "899 Ft",
        image: "menu-fotok/snackek-falatkak/efb463f6-667d-11ee-89d2-969bc0a67c59_650c311db552debdde26a5bd.avif",
        allergens: "glut&eacute;n",
      },
      {
        id: "rantott-trappista-sajt",
        name: "R&aacute;ntott trappista sajt",
        description: "2db r&aacute;ntott trappista",
        cardPrice: "1599 Ft",
        image: "menu-fotok/snackek-falatkak/e3d8f420-667d-11ee-aabe-9e96f873ace0_650c311db552debdde26a5bf.jpg",
        allergens: "glut&eacute;n, tej, sz&oacute;ja, toj&aacute;s",
      },
      {
        id: "csirke-nuggets-corn-flakes-panirban",
        name: "Csirke nuggets corn flakes pan&iacute;rban",
        description: "6db nuggets v&aacute;laszthat&oacute; extr&aacute;kkal",
        cardPrice: "1799 Ft",
        image: "menu-fotok/snackek-falatkak/f7d6db72-667d-11ee-bba0-f2a1cbe7cd32_650c311db552debdde26a5c1.jpg",
        allergens: "glut&eacute;n",
      },
      {
        id: "panirozott-mini-csirkemellfile-ropogos-bundaban",
        name: "Pan&iacute;rozott mini csirkemellfil&eacute; ropog&oacute;s bund&aacute;ban",
        description: "3db mini csirkemellfil&eacute; v&aacute;laszthat&oacute; extr&aacute;kkal",
        cardPrice: "1799 Ft",
        image: "menu-fotok/snackek-falatkak/e866f74e-667d-11ee-bd6c-36aefba25412_650c311db552debdde26a5c3.avif",
        allergens: "glut&eacute;n, tej, toj&aacute;s, must&aacute;r, sz&oacute;ja",
      },
      {
        id: "mozzarella-rudacskak",
        name: "Mozzarella rudacsk&aacute;k",
        description: "5db sajtrudacska v&aacute;laszthat&oacute; extr&aacute;kkal",
        cardPrice: "1799 Ft",
        image: "menu-fotok/snackek-falatkak/e86ad3c8-667d-11ee-8b5b-ea79827740a5_650c311db552debdde26a5c5.avif",
        allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja",
      },
    ],
  },
  sides: {
    items: [
      {
        id: "pita",
        name: "Pita",
        description: "",
        cardPrice: "249 Ft",
        image: "menu-fotok/koretek/f7d605c6-667d-11ee-bd64-dab082e09338_650c311db552debdde26a5c7.jpg",
        allergens: "glut&eacute;n, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
      },
      {
        id: "piritott-gorog-lepenykenyer",
        name: "Pir&iacute;tott g&ouml;r&ouml;g lep&eacute;nykeny&eacute;r",
        description: "",
        cardPrice: "299 Ft",
        image: "menu-fotok/koretek/9e01ee48-6d8f-11ee-8d88-6669c45e7598_lepe_nykenye_r.jpg",
        allergens: "",
      },
      {
        id: "hasabburgonya",
        name: "Has&aacute;bburgonya",
        description: "A k&eacute;p illusztr&aacute;ci&oacute;",
        cardPrice: "999 Ft",
        image: "menu-fotok/koretek/c070370a-669b-11ee-99e1-6e40453d7020_9e82a88a_5877_11ee_b508_ced93fe95ee3_d129ff8e_460f_11ed_b77e_a6f8ab31fcef_su_ltkrumpli_11___12__photoroom__1_.avif",
        allergens: "",
      },
      {
        id: "edesburgonya",
        name: "&Eacute;desburgonya",
        description: "A k&eacute;p illusztr&aacute;ci&oacute;",
        cardPrice: "1699 Ft",
        image: "menu-fotok/koretek/1f5ef9c2-669c-11ee-b913-caed76f28aa1_9e82a88a_5877_11ee_b508_ced93fe95ee3_d129ff8e_460f_11ed_b77e_a6f8ab31fcef_su_ltkrumpli_11___12__photoroom__2_.jpg",
        allergens: "",
      },
      {
        id: "friss-salata",
        name: "Friss sal&aacute;ta",
        description: "Frissen v&aacute;gott ropog&oacute;s k&aacute;poszta, lilahagyma, k&iacute;gy&oacute;uborka, paradicsom &ouml;sszeforgatva.",
        cardPrice: "699 Ft",
        image: "menu-fotok/koretek/a00a1ac6-6d8f-11ee-8b44-368f73706a5d_sala_ta.jpg",
        allergens: "",
      },
    ],
  },
  drinks: {
    items: [
      {
        id: "pepsi-033-dobozos",
        name: "Pepsi (0,33 l) dobozos",
        description: "330 ml",
        cardPrice: "650 Ft",
        image: "menu-fotok/uditok/66793ba7bfc2441871a681ff.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "pepsi-max-033-dobozos",
        name: "Pepsi max (0,33 l) dobozos",
        description: "330 ml",
        cardPrice: "650 Ft",
        image: "menu-fotok/uditok/66793acb35e1b1789b049815.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "dr-pepper-033-dobozos",
        name: "Dr. Pepper (0,33 l) dobozos",
        description: "330 ml",
        cardPrice: "650 Ft",
        image: "menu-fotok/uditok/67502a9d71fc340e3bf37ced.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "pepsi-05",
        name: "Pepsi (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/6679462eaafb6a54ed7ee6e8.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "pepsi-max-05",
        name: "Pepsi max (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/6679462e467c3d6a774c9546.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "schweppes-narancs-05",
        name: "Schweppes narancs (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/67a23c21426b3705e96eddf9.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "schweppes-tonic-05",
        name: "Schweppes tonic (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/67a23c1e426b3705e96eddf1.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "schweppes-pink-tonic-05",
        name: "Schweppes pink tonic (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689ba408f18c6aaa8030d078.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "schweppes-canada-dry-05",
        name: "Schweppes canada dry (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/67a23c0b426b3705e96eddb9.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "schweppes-citrus-mix-05",
        name: "Schweppes citrus mix (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689ba40a87a8f04a4a7db71c.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "gatorade-jegmalna-05",
        name: "Gatorade j&eacute;gm&aacute;lna (0,5 l)",
        description: "0,5 l",
        cardPrice: "750 Ft",
        image: "menu-fotok/uditok/67a23c0b426b3705e96eddb6.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "lipton-citrom-05",
        name: "Lipton citrom (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689b7af79bbcfa1dc39bb63d.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "lipton-oszibarack-05",
        name: "Lipton &#337;szibarack (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689b7af79bbcfa1dc39bb63e.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "lipton-zold-05",
        name: "Lipton z&ouml;ld (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689b821df18c6aaa80309f00.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "lipton-zold-epres-05",
        name: "Lipton z&ouml;ld epres (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689b8215f18c6aaa80309efa.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "toma-meggy-05",
        name: "Toma meggy (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/66daea330c913c3306cf572c.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "toma-multivitamin-05",
        name: "Toma multivitamin (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/689b820b9bbcfa1dc39bc2e0.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "toma-alma-05",
        name: "Toma alma (0,5 l)",
        description: "0,5 l",
        cardPrice: "690 Ft",
        image: "menu-fotok/uditok/66daea380c913c3306cf572d.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "szentkiralyi-szensavas-asvanyviz-05",
        name: "Szentkir&aacute;lyi sz&eacute;nsavas &aacute;sv&aacute;nyv&iacute;z (0,5 l)",
        description: "0,5 l",
        cardPrice: "490 Ft",
        image: "menu-fotok/uditok/67a23c1f426b3705e96eddf3.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
      {
        id: "szentkiralyi-szensavmentes-asvanyviz-05",
        name: "Szentkir&aacute;lyi sz&eacute;nsavmentes &aacute;sv&aacute;nyv&iacute;z (0,5 l)",
        description: "0,5 l",
        cardPrice: "490 Ft",
        image: "menu-fotok/uditok/67a23c1f426b3705e96eddf4.avif",
        allergens: "",
        note: "50 Ft visszav&aacute;lt&aacute;si d&iacute;j",
      },
    ],
  },
};

const popularMenuItems = [
  {
    id: "gyros-tal",
    name: "Gyros t&aacute;l",
    cardPrice: "3349 Ft",
    price: "3349 Ft",
    image: "menu-fotok/gyros-talak/e3cedf80-667d-11ee-a691-5a478b0b3ad2_650c311db552debdde26a5a3.avif",
    description:
      "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet.",
    allergens: "sz&oacute;ja, tejterm&eacute;k, must&aacute;r",
  },
  {
    id: "gyros-pitaban",
    name: "Gyros pit&aacute;ban",
    cardPrice: "1999 Ft-t&oacute;l",
    price: "1999 Ft-t&oacute;l",
    image: "menu-fotok/gyros-pitak/e3bcb044-667d-11ee-a0b8-cebfe8e79371_650c311db552debdde26a597.avif",
    description:
      "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), tzatziki&ouml;ntet, pita",
    allergens: "glut&eacute;n, tej, must&aacute;r, sz&oacute;ja, toj&aacute;s, di&oacute;f&eacute;le, szez&aacute;mmag",
  },
  {
    id: "sult-krumpli-cheddar-sajtszosszal",
    name: "S&uuml;lt krumpli cheddar sajtsz&oacute;sszal",
    cardPrice: "1290 Ft-t&oacute;l",
    price: "1290 Ft-t&oacute;l",
    image: "menu-fotok/smash-burgerek/67e66d06404d96b94e8a3145.avif",
    description: "h&aacute;zi f&#369;szers&oacute;val &eacute;s amerikai cheddar sajtsz&oacute;sszal",
    allergens: "tej, sz&oacute;ja",
  },
  {
    id: "gorog-gyros-tal",
    name: "G&ouml;r&ouml;g gyros t&aacute;l",
    cardPrice: "3799 Ft",
    price: "3799 Ft",
    image: "menu-fotok/gyros-talak/efb55e6e-667d-11ee-8102-fa4cbcecc809_650c311db552debdde26a5a5.avif",
    description:
      "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), feta sajt, olivabogy&oacute;, tzatziki&ouml;ntet.",
    allergens: "sz&oacute;ja, tejterm&eacute;k, must&aacute;r",
  },
  {
    id: "sajtos-gyros-tal",
    name: "Sajtos gyros t&aacute;l",
    cardPrice: "3799 Ft",
    price: "3799 Ft",
    image: "menu-fotok/gyros-talak/e3d457ee-667d-11ee-92e3-f2a1cbe7cd32_650c311db552debdde26a5a7.avif",
    description:
      "ny&aacute;rsr&oacute;l vagdalt f&#369;szeres csirkecombfalatok, v&aacute;laszthat&oacute; k&ouml;ret, ropog&oacute;s z&ouml;lds&eacute;gek (fejesk&aacute;poszta, lila hagyma, k&iacute;gy&oacute;uborka, paradicsom), reszelt trappista sajt, tzatziki&ouml;ntet.",
    allergens: "tej, must&aacute;r, sz&oacute;ja",
  },
];

const popularMenuItemIds = new Set(popularMenuItems.map((item) => item.id));
const popularMenuItemNames = new Set(popularMenuItems.map((item) => item.name));

function getCollectionItemBadge(item) {
  if (item.badge) {
    return item.badge;
  }

  if (popularMenuItemIds.has(item.id) || popularMenuItemNames.has(item.name)) {
    return "N&eacute;pszer&#369;";
  }

  return "";
}

function closePopularMenuModal() {
  const modal = document.getElementById("popular-menu-modal");

  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-popular-menu-modal");

  if (modal.__lastTrigger instanceof HTMLElement) {
    modal.__lastTrigger.focus();
  }
}

function initPopularMenuModal() {
  const existingModal = document.getElementById("popular-menu-modal");

  if (existingModal) {
    return existingModal;
  }

  const modal = document.createElement("div");
  modal.className = "popular-menu-modal";
  modal.id = "popular-menu-modal";
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <button
      class="popular-menu-modal__backdrop"
      type="button"
      data-popular-close
      tabindex="-1"
      aria-label="Bez&aacute;r&aacute;s"
    ></button>
    <div
      class="popular-menu-modal__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popular-menu-modal-title"
    >
      <button
        class="popular-menu-modal__close"
        type="button"
        data-popular-close
        aria-label="Bez&aacute;r&aacute;s"
      >
        &times;
      </button>

      <div class="popular-menu-modal__media">
        <img id="popular-menu-modal-image" src="" alt="" />
      </div>

      <div class="popular-menu-modal__body">
        <h3 id="popular-menu-modal-title"></h3>
        <strong id="popular-menu-modal-price"></strong>
        <p id="popular-menu-modal-description"></p>
      </div>
    </div>
  `;

  modal.querySelectorAll("[data-popular-close]").forEach((button) => {
    button.addEventListener("click", () => {
      closePopularMenuModal();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopularMenuModal();
    }
  });

  document.body.appendChild(modal);
  return modal;
}

function openPopularMenuModal(itemId, trigger) {
  const item = popularMenuItems.find((entry) => entry.id === itemId);
  const modal = initPopularMenuModal();

  if (!item || !modal) {
    return;
  }

  const image = modal.querySelector("#popular-menu-modal-image");
  const media = modal.querySelector(".popular-menu-modal__media");
  const title = modal.querySelector("#popular-menu-modal-title");
  const price = modal.querySelector("#popular-menu-modal-price");
  const description = modal.querySelector("#popular-menu-modal-description");
  const closeButton = modal.querySelector(".popular-menu-modal__close");

  if (!image || !media || !title || !price || !description) {
    return;
  }

  if (item.image) {
    media.hidden = false;
    image.src = item.image;
    image.alt = item.name;
  } else {
    media.hidden = true;
    image.removeAttribute("src");
    image.alt = "";
  }

  title.innerHTML = translateMenuTextToEnglish(item.name);
  price.textContent = item.price;
  description.innerHTML = `
    ${translateMenuTextToEnglish(item.description)}
    <span class="popular-menu-modal__allergens"><strong>${currentLanguage === "en" ? "Allergens:" : "Allerg&eacute;nek:"}</strong> ${translateMenuTextToEnglish(item.allergens)}</span>
  `;
  modal.__lastTrigger = trigger instanceof HTMLElement ? trigger : document.activeElement;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-popular-menu-modal");

  if (closeButton) {
    closeButton.focus();
  }
}

function renderReviewTags(tags = []) {
  if (!tags.length) {
    return "";
  }

  return `
    <div class="review-card__badges" aria-label="V&eacute;lem&eacute;ny jel&ouml;l&eacute;sek">
      ${tags
        .map(
          (tag) => `
            <span class="review-card__badge">${tag}</span>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderReviewCard(review, { featured = false, reveal = true, kickerLabel = "", footerLabel = "" } = {}) {
  const revealClass = reveal ? " reveal" : "";
  const currentFooterLabel = footerLabel || review.dateLabel || "ma";
  const ratingLabel = `${review.ratingValue.toFixed(1).replace(".", ",")} / 5`;

  return `
    <article class="review-card review-card--list${featured ? " review-card--featured" : ""}${revealClass}">
      <div class="review-card__top">
        <div class="review-card__avatar" aria-hidden="true">${getReviewerInitial(review.name)}</div>
        <div class="review-card__identity">
          <div class="review-card__identity-row">
            <strong>${review.name}</strong>
            ${renderReviewTags(review.tags)}
          </div>
          <span class="review-card__date">${currentFooterLabel}</span>
        </div>
        <div class="review-card__meta-group">
          <div class="review-card__stars" aria-label="${review.ratingValue} csillagos &eacute;rt&eacute;kel&eacute;s">
            ${buildStarsMarkup(review.ratingValue)}
          </div>
          <span class="review-card__rating-value">${ratingLabel}</span>
        </div>
      </div>
      <p class="review-card__text">${review.text}</p>
    </article>
  `;
}

const reviewsBrowserState = {
  sort: "latest",
  query: "",
};

function decodeHtmlEntities(value = "") {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function normalizeReviewSearchValue(value = "") {
  return decodeHtmlEntities(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getReviewSortLabel(sortId) {
  return reviewSortOptions.find((option) => option.id === sortId)?.label || reviewSortOptions[0].label;
}

function getVisibleReviewsStatusText(current, total) {
  return `${current} / ${total} megjelen\u00edtve`;
}

function getTotalReviewsStatusText(total) {
  return `\u00d6sszesen ${total} bek\u00fcld\u00f6tt v\u00e9lem\u00e9ny`;
}

function getSortedReviews(reviews, sortId) {
  const sorted = [...reviews];

  sorted.sort((left, right) => {
    if (sortId === "highest") {
      return right.ratingValue - left.ratingValue || left.ageDays - right.ageDays || left.relevanceRank - right.relevanceRank;
    }

    if (sortId === "lowest") {
      return left.ratingValue - right.ratingValue || right.ageDays - left.ageDays || left.relevanceRank - right.relevanceRank;
    }

    if (sortId === "oldest") {
      return right.ageDays - left.ageDays || left.relevanceRank - right.relevanceRank;
    }

    return left.ageDays - right.ageDays || left.relevanceRank - right.relevanceRank;
  });

  return sorted;
}

function getVisibleReviews() {
  const normalizedQuery = normalizeReviewSearchValue(reviewsBrowserState.query);

  const filtered = normalizedQuery
    ? reviewsData.filter((review) => {
        const haystack = [
          review.name,
          review.meta,
          review.text,
          review.note || "",
          ...(review.tags || []),
        ]
          .map((value) => normalizeReviewSearchValue(value))
          .join(" ");

        return haystack.includes(normalizedQuery);
      })
    : reviewsData;

  return getSortedReviews(filtered, reviewsBrowserState.sort);
}

function renderReviewsBrowser() {
  const viewport = document.getElementById("reviews-list");
  const position = document.getElementById("reviews-browser-position");
  const total = document.getElementById("reviews-browser-total");
  const sortLabel = document.getElementById("reviews-sort-label");

  if (!viewport || !position || !total || !sortLabel) {
    return;
  }

  const visibleReviews = getVisibleReviews();
  const activeCount = visibleReviews.length;

  if (!activeCount) {
    sortLabel.innerHTML = getReviewSortLabel(reviewsBrowserState.sort);
    position.textContent = getVisibleReviewsStatusText(0, reviewsData.length);
    total.textContent = getTotalReviewsStatusText(reviewsData.length);
    viewport.innerHTML = `
      <div class="reviews-browser__empty">
        <strong>M&eacute;g nincs ilyen tal&aacute;lat.</strong>
        <p>Pr&oacute;b&aacute;lj meg m&aacute;sik keres&eacute;st, vagy &iacute;rd meg az els&#337; vend&eacute;gv&eacute;lem&eacute;nyt.</p>
      </div>
    `;
    return;
  }

  sortLabel.innerHTML = getReviewSortLabel(reviewsBrowserState.sort);
  position.textContent = getVisibleReviewsStatusText(activeCount, reviewsData.length);
  total.textContent = getTotalReviewsStatusText(reviewsData.length);
  viewport.innerHTML = visibleReviews
    .map((review) => renderReviewCard(review, { featured: false, reveal: false }))
    .join("");
}

function initReviewsBrowser() {
  const searchInput = document.getElementById("reviews-search-input");
  const sortTrigger = document.getElementById("reviews-sort-trigger");
  const sortMenu = document.getElementById("reviews-sort-menu");
  const sortOptions = sortMenu?.querySelectorAll("[data-review-sort]");

  if (!searchInput || !sortTrigger || !sortMenu || !sortOptions?.length) {
    return;
  }

  function closeSortMenu() {
    sortMenu.hidden = true;
    sortTrigger.setAttribute("aria-expanded", "false");
  }

  function openSortMenu() {
    sortMenu.hidden = false;
    sortTrigger.setAttribute("aria-expanded", "true");
  }

  searchInput.addEventListener("input", (event) => {
    reviewsBrowserState.query = event.target.value.trim();
    renderReviewsBrowser();
  });

  sortTrigger.addEventListener("click", () => {
    if (sortMenu.hidden) {
      openSortMenu();
      return;
    }

    closeSortMenu();
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      reviewsBrowserState.sort = option.dataset.reviewSort;
      sortOptions.forEach((item) => {
        item.setAttribute("aria-selected", item === option ? "true" : "false");
      });
      closeSortMenu();
      renderReviewsBrowser();
    });
  });

  document.addEventListener("click", (event) => {
    if (!sortMenu.hidden && !event.target.closest(".reviews-sort")) {
      closeSortMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSortMenu();
    }
  });

  renderReviewsBrowser();
}

function initReviewsForm() {
  const form = document.getElementById("reviews-form");
  const formPanel = document.getElementById("reviews-form-panel");
  const nameInput = document.getElementById("reviews-name");
  const ratingInput = document.getElementById("reviews-rating");
  const ratingButtons = form?.querySelectorAll("[data-review-rating]");
  const textInput = document.getElementById("reviews-text");
  const textCounter = document.getElementById("reviews-text-counter");
  const message = document.getElementById("reviews-form-message");
  const submitButton = document.getElementById("reviews-submit");
  const toggleButton = document.getElementById("reviews-form-toggle");
  const ratingPicker = form?.querySelector(".reviews-rating-picker");
  const ratingWrap = form?.querySelector(".reviews-rating-picker-wrap");

  if (!form || !nameInput || !ratingInput || !textInput || !textCounter || !message || !submitButton) {
    return;
  }

  const fieldInputs = [nameInput, textInput];

  function openFormPanel() {
    formPanel?.classList.add("is-open");
    formPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      nameInput.focus();
    }, 180);
  }

  toggleButton?.addEventListener("click", openFormPanel);

  function clearFieldState(field) {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
  }

  function markFieldInvalid(field) {
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    field.focus();
  }

  function clearRatingInvalidState() {
    ratingWrap?.classList.remove("is-invalid");
  }

  function markRatingInvalid() {
    ratingWrap?.classList.add("is-invalid");
    ratingButtons?.[0]?.focus();
  }

  function updateTextCounter(value = "") {
    const characterCount = value.length;
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
    textCounter.textContent = `${characterCount} karakter / ${wordCount} szó`;
  }

  function setRating(value) {
    const currentValue = Number(value);
    const hasSelection = Number.isFinite(currentValue) && currentValue >= 1 && currentValue <= 5;
    ratingInput.value = hasSelection ? String(currentValue) : "";
    clearRatingInvalidState();

    ratingButtons?.forEach((button) => {
      const buttonValue = Number(button.dataset.reviewRating) || 0;
      const isChecked = hasSelection && buttonValue === currentValue;
      button.classList.toggle("is-active", hasSelection && buttonValue <= currentValue);
      button.classList.toggle("is-selected", isChecked);
      button.classList.remove("is-preview");
      button.setAttribute("aria-checked", isChecked ? "true" : "false");
    });
  }

  function previewRating(value) {
    const previewValue = Number(value);
    const selectedValue = Number(ratingInput.value);
    const activeValue = Number.isFinite(previewValue) ? previewValue : selectedValue;

    ratingButtons?.forEach((button) => {
      const buttonValue = Number(button.dataset.reviewRating) || 0;
      const isActive = Number.isFinite(activeValue) && buttonValue <= activeValue;
      button.classList.toggle("is-active", isActive);
      button.classList.toggle("is-preview", Number.isFinite(previewValue) && buttonValue <= previewValue);
    });
  }

  function getPointerRatingFromClientX(clientX) {
    const rect = ratingPicker?.getBoundingClientRect();

    if (!rect || rect.width <= 0) {
      return Number(ratingInput.value) || 0;
    }

    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 0.9999);
    return Math.min(5, Math.max(1, Math.floor(ratio * 5) + 1));
  }

  ratingButtons?.forEach((button) => {
    const ratingValue = button.dataset.reviewRating || "";
    button.innerHTML = buildRatingStarIcon();
    button.setAttribute("aria-label", `${ratingValue} csillag`);
    button.setAttribute("title", `${ratingValue} / 5`);
    button.addEventListener("click", () => {
      setRating(button.dataset.reviewRating || "5");
    });
    button.addEventListener("mouseenter", () => {
      previewRating(button.dataset.reviewRating || ratingInput.value || "5");
    });
    button.addEventListener("focus", () => {
      previewRating(button.dataset.reviewRating || ratingInput.value || "5");
    });
  });

  ratingPicker?.addEventListener("mouseleave", () => {
    setRating(ratingInput.value || "");
  });

  ratingPicker?.addEventListener("pointermove", (event) => {
    previewRating(String(getPointerRatingFromClientX(event.clientX)));
  }, { passive: true });

  fieldInputs.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldState(field);
      delete message.dataset.locked;
      message.classList.remove("is-error", "is-success");
    });
  });

  textInput.addEventListener("input", () => {
    updateTextCounter(textInput.value);
  });

  ratingButtons?.forEach((button) => {
    button.addEventListener("keydown", (event) => {
      const currentValue = Number(button.dataset.reviewRating) || 0;

      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        const nextButton = form.querySelector(`[data-review-rating="${Math.min(5, currentValue + 1)}"]`);
        nextButton?.focus();
        setRating(String(Math.min(5, currentValue + 1)));
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        const previousValue = Math.max(1, currentValue - 1);
        const previousButton = form.querySelector(`[data-review-rating="${previousValue}"]`);
        previousButton?.focus();
        setRating(String(previousValue));
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    fieldInputs.forEach((field) => {
      clearFieldState(field);
    });
    clearRatingInvalidState();

    const payload = {
      name: nameInput.value.trim(),
      rating: Number(ratingInput.value),
      text: textInput.value.trim(),
    };

    if (!payload.name) {
      markFieldInvalid(nameInput);
      message.classList.remove("is-success");
      message.classList.add("is-error");
      message.textContent = "K\u00e9rlek, t\u00f6ltsd ki a nevet.";
      message.dataset.locked = "true";
      return;
    }

    if (!Number.isFinite(payload.rating)) {
      message.classList.remove("is-success");
      message.classList.add("is-error");
      message.textContent = "K\u00e9rlek, v\u00e1lassz \u00e9rt\u00e9kel\u00e9st.";
      message.dataset.locked = "true";
      markRatingInvalid();
      return;
    }

    if (!payload.text) {
      markFieldInvalid(textInput);
      message.classList.remove("is-success");
      message.classList.add("is-error");
      message.textContent = "K\u00e9rlek, \u00edrd le a v\u00e9lem\u00e9nyedet.";
      message.dataset.locked = "true";
      return;
    }

    if (payload.text.length < 8) {
      markFieldInvalid(textInput);
      message.classList.remove("is-success");
      message.classList.add("is-error");
      message.textContent = "K\u00e9rlek, \u00edrj legal\u00e1bb 8 karaktert.";
      message.dataset.locked = "true";
      return;
    }

    submitButton.disabled = true;
    message.dataset.locked = "true";
    message.classList.remove("is-success", "is-error");
    message.textContent = "V\u00e9lem\u00e9ny k\u00fcld\u00e9se...";

    try {
      const responsePayload = await submitSiteReview(payload);
      form.reset();
      setRating("");
      updateTextCounter("");
      message.classList.remove("is-error");
      message.classList.add("is-success");
      message.textContent = "K\u00f6sz\u00f6nj\u00fck a v\u00e9lem\u00e9nyt!";
      applySiteReviewsPayload(responsePayload);
    } catch (error) {
      message.classList.remove("is-success");
      message.classList.add("is-error");
      message.textContent = error.message || "Nem sikerult elkuldeni a velemenyt.";
    } finally {
      submitButton.disabled = false;
    }
  });

  setRating(ratingInput.value || "");
  updateTextCounter(textInput.value);
}

function renderReviews() {
  const nav = document.querySelector(".nav");
  const panelsRoot = document.querySelector(".view-panels");
  const existingButton = nav?.querySelector('[data-view-target="reviews"]');
  const existingPanel = document.querySelector('[data-view-panel="reviews"]');
  const contactButton = nav?.querySelector('[data-view-target="contact"]');
  const contactPanel = document.getElementById("panel-contact");

  if (nav && !existingButton) {
    const reviewsButton = document.createElement("button");
    reviewsButton.className = "nav__button";
    reviewsButton.type = "button";
    reviewsButton.role = "tab";
    reviewsButton.id = "tab-reviews";
    reviewsButton.setAttribute("aria-controls", "panel-reviews");
    reviewsButton.setAttribute("aria-selected", "false");
    reviewsButton.setAttribute("tabindex", "-1");
    reviewsButton.dataset.viewTarget = "reviews";
    reviewsButton.innerHTML = getText("navReviews");
    nav.insertBefore(reviewsButton, contactButton || null);
  }

  if (panelsRoot && !existingPanel) {
    const reviewsPanel = document.createElement("section");
    reviewsPanel.className = "view-panel";
    reviewsPanel.id = "panel-reviews";
    reviewsPanel.dataset.viewPanel = "reviews";
    reviewsPanel.setAttribute("role", "tabpanel");
    reviewsPanel.setAttribute("aria-labelledby", "tab-reviews");
    reviewsPanel.hidden = true;
    reviewsPanel.innerHTML = `
      <div class="view-panel__section">
        <div class="section-heading section-heading--sub reviews-heading reveal">
          <p class="eyebrow" id="reviews-panel-title">${getText("reviewsEyebrow")}</p>
        </div>

        <section class="panel panel--accent reviews-composer reveal" aria-label="V&eacute;lem&eacute;nyek &ouml;sszes&iacute;t&eacute;se &eacute;s bek&uuml;ld&eacute;se">
          <article class="reviews-score reviews-score--refined">
            <div class="reviews-score__topline">
              <a class="reviews-google-chip" id="reviews-google-chip" href="#" target="_blank" rel="noreferrer">
                <span class="reviews-google-chip__brand" aria-hidden="true">Google</span>
                <span class="reviews-google-chip__score" id="reviews-google-chip-score">${googleReviewsSnapshot.rating}</span>
                <span class="reviews-stars reviews-google-chip__stars" id="reviews-google-chip-stars">
                  ${buildStarsMarkup(0)}
                </span>
                <span class="reviews-google-chip__count" id="reviews-google-chip-count">(${googleReviewsSnapshot.totalReviews})</span>
              </a>
              <h3 class="reviews-score__title" id="reviews-score-title">${getText("reviewsSummary")}</h3>
            </div>
            <div class="reviews-score__empty" id="reviews-score-empty" hidden></div>
            <p class="reviews-score__meta" id="reviews-score-meta">
              ${getText("reviewsUnchecked")} <span class="reviews-score__meta-info" aria-hidden="true">i</span>
            </p>
            <div class="reviews-score__distribution" id="reviews-score-distribution"></div>
            <div class="reviews-score__stats reviews-score__stats--refined" id="reviews-score-stats">
              <div class="reviews-score__value">
                <strong id="reviews-score-value">${googleReviewsSnapshot.rating}</strong>
              </div>
              <div class="reviews-stars reviews-stars--summary" id="reviews-score-stars">
                ${buildStarsMarkup(0)}
              </div>
              <p class="reviews-score__count" id="reviews-score-count">${googleReviewsSnapshot.totalReviews} ${getText("reviewsCount")}</p>
            </div>
          </article>

          <section class="reviews-form reviews-form--inline" id="reviews-form-panel" aria-label="Saj&aacute;t v&eacute;lem&eacute;ny &iacute;r&aacute;sa">
            <p class="eyebrow">${getText("ownReview")}</p>
            <form class="reviews-form__grid" id="reviews-form" novalidate>
              <label class="reviews-form__field" for="reviews-name">
                <span>${getText("name")}</span>
                <input
                  id="reviews-name"
                  name="name"
                  type="text"
                  maxlength="40"
                  autocomplete="name"
                  placeholder="${currentLanguage === "en" ? "Your name" : "Hogy h&iacute;vhatunk?"}"
                  required
                />
              </label>

              <label class="reviews-form__field reviews-form__field--rating" for="reviews-rating">
                <span>${getText("rating")}</span>
                <input id="reviews-rating" name="rating" type="hidden" value="" required />
                <div class="reviews-rating-picker-wrap">
                  <div class="reviews-rating-picker" role="radiogroup" aria-label="&Eacute;rt&eacute;kel&eacute;s">
                    <button class="reviews-rating-picker__option" type="button" role="radio" aria-checked="false" data-review-rating="1"></button>
                    <button class="reviews-rating-picker__option" type="button" role="radio" aria-checked="false" data-review-rating="2"></button>
                    <button class="reviews-rating-picker__option" type="button" role="radio" aria-checked="false" data-review-rating="3"></button>
                    <button class="reviews-rating-picker__option" type="button" role="radio" aria-checked="false" data-review-rating="4"></button>
                    <button class="reviews-rating-picker__option" type="button" role="radio" aria-checked="false" data-review-rating="5"></button>
                  </div>
                </div>
              </label>

              <label class="reviews-form__field reviews-form__field--full" for="reviews-text">
                <span>${getText("review")}</span>
                <textarea
                  id="reviews-text"
                  name="text"
                  rows="5"
                  maxlength="400"
                  placeholder="${getText("reviewPlaceholder")}"
                  required
                ></textarea>
                <p class="reviews-form__counter" id="reviews-text-counter" aria-live="polite">0 karakter / 0 sz&oacute;</p>
              </label>

              <div class="reviews-form__actions reviews-form__field--full">
                <p class="reviews-form__message" id="reviews-form-message" aria-live="polite"></p>
                <button class="button button--primary" id="reviews-submit" type="submit">
                  ${getText("submit")}
                </button>
              </div>
            </form>
          </section>
        </section>

      </div>
    `;

    panelsRoot.insertBefore(reviewsPanel, contactPanel || null);
  }
}

function applyIntroOnlyTopbarPreview() {
  if (!INTRO_ONLY_TOPBAR_PREVIEW) {
    return;
  }

  const nav = document.querySelector(".nav");

  if (!nav) {
    return;
  }

  nav.classList.add("nav--intro-preview");

  nav.querySelectorAll(".nav__button").forEach((button) => {
    const target = button.dataset.viewTarget;

    if (!target || target === "intro") {
      return;
    }

    button.dataset.previewTarget = target;
    button.removeAttribute("data-view-target");
    button.hidden = true;
    button.setAttribute("aria-hidden", "true");
    button.setAttribute("tabindex", "-1");
  });

  document.querySelectorAll(".hero__actions [data-view-target]").forEach((button) => {
    const target = button.dataset.viewTarget;

    if (!target) {
      return;
    }

    button.dataset.previewTarget = target;
    button.removeAttribute("data-view-target");
    button.setAttribute("aria-disabled", "true");
  });
}

function resetPageToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function getMenuVisual(type) {
  if (type === "gyros") {
    return `
      <svg viewBox="0 0 320 220" role="img" aria-label="Gyros illusztráció">
        <defs>
          <linearGradient id="gyroA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffca75" />
            <stop offset="100%" stop-color="#ff7f2f" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="284" height="184" rx="30" fill="rgba(255,255,255,0.04)" />
        <path d="M114 54c38 0 78 30 92 74 8 24 4 47-12 70L88 117c-3-31 4-63 26-82Z" fill="url(#gyroA)" />
        <path d="M123 70c28 11 57 35 71 62" fill="none" stroke="#7e3f12" stroke-linecap="round" stroke-width="10" />
        <path d="M136 92c27 8 51 26 65 48" fill="none" stroke="#8f2c1c" stroke-linecap="round" stroke-width="10" />
        <path d="M89 116c37 25 77 57 105 84" fill="none" stroke="#f3d98b" stroke-linecap="round" stroke-width="16" />
        <circle cx="92" cy="84" r="9" fill="#6bb05f" />
        <circle cx="208" cy="77" r="10" fill="#d74c35" />
        <circle cx="204" cy="160" r="10" fill="#6bb05f" />
      </svg>
    `;
  }

  if (type === "plate") {
    return `
      <svg viewBox="0 0 320 220" role="img" aria-label="Tál illusztráció">
        <defs>
          <linearGradient id="plateA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffbf61" />
            <stop offset="100%" stop-color="#ff7a18" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="284" height="184" rx="30" fill="rgba(255,255,255,0.04)" />
        <ellipse cx="160" cy="130" rx="104" ry="52" fill="#1f1712" />
        <ellipse cx="160" cy="120" rx="92" ry="42" fill="url(#plateA)" />
        <path d="M92 110c42 20 92 20 136 0" fill="none" stroke="#2f7d47" stroke-linecap="round" stroke-width="12" />
        <path d="M102 92c36 13 74 13 116 0" fill="none" stroke="#f5f0cb" stroke-linecap="round" stroke-width="10" />
        <path d="M112 128c36 12 58 12 96 0" fill="none" stroke="#c34a31" stroke-linecap="round" stroke-width="10" />
        <circle cx="98" cy="78" r="10" fill="#2f7d47" />
        <circle cx="230" cy="150" r="12" fill="#ff8a3b" />
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 320 220" role="img" aria-label="Ital illusztráció">
      <defs>
        <linearGradient id="drinkA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffce78" />
          <stop offset="100%" stop-color="#ff8a3a" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="284" height="184" rx="30" fill="rgba(255,255,255,0.04)" />
      <path d="M126 52h68l-10 122a18 18 0 0 1-18 16h-12a18 18 0 0 1-18-16L126 52Z" fill="url(#drinkA)" />
      <path d="M152 28h15c9 0 16 7 16 16v10" fill="none" stroke="#f7d49b" stroke-linecap="round" stroke-width="8" />
      <path d="M142 98h36M138 122h44M144 146h30" fill="none" stroke="#8d3c14" stroke-linecap="round" stroke-width="8" />
      <circle cx="96" cy="164" r="14" fill="#6ab661" />
      <circle cx="224" cy="74" r="12" fill="#ffd17d" />
    </svg>
  `;
}

function renderMenu() {
  const menuGrid = document.getElementById("menu-grid");
  const menuHeading = document.querySelector("#panel-menu .section-heading");

  if (!menuGrid) {
    return;
  }

  if (menuHeading) {
    menuHeading.classList.add("section-heading--menu");
    menuHeading.innerHTML = `
      <div class="menu-hero">
        <div class="menu-hero__banner">
          <div class="menu-hero__overlay"></div>
          <div class="menu-hero__content">
            <div class="menu-hero__brand">
              <img src="logo-gyros-box.svg" alt="Gyros Box log&oacute;" draggable="false" />
            </div>

            <div class="menu-hero__copy">
              <p class="menu-hero__eyebrow">${currentLanguage === "en" ? "Online menu" : "Online &eacute;tlap"}</p>
              <h2>Gyros Box Gy&ouml;ngy&ouml;s</h2>
              <p class="menu-hero__lead">${
                currentLanguage === "en"
                  ? "Fresh ingredients, fast service, prepared on-site."
                  : "Friss alapanyagokb&oacute;l, gyorsan, helyben elk&eacute;sz&iacute;tve!"
              }</p>
            </div>
          </div>
        </div>

        <div class="menu-hero__meta">
          <span>${currentLanguage === "en" ? "4.9 Google rating" : "4,9 Google &eacute;rt&eacute;kel&eacute;s"}</span>
          <span>2000-4000 Ft</span>
          <span>${currentLanguage === "en" ? "Open: 10:00-18:00" : "Nyitva: 10:00-18:00"}</span>
          <span>Gy&ouml;ngy&ouml;s, Kossuth Lajos u. 5.</span>
          <span>${currentLanguage === "en" ? "Dine-in, takeaway and ordering" : "Helyben, elvitelre &eacute;s rendel&eacute;sre"}</span>
        </div>
      </div>
    `;
  }

  function renderActiveCategory(activeCategoryId) {
    const activeCategory =
      menuShowcaseCategories.find((category) => category.id === activeCategoryId) || menuShowcaseCategories[0];
    const categoryCollection = menuShowcaseCollections[activeCategory.id];
    const isCompactDrinkCategory = activeCategory.id === "drinks";
    const isBurgerCategory = activeCategory.id === "smash-burgers";

    const filtersMarkup = `
      <div class="menu-showcase__filters" role="tablist" aria-label="${currentLanguage === "en" ? "Menu categories" : "Étlap kategóriák"}">
        ${menuShowcaseCategories
          .map(
            (category) => `
              <button
                class="menu-showcase__filter${category.id === activeCategory.id ? " is-active" : ""}"
                type="button"
                data-menu-category="${category.id}"
              >
                ${getMenuCategoryLabel(category)}
              </button>
            `,
          )
          .join("")}
      </div>
    `;

    const popularMarkup = `
      <div class="popular-menu">
        <div class="popular-menu__grid">
          ${popularMenuItems
            .map(
              (item) => `
                <article class="popular-card">
                  ${
                    item.image
                      ? `
                        <div class="popular-card__media">
                          <img src="${item.image}" alt="${item.name}" loading="lazy" draggable="false" />
                        </div>
                      `
                      : ""
                  }

                  <div class="popular-card__copy">
                    <div class="popular-card__body-main">
                      <h4>${item.name}</h4>
                      <p>${item.description}</p>
                    </div>
                    <div class="popular-card__footer">
                      <p class="popular-card__allergens"><span>${currentLanguage === "en" ? "Allergens:" : "Allerg&eacute;nek:"}</span> ${item.allergens}</p>
                      <strong>${item.cardPrice}</strong>
                    </div>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    `;

    const collectionMarkup = categoryCollection
      ? `
        <div class="popular-menu popular-menu--collection${isCompactDrinkCategory ? " popular-menu--drinks" : ""}">
          <div class="popular-menu__grid popular-menu__grid--collection${isCompactDrinkCategory ? " popular-menu__grid--drinks" : ""}">
            ${categoryCollection.items
              .map(
                (item) => {
                  const badgeLabel = getCollectionItemBadge(item);

                  return `
                  <article class="popular-card${isCompactDrinkCategory ? " popular-card--drink" : ""}${isBurgerCategory ? " popular-card--burger" : ""}">
                    ${
                      item.image
                        ? `
                          <div class="popular-card__media">
                            <img src="${item.image}" alt="${item.name}" loading="lazy" draggable="false" />
                          </div>
                        `
                        : ""
                    }

                    <div class="popular-card__copy">
                      <div class="popular-card__body-main">
                        <h4>${item.name}</h4>
                        ${item.description ? `<p>${item.description}</p>` : ""}
                        ${item.note ? `<p class="popular-card__note">${item.note}</p>` : ""}
                      </div>
                      <div class="popular-card__footer">
                        ${item.allergens ? `<p class="popular-card__allergens"><span>${currentLanguage === "en" ? "Allergens:" : "Allerg&eacute;nek:"}</span> ${item.allergens}</p>` : ""}
                        <div class="popular-card__meta">
                          <strong>${item.cardPrice}</strong>
                          ${badgeLabel ? `<span class="popular-card__badge">${badgeLabel}</span>` : ""}
                        </div>
                      </div>
                    </div>
                  </article>
                `;
                },
              )
              .join("")}
          </div>
        </div>
      `
      : "";

    menuGrid.innerHTML = `
      <div class="menu-showcase">
        ${filtersMarkup}
        ${
          activeCategory.id === "popular"
            ? popularMarkup
            : categoryCollection
              ? collectionMarkup
            : `
              <div class="menu-showcase__items">
                ${menuShowcaseSlots
                  .map(
                    (slot, index) => `
                      <article class="menu-showcase-card">
                        <div class="menu-showcase-card__media">
                          <span class="menu-showcase-card__accent">${activeCategory.accent}</span>
                          <span class="menu-showcase-card__slot">${String(index + 1).padStart(2, "0")}</span>
                          <div class="menu-showcase-card__glow"></div>
                          <span class="menu-showcase-card__hint">&Eacute;telfot&oacute;</span>
                        </div>

                        <div class="menu-showcase-card__body">
                          <h3>${slot.title}</h3>
                          <p>${slot.description}</p>
                          <b>${slot.price}</b>
                        </div>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            `
        }
      </div>
    `;

    menuGrid.querySelectorAll("[data-menu-category]").forEach((button) => {
      button.addEventListener("click", () => {
        renderActiveCategory(button.dataset.menuCategory);
      });
    });

    translateMenuTextNodesToEnglish(menuGrid);
  }

  renderActiveCategory(menuShowcaseCategories[0].id);
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfOpeningHoursDay(date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  return dayStart;
}

function addOpeningHoursDays(date, numberOfDays) {
  const value = new Date(date);
  value.setDate(value.getDate() + numberOfDays);
  return value;
}

function getOpeningHoursWeekdayName(date) {
  return new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(date).toLowerCase();
}

function getOpeningHoursScheduleForDate(date) {
  const override = openingHourOverrides[getDateKey(date)];
  const weekdayName = getOpeningHoursWeekdayName(date);
  const baseData = openingHours.find((entry) => entry.day === weekdayName);
  const fallbackLabel = `${weekdayName.charAt(0).toUpperCase()}${weekdayName.slice(1)}`;

  if (!baseData && !override) {
    return null;
  }

  return {
    day: weekdayName,
    label: fallbackLabel,
    ...baseData,
    ...override,
  };
}

function createOpeningHoursDateAtTime(date, time) {
  if (!time || !time.includes(":")) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  const value = new Date(date);
  value.setHours(hours, minutes, 0, 0);
  return value;
}

function clampOpeningHoursProgress(value) {
  return Math.min(1, Math.max(0, value));
}

function formatOpeningHoursCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function ensureOpeningHoursCountdown(status) {
  if (status.dataset.enhanced !== "true") {
    status.classList.add("hours-countdown");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "off");
    status.innerHTML = `
      <div class="hours-countdown__dial" aria-hidden="true">
        <svg class="hours-countdown__ring" viewBox="0 0 120 120">
          <circle class="hours-countdown__ring-track" cx="60" cy="60" r="48"></circle>
          <circle class="hours-countdown__ring-progress" id="hours-countdown-progress" cx="60" cy="60" r="48"></circle>
        </svg>
        <div class="hours-countdown__dial-core">
          <strong class="hours-countdown__time" id="hours-countdown-time">--:--:--</strong>
          <span class="hours-countdown__unit" id="hours-countdown-unit">friss&uuml;l</span>
        </div>
      </div>
      <div class="hours-countdown__content">
        <span class="hours-countdown__eyebrow" id="hours-countdown-state">&Aacute;llapot</span>
        <strong class="hours-countdown__target" id="hours-countdown-target">Nyitvatart&aacute;s bet&ouml;lt&eacute;se...</strong>
        <small class="hours-countdown__note" id="hours-countdown-note">A k&ouml;vetkez&#337; v&aacute;lt&aacute;st sz&aacute;moljuk.</small>
      </div>
    `;
    status.dataset.enhanced = "true";
  }

  return {
    root: status,
    progress: status.querySelector("#hours-countdown-progress"),
    time: status.querySelector("#hours-countdown-time"),
    unit: status.querySelector("#hours-countdown-unit"),
    state: status.querySelector("#hours-countdown-state"),
    target: status.querySelector("#hours-countdown-target"),
    note: status.querySelector("#hours-countdown-note"),
  };
}

function setOpeningHoursCountdownProgress(progressCircle, progress) {
  if (!progressCircle) {
    return;
  }

  const normalizedProgress = clampOpeningHoursProgress(progress);
  progressCircle.style.strokeDasharray = `${HOURS_COUNTDOWN_CIRCLE_CIRCUMFERENCE}`;
  progressCircle.style.strokeDashoffset = `${HOURS_COUNTDOWN_CIRCLE_CIRCUMFERENCE * (1 - normalizedProgress)}`;
}

function findNextOpeningHoursWindow(fromDate) {
  const dayStart = startOfOpeningHoursDay(fromDate);

  for (let offset = 0; offset < 14; offset += 1) {
    const date = addOpeningHoursDays(dayStart, offset);
    const schedule = getOpeningHoursScheduleForDate(date);

    if (!schedule || schedule.closed || !schedule.open || !schedule.close) {
      continue;
    }

    const openAt = createOpeningHoursDateAtTime(date, schedule.open);
    const closeAt = createOpeningHoursDateAtTime(date, schedule.close);

    if (!openAt || !closeAt || closeAt <= fromDate) {
      continue;
    }

    return {
      schedule,
      openAt,
      closeAt,
      isOpenNow: openAt <= fromDate && fromDate < closeAt,
    };
  }

  return null;
}

function findPreviousOpeningHoursClose(fromDate) {
  const dayStart = startOfOpeningHoursDay(fromDate);

  for (let offset = 0; offset < 14; offset += 1) {
    const date = addOpeningHoursDays(dayStart, -offset);
    const schedule = getOpeningHoursScheduleForDate(date);

    if (!schedule || schedule.closed || !schedule.close) {
      continue;
    }

    const closeAt = createOpeningHoursDateAtTime(date, schedule.close);

    if (closeAt && closeAt < fromDate) {
      return {
        schedule,
        closeAt,
      };
    }
  }

  return null;
}

function renderOpeningHoursLive() {
  const hoursList = document.getElementById("hours-list");
  const status = document.getElementById("open-status");
  const todayName = document.getElementById("hours-today-name");
  const todayTime = document.getElementById("hours-today-time");
  const todayNote = document.getElementById("hours-today-note");
  const weekCaption = document.getElementById("hours-week-caption");
  const todayCard = document.querySelector(".hours-today");

  if (!hoursList || !status || !todayName || !todayTime || !todayNote || !weekCaption || !todayCard) {
    return;
  }

  const countdown = ensureOpeningHoursCountdown(status);

  if (!countdown.progress || !countdown.time || !countdown.unit || !countdown.state || !countdown.target || !countdown.note) {
    return;
  }

  const now = new Date();
  const todayOverride = openingHourOverrides[getDateKey(now)];
  const weekdayName = getOpeningHoursWeekdayName(now);
  const todayData = getOpeningHoursScheduleForDate(now);
  const nextWindow = findNextOpeningHoursWindow(now);
  const isOpenNow = Boolean(nextWindow?.isOpenNow);

  hoursList.innerHTML = openingHours
    .map((entry) => {
      const isToday = entry.day === weekdayName;
      const displayEntry = isToday && todayOverride ? { ...entry, ...todayOverride } : entry;
      const currentStateClass = isToday ? (isOpenNow ? " is-open-now" : " is-closed-now") : "";
      const rowClasses = `hours-row${isToday ? " is-today" : ""}${displayEntry.closed ? " is-closed-day" : ""}${currentStateClass}`;
      const todayBadges = isToday
        ? `
            <span class="hours-row__badge hours-row__badge--state ${isOpenNow ? "is-open" : "is-closed"}">
              ${isOpenNow ? getText("open") : getText("closed")}
            </span>
          `
        : "";
      const titleMarkup = `<strong>${getOpeningHoursDayLabel(displayEntry)}</strong>`;

      return `
        <div class="${rowClasses}">
          <div class="hours-row__main">
            ${titleMarkup}
            ${todayBadges}
          </div>
          <span class="hours-row__time">${getOpeningHoursTime(displayEntry)}</span>
        </div>
      `;
    })
    .join("");

  status.classList.remove("is-open", "is-closed", "is-unknown");
  todayCard.classList.remove("is-open-now", "is-closed-now");

  if (!todayData) {
    countdown.state.textContent = currentLanguage === "en" ? "Status" : "\u00c1llapot";
    countdown.target.innerHTML = getText("loadingHours");
    countdown.time.textContent = "--:--:--";
    countdown.unit.textContent = currentLanguage === "en" ? "loading" : "friss\u00fcl";
    countdown.note.textContent =
      currentLanguage === "en"
        ? "The next opening time has not been set yet."
        : "A k\u00f6vetkez\u0151 nyit\u00e1s ideje m\u00e9g nincs be\u00e1ll\u00edtva.";
    setOpeningHoursCountdownProgress(countdown.progress, 0.08);
    todayName.innerHTML = getText("todayLabel");
    todayTime.textContent = "--";
    todayNote.textContent =
      currentLanguage === "en"
        ? "Today's opening hours are currently unavailable."
        : "A mai nyitvatart\u00e1s pillanatnyilag nem \u00e9rhet\u0151 el.";
    weekCaption.textContent = currentLanguage === "en" ? "Weekly overview" : "Heti \u00e1ttekint\u00e9s";
    return;
  }

  todayName.textContent = getOpeningHoursDayLabel(todayData);
  todayTime.textContent = getOpeningHoursTime(todayData);
  weekCaption.textContent = `${getText("today")}: ${getOpeningHoursDayLabel(todayData)}`;

  if (!nextWindow) {
    status.classList.add("is-unknown");
    countdown.state.textContent = currentLanguage === "en" ? "Status" : "\u00c1llapot";
    countdown.target.textContent = currentLanguage === "en" ? "No upcoming opening" : "Nincs k\u00f6zelg\u0151 nyit\u00e1s";
    countdown.time.textContent = "--:--:--";
    countdown.unit.textContent = currentLanguage === "en" ? "waiting" : "v\u00e1runk";
    countdown.note.textContent =
      currentLanguage === "en"
        ? "The next opening time is not available right now."
        : "A k\u00f6vetkez\u0151 nyit\u00e1si id\u0151pont jelenleg nincs megadva.";
    setOpeningHoursCountdownProgress(countdown.progress, 0.08);
    todayNote.textContent = todayOverride?.note || (currentLanguage === "en"
      ? "Today's opening hours cannot be determined right now."
      : "A mai nyitvatart\u00e1s jelenleg nem meghat\u00e1rozhat\u00f3.");
    return;
  }

  status.classList.add(isOpenNow ? "is-open" : "is-closed");
  todayCard.classList.add(isOpenNow ? "is-open-now" : "is-closed-now");

  if (isOpenNow) {
    countdown.state.innerHTML = getText("nowOpen");
    countdown.target.textContent = currentLanguage === "en"
      ? `Closes at ${nextWindow.schedule.close}`
      : `${nextWindow.schedule.close}-ig nyitva`;
    countdown.time.textContent = formatOpeningHoursCountdown(nextWindow.closeAt - now);
    countdown.unit.innerHTML = getText("closesIn");
    countdown.note.textContent = currentLanguage === "en" ? `Today ${todayData.time}.` : `Ma ${todayData.time}.`;
    setOpeningHoursCountdownProgress(countdown.progress, 1);
  } else {
    const previousClose = findPreviousOpeningHoursClose(now);
    const progressStart = previousClose?.closeAt ?? startOfOpeningHoursDay(now);
    const totalDuration = nextWindow.openAt - progressStart;
    const elapsedDuration = now - progressStart;
    const isSameDayOpening = getDateKey(nextWindow.openAt) === getDateKey(now);

    countdown.state.innerHTML = getText("nextOpening");
    countdown.target.textContent = currentLanguage === "en"
      ? `Opens at ${nextWindow.schedule.open}`
      : `${nextWindow.schedule.open}-kor nyitunk`;
    countdown.time.textContent = formatOpeningHoursCountdown(nextWindow.openAt - now);
    countdown.unit.innerHTML = getText("opensIn");
    countdown.note.textContent = isSameDayOpening
      ? (currentLanguage === "en"
        ? `We open today at ${nextWindow.schedule.open}.`
        : `Ma ${nextWindow.schedule.open}-kor nyitunk.`)
      : (currentLanguage === "en"
        ? `Next opening: ${getOpeningHoursDayLabel(nextWindow.schedule)} at ${nextWindow.schedule.open}.`
        : `Legk\u00f6zelebb ${nextWindow.schedule.label} ${nextWindow.schedule.open}-kor nyitunk.`);
    setOpeningHoursCountdownProgress(
      countdown.progress,
      totalDuration > 0 ? elapsedDuration / totalDuration : 0,
    );
  }

  status.setAttribute("aria-label", `${countdown.state.textContent}: ${countdown.target.textContent}`);
  todayNote.textContent = todayOverride?.note
    ? todayOverride.note
    : todayData.closed
      ? (currentLanguage === "en"
        ? `Next opening: ${getOpeningHoursDayLabel(nextWindow.schedule)} at ${nextWindow.schedule.open}.`
        : `Legk\u00f6zelebb ${nextWindow.schedule.label} ${nextWindow.schedule.open}-kor nyitunk.`)
      : isOpenNow
        ? (currentLanguage === "en" ? `Open today until ${todayData.close}.` : `Ma ${todayData.close}-ig v\u00e1runk.`)
        : (currentLanguage === "en" ? `We open today at ${todayData.open}.` : `Ma ${todayData.open}-kor nyitunk.`);
}

function initOpeningHoursTicker() {
  renderOpeningHoursLive();

  if (openingHoursTicker) {
    window.clearInterval(openingHoursTicker);
  }

  openingHoursTicker = window.setInterval(renderOpeningHoursLive, 1000);
}

function renderOpeningHours() {
  const hoursList = document.getElementById("hours-list");
  const status = document.getElementById("open-status");
  const todayName = document.getElementById("hours-today-name");
  const todayTime = document.getElementById("hours-today-time");
  const todayNote = document.getElementById("hours-today-note");
  const weekCaption = document.getElementById("hours-week-caption");
  const todayCard = document.querySelector(".hours-today");

  if (!hoursList || !status || !todayName || !todayTime || !todayNote || !weekCaption || !todayCard) {
    return;
  }

  const now = new Date();
  const todayOverride = openingHourOverrides[getDateKey(now)];
  const weekdayName = new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(now).toLowerCase();
  const todayBaseData = openingHours.find((entry) => entry.day === weekdayName);
  const todayData = todayBaseData ? { ...todayBaseData, ...todayOverride } : null;
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const isOpenNow =
    todayData &&
    !todayData.closed &&
    minutesNow >= toMinutes(todayData.open) &&
    minutesNow < toMinutes(todayData.close);

  hoursList.innerHTML = openingHours
    .map((entry) => {
      const isToday = entry.day === weekdayName;
      const displayEntry = isToday && todayOverride ? { ...entry, ...todayOverride } : entry;
      const currentStateClass = isToday ? (isOpenNow ? " is-open-now" : " is-closed-now") : "";
      const rowClasses = `hours-row${isToday ? " is-today" : ""}${displayEntry.closed ? " is-closed-day" : ""}${currentStateClass}`;
      const todayBadges = isToday
        ? `
            <span class="hours-row__badge hours-row__badge--today">Ma</span>
            <span class="hours-row__badge hours-row__badge--state ${isOpenNow ? "is-open" : "is-closed"}">
              ${isOpenNow ? "Nyitva" : "Zárva"}
            </span>
          `
        : "";

      return `
        <div class="${rowClasses}">
          <div class="hours-row__main">
            <strong>${displayEntry.label}</strong>
            ${todayBadges}
          </div>
          <span class="hours-row__time">${displayEntry.time}</span>
        </div>
      `;
    })
    .join("");

  status.classList.remove("is-open", "is-closed");
  todayCard.classList.remove("is-open-now", "is-closed-now");

  if (!todayData) {
    status.textContent = "A nyitvatartás állapota jelenleg nem meghatározható.";
    todayName.textContent = "Mai nap";
    todayTime.textContent = "--";
    todayNote.textContent = "A mai nyitvatartás pillanatnyilag nem elérhető.";
    weekCaption.textContent = "Heti áttekintés";
    return;
  }

  todayName.textContent = todayData.label;
  todayTime.textContent = todayData.time;
  weekCaption.textContent = `Ma: ${todayData.label}`;

  status.classList.add(isOpenNow ? "is-open" : "is-closed");
  todayCard.classList.add(isOpenNow ? "is-open-now" : "is-closed-now");
  status.textContent = isOpenNow
    ? `Most nyitva • ${todayData.label} • ${todayData.time}`
    : todayData.closed
      ? `Most zárva • ${todayData.label} • ${todayData.time}`
      : `Most zárva • ${todayData.label} • ${todayData.time}`;

  todayNote.textContent = todayOverride?.note
    ? todayOverride.note
    : todayData.closed
    ? "Ma zárva tartunk."
    : isOpenNow
      ? `Ma ${todayData.close}-ig várunk.`
      : `Mai nyitvatartás: ${todayData.time}.`;
}

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach((element) => observer.observe(element));
}

function activatePanelReveals(panel) {
  if (!panel) {
    return;
  }

  panel.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
    requestAnimationFrame(() => {
      element.classList.add("is-visible");
    });
  });
}

function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("gallery-lightbox-image");
  const prevButton = document.getElementById("gallery-prev");
  const nextButton = document.getElementById("gallery-next");
  const galleryItems = Array.from(document.querySelectorAll("[data-gallery-src]"));
  const closeButtons = Array.from(document.querySelectorAll("[data-gallery-close]"));

  if (!lightbox || !lightboxImage || !prevButton || !nextButton || !galleryItems.length) {
    return;
  }

  let currentIndex = 0;
  let lastTrigger = null;

  function renderImage(index) {
    const normalizedIndex = (index + galleryItems.length) % galleryItems.length;
    const currentItem = galleryItems[normalizedIndex];

    currentIndex = normalizedIndex;
    lightboxImage.src = currentItem.dataset.gallerySrc;
    lightboxImage.alt = currentItem.dataset.galleryAlt || currentItem.querySelector("img")?.alt || "";
  }

  function openLightbox(index) {
    lastTrigger = galleryItems[index];
    renderImage(index);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-lightbox");
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-lightbox");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeLightbox);
  });

  prevButton.addEventListener("click", () => {
    renderImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    renderImage(currentIndex + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      renderImage(currentIndex - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      renderImage(currentIndex + 1);
    }
  });
}

function buildLanguageSwitch(className) {
  const switcher = document.createElement("div");
  switcher.className = className;
  switcher.setAttribute("aria-label", getText("languageLabel"));
  switcher.innerHTML = `
    <button type="button" data-language-option="hu" aria-label="Magyar nyelv">
      <span class="flag-icon flag-icon--hu" aria-hidden="true"></span>
    </button>
    <button type="button" data-language-option="en" aria-label="English language">
      <span class="flag-icon flag-icon--en" aria-hidden="true"></span>
    </button>
  `;
  return switcher;
}

function syncLanguageSwitches() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "hu";

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  } catch {
    // Saving the preference is optional.
  }

  applyLanguage();
}

function ensureLanguageControls(topbarPanel, sideActions) {
  if (sideActions && !sideActions.querySelector(".language-switch")) {
    sideActions.prepend(buildLanguageSwitch("language-switch"));
  }

  if (topbarPanel && !topbarPanel.querySelector(".mobile-language-switch")) {
    topbarPanel.prepend(buildLanguageSwitch("mobile-language-switch"));
  }

  document.querySelectorAll("[data-language-option]").forEach((button) => {
    if (button.dataset.languageReady === "true") {
      return;
    }

    button.dataset.languageReady = "true";
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageOption);
    });
  });

  syncLanguageSwitches();
}

function applyLanguage() {
  const metaDescription = document.querySelector('meta[name="description"]');
  document.title = getText("title");

  if (metaDescription) {
    metaDescription.setAttribute("content", getText("description"));
  }

  if (typeof renderMenu === "function") {
    renderMenu();
  }

  setHtml(".mobile-preview-fab", getText("preview"));
  setHtml('[data-view-target="intro"]', getText("navIntro"));
  setHtml('[data-view-target="menu"]', getText("navMenu"));
  setHtml('[data-view-target="hours"]', getText("navHours"));
  setHtml('[data-view-target="reviews"]', getText("navReviews"));
  setHtml('[data-view-target="contact"]', getText("navContact"));
  setHtml(".nav-cta__label", getText("order"));
  setHtml(".mobile-order-button", getText("order"));
  setHtml(".hero .eyebrow", getText("heroEyebrow"));
  setHtml(".hero__lead", getText("heroLead"));
  setHtml(".hero__copy", getText("heroCopy"));
  setHtml(".hero__actions .button--primary", getText("menuButton"));
  setHtml(".hero__actions .button--secondary", getText("contactButton"));
  setHtml(".hero__tags span:nth-child(1)", getText("dineIn"));
  setHtml(".hero__tags span:nth-child(2)", getText("takeaway"));
  setHtml(".hero__tags span:nth-child(3)", getText("delivery"));
  setHtml(".intro-gallery-cue__eyebrow", getText("cueEyebrow"));
  setHtml(".intro-gallery-cue strong", getText("cueTitle"));
  setHtml(".hours-hero h2", getText("hoursTitle"));
  setHtml(".hours-hero > p", getText("hoursIntro"));
  setHtml(".hours-card__head strong", getText("hoursWeekly"));
  setHtml("#panel-contact .section-heading .eyebrow", getText("contactMap"));
  setHtml(".map-info-card > .eyebrow", getText("contactTitle"));
  setHtml(".contact-actions .button--primary", getText("openMap"));
  setHtml("#reviews-panel-title", getText("reviewsEyebrow"));
  setHtml("#reviews-score-title", getText("reviewsSummary"));
  setHtml("#reviews-form-panel .eyebrow", getText("ownReview"));
  setHtml('label[for="reviews-name"] > span', getText("name"));
  setHtml('label[for="reviews-rating"] > span', getText("rating"));
  setHtml('label[for="reviews-text"] > span', getText("review"));
  setHtml("#reviews-submit", getText("submit"));
  document.querySelectorAll(".mobile-order-text small").forEach((item, index) => {
    item.innerHTML = index === 0 ? getText("foodoraSmall") : getText("woltSmall");
  });

  document.querySelectorAll(".order-link__text span").forEach((item, index) => {
    item.innerHTML = index === 0 ? getText("foodoraSmall") : getText("woltSmall");
  });

  const reviewText = document.getElementById("reviews-text");
  if (reviewText) {
    reviewText.setAttribute("placeholder", getText("reviewPlaceholder"));
  }

  const contactLabelSelectors = [
    ".map-info-item:nth-child(1) .map-info-item__content span",
    ".map-info-item:nth-child(3) .map-info-item__content a",
    ".map-info-item:nth-child(4) .map-info-item__content span",
  ];
  setHtml(contactLabelSelectors[0], getText("address"));
  setHtml(contactLabelSelectors[1], getText("messenger"));
  setHtml(contactLabelSelectors[2], getText("email"));

  syncLanguageSwitches();

  if (typeof renderOpeningHoursLive === "function") {
    renderOpeningHoursLive();
  }

  if (typeof syncReviewsSnapshotToDom === "function") {
    syncReviewsSnapshotToDom();
  }

  if (typeof renderVersionPanel === "function") {
    renderVersionPanel();
  }
}

function enhanceTopbarLayout() {
  const topbar = document.querySelector(".topbar");
  const brand = topbar?.querySelector(".brand");
  const nav = topbar?.querySelector(".nav");
  const cta = topbar?.querySelector(".nav-cta");

  if (!topbar || !brand || !nav || !cta || topbar.querySelector(".topbar__inner")) {
    return;
  }

  const inner = document.createElement("div");
  inner.className = "topbar__inner";

  const navToggle = document.createElement("button");
  navToggle.className = "nav-toggle";
  navToggle.type = "button";
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-controls", "site-nav-panel");
  navToggle.setAttribute("aria-label", "Menu megnyitasa");
  navToggle.innerHTML = "<span></span><span></span><span></span>";

  const panel = document.createElement("div");
  panel.className = "topbar__panel";
  panel.id = "site-nav-panel";

  nav.id = "site-nav";

  const sideActions = document.createElement("div");
  sideActions.className = "topbar__side-actions";
  sideActions.append(cta);

  panel.append(nav, sideActions);
  inner.append(brand, navToggle, panel);
  topbar.replaceChildren(inner);
}

function enhanceHeroActions() {
  const heroContent = document.querySelector(".hero__content");
  const heroCopy = heroContent?.querySelector(".hero__copy");
  const heroTags = heroContent?.querySelector(".hero__tags");

  if (!heroContent || !heroCopy || !heroTags || heroContent.querySelector(".hero__actions")) {
    return;
  }

  const actions = document.createElement("div");
  actions.className = "hero__actions";
  actions.innerHTML = `
    <button class="button button--primary" type="button" data-view-target="menu">
      Men&uuml; megtekint&eacute;se
    </button>
    <button class="button button--secondary" type="button" data-view-target="contact">
      T&eacute;rk&eacute;p &eacute;s kapcsolat
    </button>
  `;

  heroTags.before(actions);
}

function setTopbarScrollState() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setMobileOrderVisibility() {
  const isMobile = window.innerWidth <= 700;
  const shouldShow = isMobile && window.scrollY > Math.min(420, window.innerHeight * 0.48);
  const mobileOrder = document.querySelector(".mobile-order-widget");

  document.body.classList.toggle("is-mobile-order-visible", shouldShow);

  if (!shouldShow && mobileOrder instanceof HTMLDetailsElement) {
    mobileOrder.open = false;
  }
}

function initTopbar() {
  enhanceTopbarLayout();

  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const brand = document.querySelector(".brand");
  const navCta = document.querySelector(".nav-cta");
  const topbarPanel = document.querySelector(".topbar__panel");

  if (!topbar || !navToggle) {
    return;
  }

  if (navCta) {
    navCta.innerHTML = `<span class='nav-cta__label'>${getText("order")}</span>`;
    navCta.setAttribute("aria-label", "Rendeles leadasa");
    navCta.setAttribute("aria-expanded", "false");
    navCta.setAttribute("aria-haspopup", "true");
    navCta.removeAttribute("data-view-target");
  }

  let sideActions = topbarPanel?.querySelector(".topbar__side-actions");

  if (topbarPanel && !sideActions) {
    sideActions = document.createElement("div");
    sideActions.className = "topbar__side-actions";
    topbarPanel.append(sideActions);
  }

  let navCtaGroup = navCta?.closest(".nav-cta-group");
  let orderMenu = navCtaGroup?.querySelector(".order-menu");

  if (navCta && topbarPanel && !navCtaGroup) {
    navCtaGroup = document.createElement("div");
    navCtaGroup.className = "nav-cta-group";
    navCta.replaceWith(navCtaGroup);
    navCtaGroup.append(navCta);

    orderMenu = document.createElement("div");
    orderMenu.className = "order-menu";
    orderMenu.innerHTML = `
      <a class="order-link" href="https://www.foodora.hu/restaurant/hwkt/gyros-box-gyongyos" target="_blank" rel="noreferrer">
        <span class="order-link__logo order-link__logo--foodora">foodora</span>
        <span class="order-link__text">
          <strong>Foodora</strong>
          <span>Gyros Box Gy&ouml;ngy&ouml;s</span>
        </span>
      </a>
      <a class="order-link" href="https://wolt.com/hu/hun/gyongyos/restaurant/gyros-box-es-smash-point-burger" target="_blank" rel="noreferrer">
        <span class="order-link__logo order-link__logo--wolt">Wolt</span>
        <span class="order-link__text">
          <strong>Wolt</strong>
          <span>Gyros Box oldal</span>
        </span>
      </a>
    `;

    navCtaGroup.append(orderMenu);
  }

  if (navCtaGroup && sideActions && navCtaGroup.parentElement !== sideActions) {
    sideActions.prepend(navCtaGroup);
  }

  ensureLanguageControls(topbarPanel, sideActions);

  function closeOrderMenu() {
    if (!orderMenu || !navCta) {
      return;
    }

    orderMenu.classList.remove("is-open");
    navCta.setAttribute("aria-expanded", "false");
  }

  function closeMenu() {
    topbar.classList.remove("is-menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("is-menu-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  if (navCta && orderMenu && navCtaGroup) {
    navCta.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = orderMenu.classList.toggle("is-open");
      navCta.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    orderMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeOrderMenu();
      });
    });
  }

  if (brand) {
    brand.addEventListener("click", () => {
      closeMenu();
      closeOrderMenu();
    });
  }

  document.addEventListener("click", (event) => {
    if (orderMenu && navCtaGroup && !navCtaGroup.contains(event.target)) {
      closeOrderMenu();
    }

    if (topbar.classList.contains("is-menu-open") && !topbar.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeOrderMenu();
    }
  });

  function syncTopbarState() {
    if (window.innerWidth > 860) {
      closeMenu();
    }

    closeOrderMenu();
    setTopbarScrollState();
    setMobileOrderVisibility();
  }

  window.addEventListener("resize", syncTopbarState);
  window.addEventListener("scroll", setTopbarScrollState, { passive: true });
  window.addEventListener("scroll", setMobileOrderVisibility, { passive: true });
  syncTopbarState();
}

function initViews() {
  const tabButtons = document.querySelectorAll(".nav__button[data-view-target]");
  const triggerButtons = document.querySelectorAll("[data-view-target]");
  const panels = document.querySelectorAll("[data-view-panel]");
  const heroStage = document.getElementById("hero-stage");
  const introGalleryCue = document.querySelector(".intro-gallery-cue");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("gallery-lightbox-image");
  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const brand = document.querySelector(".brand");

  function showView(viewName, scrollToPanel = true) {
    let activePanel = null;
    const isIntroView = viewName === "intro";
    const isContactView = viewName === "contact";

    panels.forEach((panel) => {
      const isActive = panel.dataset.viewPanel === viewName;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);

      if (isActive) {
        activePanel = panel;
      }
    });

    tabButtons.forEach((button) => {
      const isActive = button.dataset.viewTarget === viewName;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    if (heroStage) {
      heroStage.hidden = !isIntroView;
    }

    if (introGalleryCue) {
      introGalleryCue.hidden = !isIntroView;
    }

    document.body.classList.toggle("has-contact-view", isContactView);

    if (lightbox && !lightbox.hidden) {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-lightbox");

      if (lightboxImage) {
        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";
      }
    }

    closePopularMenuModal();

    if (topbar && navToggle) {
      topbar.classList.remove("is-menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    activatePanelReveals(activePanel);

    if (scrollToPanel) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  triggerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.viewTarget);
    });
  });

  tabButtons.forEach((button, index) => {
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabButtons.length) % tabButtons.length;
      const nextButton = tabButtons[nextIndex];

      nextButton.focus();
      showView(nextButton.dataset.viewTarget);
    });
  });

  if (brand) {
    brand.addEventListener("click", () => {
      showView("intro", false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  showView("intro", false);
}

function setYear() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function renderVersionPanel() {
  const versionButton = document.querySelector("[data-version-open]");
  const versionLabel = document.querySelector("[data-version-label]");
  const currentVersion = document.querySelector("[data-version-current]");
  const currentLabel = document.querySelector("[data-version-current-label]");
  const eyebrow = document.querySelector("[data-version-eyebrow]");
  const title = document.querySelector("[data-version-title]");
  const body = document.querySelector("[data-version-body]");

  if (versionButton) {
    versionButton.innerHTML = `${getText("versionButton")} <span data-version-label>${SITE_VERSION}</span>`;
  }

  if (versionLabel) {
    versionLabel.textContent = SITE_VERSION;
  }

  if (currentVersion) {
    currentVersion.textContent = SITE_VERSION;
  }

  if (currentLabel) {
    currentLabel.innerHTML = getText("currentVersion");
  }

  if (eyebrow) {
    eyebrow.innerHTML = getText("versionEyebrow");
  }

  if (title) {
    title.innerHTML = getText("versionTitle");
  }

  if (body) {
    body.innerHTML = SITE_RELEASES.map((release) => {
      const heading = currentLanguage === "en" ? release.enTitle : release.huTitle;
      const items = currentLanguage === "en" ? release.enItems : release.huItems;

      return `
        <article class="version-entry">
          <div class="version-entry__head">
            <strong>${release.version}</strong>
            <span>${release.date}</span>
          </div>
          <h3>${heading}</h3>
          <ul>
            ${items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      `;
    }).join("");
  }
}

function initVersionModal() {
  const modal = document.getElementById("version-modal");
  const openButton = document.querySelector("[data-version-open]");
  const closeButtons = document.querySelectorAll("[data-version-close]");

  if (!modal || !openButton) {
    return;
  }

  function openVersionModal() {
    renderVersionPanel();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-version-modal");
  }

  function closeVersionModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-version-modal");
    openButton.focus();
  }

  openButton.addEventListener("click", openVersionModal);
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeVersionModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeVersionModal();
    }
  });

  renderVersionPanel();
}

function initContactCompass() {
  const track = document.getElementById("contact-compass-track");
  const marker = document.getElementById("contact-compass-marker");
  const readout = document.getElementById("contact-compass-readout");
  const mapSensor = document.getElementById("map-embed-sensor");
  const compassNeedle = document.getElementById("contact-pointer-compass-needle");
  const compassFace = document.getElementById("contact-pointer-compass-face");
  let pointerFrame = 0;
  let glideFrame = 0;
  let lastClientX = 0;
  let lastClientY = 0;
  let targetRatio = 0;
  let currentRatio = 0;

  if (!track || !marker || !readout || !compassNeedle || !compassFace) {
    return;
  }

  function setCompassPosition(ratio) {
    const clampedRatio = Math.min(Math.max(ratio, 0), 1);
    const degrees = Math.round(clampedRatio * 360);
    const markerRatio = clampedRatio * 100;
    const formattedDegrees = String(degrees).padStart(3, "0");

    marker.style.left = `${markerRatio}%`;
    readout.textContent = `N ${formattedDegrees}\u00b0`;
  }

  function ratioFromClientX(clientX) {
    const rect = track.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  }

  function animateCompassMarker() {
    const delta = targetRatio - currentRatio;

    currentRatio += delta * 0.24;

    if (Math.abs(delta) < 0.0015) {
      currentRatio = targetRatio;
    }

    setCompassPosition(currentRatio);

    if (currentRatio !== targetRatio) {
      glideFrame = window.requestAnimationFrame(animateCompassMarker);
      return;
    }

    glideFrame = 0;
  }

  function updateFromClientX(clientX) {
    targetRatio = Math.min(Math.max(ratioFromClientX(clientX), 0), 1);

    if (!glideFrame) {
      glideFrame = window.requestAnimationFrame(animateCompassMarker);
    }
  }

  function setCompassNeedle(clientX, clientY) {
    const rect = compassFace.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);

    compassNeedle.style.transform = `translate(-50%, -50%) rotate(${angle + 180}deg)`;
  }

  function flushCompassPosition() {
    pointerFrame = 0;
    updateFromClientX(lastClientX);
    setCompassNeedle(lastClientX, lastClientY);
  }

  function scheduleCompassUpdate(clientX, clientY) {
    lastClientX = clientX;
    lastClientY = clientY;

    if (!pointerFrame) {
      pointerFrame = window.requestAnimationFrame(flushCompassPosition);
    }
  }

  function handleGlobalPointerMove(event) {
    if (!document.body.classList.contains("has-contact-view")) {
      return;
    }

    scheduleCompassUpdate(event.clientX, event.clientY);
  }

  window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });

  track.addEventListener("pointermove", (event) => {
    scheduleCompassUpdate(event.clientX, event.clientY);
  }, { passive: true });

  track.addEventListener("pointerenter", (event) => {
    scheduleCompassUpdate(event.clientX, event.clientY);
  }, { passive: true });

  mapSensor?.addEventListener("pointermove", (event) => {
    scheduleCompassUpdate(event.clientX, event.clientY);
  }, { passive: true });

  mapSensor?.addEventListener("pointerenter", (event) => {
    scheduleCompassUpdate(event.clientX, event.clientY);
  }, { passive: true });

  const initialCompassRect = compassFace.getBoundingClientRect();
  lastClientX = window.innerWidth * 0.5;
  lastClientY = initialCompassRect.top + initialCompassRect.height * 0.5;
  targetRatio = 0;
  currentRatio = 0;
  setCompassPosition(0);
  setCompassNeedle(lastClientX, lastClientY);
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

renderMenu();
initOpeningHoursTicker();
renderReviews();
initReviewsBrowser();
initReviewsForm();
clearStoredSiteReviewsOnce();
hydrateSiteReviews();
setYear();
enhanceHeroActions();
applyIntroOnlyTopbarPreview();
initTopbar();
applyLanguage();
initVersionModal();
initReveal();
initGalleryLightbox();
initViews();
initContactCompass();
resetPageToTop();
requestAnimationFrame(resetPageToTop);
setTimeout(resetPageToTop, 60);
window.addEventListener("load", resetPageToTop);
window.addEventListener("pageshow", resetPageToTop);
