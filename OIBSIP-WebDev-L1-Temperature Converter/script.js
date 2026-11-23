// Thermo - Temperature Converter (Task 3) - Vanilla JavaScript

const root = document.documentElement;
const input = document.getElementById("temp-input");
const convertBtn = document.getElementById("convert-btn");
const errorMsg = document.getElementById("error-msg");
const resultBox = document.getElementById("result");
const gaugeFill = document.getElementById("gauge-fill");
const tiles = document.querySelectorAll(".tiles li");

const outputs = {
  C: document.getElementById("out-c"),
  F: document.getElementById("out-f"),
  K: document.getElementById("out-k"),
};

// Lowest possible value (absolute zero) in each unit
const ABSOLUTE_ZERO = { C: -273.15, F: -459.67, K: 0 };
const SYMBOL = { C: "°C", F: "°F", K: "K" };

// Accepts values like 25, -10, +3.5, .5, 12.
const NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)$/;

// Last number shown for each unit (used for the count-up animation)
const shown = { C: 0, F: 0, K: 0 };

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getUnit = () => document.querySelector('input[name="unit"]:checked').value;

// Safe localStorage helpers (can fail in private mode)
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } },
};

// ---------- Temperature categories (colour moods) ----------
// The "id" matches :root[data-mood="..."] in style.css, so the whole page
// (scrollbar, buttons, glow, thermometer...) changes colour with the category.
// c1 / c2 are the same two colours as in the CSS (used by the category cards).
const MOODS = [
  { id: "freezing", label: "Freezing", range: "0 °C and below", sample: -10, c1: "#a5f3fc", c2: "#22d3ee" },
  { id: "cold",     label: "Cold",     range: "0 to 15 °C",     sample: 8,   c1: "#818cf8", c2: "#3b82f6" },
  { id: "mild",     label: "Mild",     range: "15 to 25 °C",    sample: 20,  c1: "#34d399", c2: "#10b981" },
  { id: "warm",     label: "Warm",     range: "25 to 35 °C",    sample: 30,  c1: "#fde047", c2: "#f59e0b" },
  { id: "hot",      label: "Hot",      range: "35 to 45 °C",    sample: 40,  c1: "#fb923c", c2: "#ea580c" },
  { id: "extreme",  label: "Extreme",  range: "Above 45 °C",    sample: 50,  c1: "#f87171", c2: "#dc2626" },
];
const DEFAULT_MOOD = MOODS[2]; // mild (green) before anything is converted

function getMood(celsius) {
  if (celsius <= 0) return MOODS[0];
  if (celsius < 15) return MOODS[1];
  if (celsius < 25) return MOODS[2];
  if (celsius < 35) return MOODS[3];
  if (celsius < 45) return MOODS[4];
  return MOODS[5];
}

const moodLabel = document.getElementById("mood-label");
const moodNote = document.getElementById("mood-note");
const catsBox = document.getElementById("cats");

function applyMood(mood) {
  root.dataset.mood = mood.id;
  moodLabel.textContent = mood.label;
  moodNote.textContent = mood.range;
  catsBox.querySelectorAll(".cat").forEach((c) => c.classList.toggle("active", c.dataset.mood === mood.id));
}

// ---------- Conversion formulas ----------
function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15; // Kelvin
}

function fromCelsius(c) {
  return { C: c, F: c * 9 / 5 + 32, K: c + 273.15 };
}

function format(n) {
  // Round to 2 decimals and drop trailing zeros
  const r = Number(n.toFixed(2));
  return String(Object.is(r, -0) ? 0 : r);
}

// ---------- Validation ----------
// Returns { valid: true, value } or { valid: false, message }
function validate(rawText, unit) {
  const text = rawText.trim();

  if (text === "") {
    return { valid: false, message: "Please enter a temperature value." };
  }
  if (!NUMBER_PATTERN.test(text)) {
    return { valid: false, message: "Only numbers are allowed. Example: 25 or -40.5" };
  }

  const value = parseFloat(text);

  if (toCelsius(value, unit) < -273.15 - 1e-9) {
    return {
      valid: false,
      message: `Below absolute zero! The lowest possible temperature is ${ABSOLUTE_ZERO[unit]} ${SYMBOL[unit]}.`,
    };
  }
  return { valid: true, value };
}

function showError(message) {
  // Restart the shake animation each time
  input.classList.remove("invalid");
  void input.offsetWidth;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");

  if (errorMsg.textContent !== message) {
    errorMsg.textContent = message;
    errorMsg.style.animation = "none";
    void errorMsg.offsetWidth;
    errorMsg.style.animation = "";
  }
  errorMsg.hidden = false;
  resultBox.hidden = true;
  applyMood(DEFAULT_MOOD); // no valid result, so go back to the neutral colour
}

function clearError() {
  errorMsg.hidden = true;
  errorMsg.textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

// ---------- Animations / display ----------
function countUp(el, key, target) {
  const start = shown[key];
  shown[key] = target;
  if (reduceMotion) { el.textContent = format(target); return; }

  const duration = 700;
  const t0 = performance.now();
  function step(now) {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out
    el.textContent = format(start + (target - start) * eased);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = format(target);
  }
  requestAnimationFrame(step);
}

function updateGauge(celsius) {
  // Map -50°C ... 100°C onto 0% ... 100%
  const percent = Math.min(100, Math.max(4, ((celsius + 50) / 150) * 100));
  gaugeFill.style.height = percent + "%";
}

function convert(saveToHistory = true) {
  const unit = getUnit();
  const check = validate(input.value, unit);

  if (!check.valid) {
    showError(check.message);
    return;
  }

  clearError();
  const celsius = toCelsius(check.value, unit);
  const all = fromCelsius(celsius);

  // Show the box first so the thermometer can animate from zero on first use
  const wasHidden = resultBox.hidden;
  resultBox.hidden = false;
  if (wasHidden) { gaugeFill.style.height = "0%"; void gaugeFill.offsetHeight; }

  for (const key of ["C", "F", "K"]) countUp(outputs[key], key, all[key]);
  tiles.forEach((t) => t.classList.toggle("source", t.dataset.unit === unit));
  applyMood(getMood(celsius));
  updateGauge(celsius);

  if (saveToHistory) addHistory(check.value, unit, all);
}

// ---------- Events ----------
convertBtn.addEventListener("click", (e) => {
  // Ripple effect
  const rect = convertBtn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const dot = document.createElement("span");
  dot.className = "ripple";
  dot.style.width = dot.style.height = size + "px";
  dot.style.left = e.clientX - rect.left - size / 2 + "px";
  dot.style.top = e.clientY - rect.top - size / 2 + "px";
  convertBtn.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove());

  convert();
});

// Real-time validation while typing (no error shown for empty field).
// A valid number also changes the page colour straight away.
input.addEventListener("input", () => {
  if (input.value.trim() === "") { clearError(); return; }
  const unit = getUnit();
  const check = validate(input.value, unit);
  if (check.valid) {
    clearError();
    applyMood(getMood(toCelsius(check.value, unit)));
  } else {
    showError(check.message);
  }
});

// Re-check when the unit changes (absolute zero limit differs per unit)
document.querySelectorAll('input[name="unit"]').forEach((radio) =>
  radio.addEventListener("change", () => {
    if (input.value.trim() !== "") convert(false);
  })
);

// Enter key also converts
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convert();
});

// ---------- Quick picks ----------
document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.getElementById("u-" + chip.dataset.u.toLowerCase()).checked = true;
    input.value = chip.dataset.v;
    convert();
  })
);

// ---------- Temperature category cards ----------
MOODS.forEach((m) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cat";
  btn.dataset.mood = m.id;
  btn.style.setProperty("--k1", m.c1);
  btn.style.setProperty("--k2", m.c2);
  btn.title = `Try ${m.sample} °C`;
  btn.innerHTML = `<strong>${m.label}</strong><span>${m.range}</span>`;
  btn.addEventListener("click", () => {
    document.getElementById("u-c").checked = true;
    input.value = String(m.sample);
    convert(false);
    document.getElementById("card").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });
  catsBox.appendChild(btn);
});
applyMood(DEFAULT_MOOD);

// ---------- Copy result on click ----------
const toast = document.getElementById("toast");
const copyHint = document.getElementById("copy-hint");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

async function copyTile(tile) {
  const text = tile.querySelector("strong").textContent.replace(/\s+/g, " ").trim();
  try {
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${text}`);
  } catch (err) {
    showToast("Copy not supported in this browser");
  }
}

tiles.forEach((tile) => {
  tile.addEventListener("click", () => copyTile(tile));
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); copyTile(tile); }
  });
});

// Show the copy tip once results are visible
new MutationObserver(() => { copyHint.hidden = resultBox.hidden; })
  .observe(resultBox, { attributes: true, attributeFilter: ["hidden"] });

// ---------- Recent conversions (saved in the browser) ----------
const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");
const clearBtn = document.getElementById("clear-history");
const MAX_HISTORY = 6;
let history = [];

try { history = JSON.parse(store.get("thermo-history") || "[]"); } catch (e) { history = []; }
if (!Array.isArray(history)) history = [];

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.title = "Use this value again";

    const from = document.createElement("span");
    from.className = "from";
    from.textContent = `${format(item.value)} ${SYMBOL[item.unit]}`;

    const to = document.createElement("span");
    to.className = "to";
    const others = ["C", "F", "K"].filter((u) => u !== item.unit);
    to.textContent = others.map((u) => `${format(item.all[u])} ${SYMBOL[u]}`).join("  ·  ");

    btn.append(from, to);
    btn.addEventListener("click", () => {
      document.getElementById("u-" + item.unit.toLowerCase()).checked = true;
      input.value = String(item.value);
      convert(false);
      document.getElementById("card").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
    li.appendChild(btn);
    historyList.appendChild(li);
  });
  historyEmpty.hidden = history.length > 0;
  clearBtn.hidden = history.length === 0;
}

function addHistory(value, unit, all) {
  const last = history[0];
  if (last && last.value === value && last.unit === unit) return; // skip duplicates
  history.unshift({ value, unit, all });
  history = history.slice(0, MAX_HISTORY);
  store.set("thermo-history", JSON.stringify(history));
  renderHistory();
}

clearBtn.addEventListener("click", () => {
  history = [];
  store.set("thermo-history", "[]");
  renderHistory();
  showToast("History cleared");
});
renderHistory();

// ---------- Light / dark theme ----------
const themeBtn = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, animate) {
  if (animate && !reduceMotion) {
    root.classList.add("theming");
    setTimeout(() => root.classList.remove("theming"), 600);
  }
  root.dataset.theme = theme;
  if (themeMeta) themeMeta.content = theme === "dark" ? "#080c1a" : "#eef3ff";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

applyTheme(root.dataset.theme, false);

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next, true);
  store.set("thermo-theme", next);
});

// Follow the system setting until the user picks a theme manually
const systemQuery = window.matchMedia("(prefers-color-scheme: light)");
const onSystemChange = (e) => { if (!store.get("thermo-theme")) applyTheme(e.matches ? "light" : "dark", true); };
if (systemQuery.addEventListener) systemQuery.addEventListener("change", onSystemChange);

// ---------- Scroll: progress bar, back-to-top, reveal ----------
const progressBar = document.getElementById("scroll-progress");
const toTop = document.getElementById("to-top");
let ticking = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  progressBar.style.transform = `scaleX(${ratio})`;
  toTop.classList.toggle("show", window.scrollY > 450);
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ---------- Card: light that follows the pointer ----------
const card = document.getElementById("card");
card.addEventListener("pointermove", (e) => {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", e.clientX - r.left + "px");
  card.style.setProperty("--my", e.clientY - r.top + "px");
});

// ---------- Loader screen ----------
(function runLoader() {
  const loader = document.getElementById("loader");
  const statusEl = document.getElementById("l-status");
  const percentEl = document.getElementById("l-percent");

  const STEPS = [
    { at: 0,  text: "Calibrating sensors…" },
    { at: 30, text: "Loading conversion formulas…" },
    { at: 60, text: "Checking absolute zero…" },
    { at: 85, text: "Almost ready…" },
    { at: 100, text: "Ready!" },
  ];

  const DURATION = reduceMotion ? 400 : 3000;   // minimum time the loader is visible
  let pageLoaded = document.readyState === "complete";
  window.addEventListener("load", () => { pageLoaded = true; });

  function finish() {
    loader.classList.add("done");
    root.classList.add("ready");
    loader.addEventListener("transitionend", () => loader.remove(), { once: true });
    setTimeout(() => loader.remove(), 1200); // safety net
    input.focus({ preventScroll: true });
  }

  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / DURATION);
    // ease-in-out so the mercury rises smoothly
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const progress = Math.round(eased * 100);

    loader.style.setProperty("--p", progress);
    loader.style.setProperty("--hue", 200 - 185 * (progress / 100)); // blue to orange
    percentEl.textContent = progress + "%";
    const step = [...STEPS].reverse().find((s) => progress >= s.at);
    if (step && statusEl.textContent !== step.text) statusEl.textContent = step.text;

    if (t < 1) { requestAnimationFrame(tick); return; }
    // wait for the page (fonts, images) if it is still loading, then hide
    const wait = () => (pageLoaded ? setTimeout(finish, 350) : setTimeout(wait, 100));
    wait();
  }
  requestAnimationFrame(tick);
})();