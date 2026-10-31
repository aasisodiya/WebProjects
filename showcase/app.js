// Showcase home page — renders projects (showcase/projects.js) and notes (showcase/notes.js).
(() => {
  const CATEGORIES = window.SHOWCASE_CATEGORIES;
  const PROJECTS = window.SHOWCASE_PROJECTS;
  const NOTES = window.SHOWCASE_NOTES || [];
  const REPO = "https://github.com/aasisodiya/WebProjects/tree/master/";
  const NOTE_CATEGORIES = [
    { id: "css", label: "CSS" },
    { id: "js", label: "JavaScript" },
    { id: "html", label: "HTML & Web" },
    { id: "3d", label: "3D & XR" },
  ];

  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // Escapes text, then renders `inline code`.
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const slug = (p) => p.replace(/\.html$/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const thumbUrl = (p) => `showcase/thumbs/${slug(p)}.webp`;
  const href = (p) => encodeURI(p);
  const sourceUrl = (p) => REPO + encodeURI(p.endsWith("/") ? p : p.slice(0, p.lastIndexOf("/") + 1));
  const catOf = (id) => CATEGORIES.find((c) => c.id === id);
  const year = (d) => d.slice(0, 4);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Projects only known by year are stored as YYYY-01-01.
  const fmtDate = (d) => (d.endsWith("-01-01") ? year(d) : `${MONTHS[+d.slice(5, 7) - 1]} ${year(d)}`);
  const storage = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- Theme ---------- */

  $("#theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    storage.set("showcase-theme", next);
  });

  /* ---------- Hero ---------- */

  const years = [...new Set(PROJECTS.map((p) => year(p.d)))].sort();
  const topicCount = NOTES.reduce((n, note) => n + note.topics.length, 0);
  $("#stats").innerHTML = [
    [PROJECTS.length, "projects"],
    [NOTES.length, "study notes"],
    [topicCount, "note topics"],
    [`${years[0]}–${years[years.length - 1].slice(2)}`, "and counting"],
  ].map(([v, l]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("");

  // Three rows of thumbnails, each duplicated so the CSS loop is seamless.
  const wallPicks = PROJECTS.filter((p) => p.c !== "sites").sort(() => Math.random() - 0.5).slice(0, 24);
  $("#hero-wall").innerHTML = [0, 1, 2].map((r) => {
    const row = wallPicks.slice(r * 8, r * 8 + 8);
    const imgs = row.map((p) => `<img src="${thumbUrl(p.p)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`).join("");
    return `<div class="wall-row">${imgs}${imgs}</div>`;
  }).join("");

  /* ---------- Projects ---------- */

  const state = { q: "", cat: "all", tags: new Set(), year: "all", sort: "new" };
  const params = new URLSearchParams(location.search);
  if (params.get("q")) state.q = params.get("q");
  if (catOf(params.get("cat"))) state.cat = params.get("cat");
  if (years.includes(params.get("year"))) state.year = params.get("year");
  if (["old", "az"].includes(params.get("sort"))) state.sort = params.get("sort");
  (params.get("tags") || "").split(",").filter(Boolean).forEach((t) => state.tags.add(t));

  const grid = $("#project-grid");
  const searchInput = $("#project-search");
  const yearSelect = $("#year-filter");
  const sortSelect = $("#sort");
  searchInput.value = state.q;
  sortSelect.value = state.sort;
  yearSelect.innerHTML = `<option value="all">All years</option>` +
    [...years].reverse().map((y) => `<option value="${y}">${y}</option>`).join("");
  yearSelect.value = state.year;

  const cards = new Map();
  for (const p of PROJECTS) {
    const cat = catOf(p.c);
    const el = document.createElement("article");
    el.className = "card";
    el.style.setProperty("--cat", `var(--c-${p.c})`);
    el.innerHTML = `
      <button class="thumb" type="button" aria-label="Live preview of ${esc(p.t)}">
        <span class="thumb-fallback" aria-hidden="true">${cat.icon}</span>
        <img class="loading" src="${thumbUrl(p.p)}" alt="" loading="lazy" decoding="async">
        <span class="thumb-overlay"><span>▶ Live preview</span></span>
      </button>
      <div class="card-body">
        <div class="card-meta"><span class="badge">${esc(cat.label)}</span><time datetime="${p.d}">${fmtDate(p.d)}</time></div>
        <h3><a href="${href(p.p)}" target="_blank" rel="noopener">${esc(p.t)}</a></h3>
        <p>${inline(p.desc)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>`;
    const img = $("img", el);
    img.addEventListener("load", () => img.classList.remove("loading"));
    img.addEventListener("error", () => img.remove());
    $(".thumb", el).addEventListener("click", () => openPreview(p));
    p.haystack = [p.t, p.desc, p.p, cat.label, ...p.tags].join(" ").toLowerCase();
    cards.set(p, el);
  }

  const matches = (p, ignore) =>
    (ignore === "cat" || state.cat === "all" || p.c === state.cat) &&
    (state.year === "all" || year(p.d) === state.year) &&
    [...state.tags].every((t) => p.tags.includes(t)) &&
    state.q.toLowerCase().split(/\s+/).every((w) => p.haystack.includes(w));

  const sorters = {
    new: (a, b) => b.d.localeCompare(a.d) || a.t.localeCompare(b.t),
    old: (a, b) => a.d.localeCompare(b.d) || a.t.localeCompare(b.t),
    az: (a, b) => a.t.localeCompare(b.t),
  };

  let visible = [];

  function renderTabs() {
    const count = (id) => PROJECTS.filter((p) => matches(p, "cat") && (id === "all" || p.c === id)).length;
    $("#category-tabs").innerHTML = [{ id: "all", label: "All" }, ...CATEGORIES].map((c) => `
      <button class="tab" role="tab" type="button" data-cat="${c.id}" aria-selected="${state.cat === c.id}"
        ${c.id !== "all" ? `style="--cat: var(--c-${c.id})"` : ""}>
        ${c.id !== "all" ? '<span class="dot"></span>' : ""}${esc(c.label)}<span class="count">${count(c.id)}</span>
      </button>`).join("");
  }

  function renderChips() {
    const counts = {};
    PROJECTS.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
    const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
    $("#tag-chips").innerHTML = tags.map((t) =>
      `<button class="chip" type="button" data-tag="${esc(t)}" aria-pressed="${state.tags.has(t)}">${esc(t)}</button>`
    ).join("") + (state.tags.size ? `<button class="chip chip-clear" type="button" data-clear-tags>clear</button>` : "");
  }

  function syncUrl() {
    const q = new URLSearchParams();
    if (state.q) q.set("q", state.q);
    if (state.cat !== "all") q.set("cat", state.cat);
    if (state.year !== "all") q.set("year", state.year);
    if (state.sort !== "new") q.set("sort", state.sort);
    if (state.tags.size) q.set("tags", [...state.tags].join(","));
    const qs = q.toString();
    history.replaceState(null, "", (qs ? `?${qs}` : location.pathname) + location.hash);
  }

  function render() {
    visible = PROJECTS.filter((p) => matches(p)).sort(sorters[state.sort]);
    const frag = document.createDocumentFragment();
    visible.forEach((p, i) => {
      const el = cards.get(p);
      el.style.animationDelay = `${Math.min(i, 12) * 25}ms`;
      frag.append(el);
    });
    grid.replaceChildren(frag);
    $("#project-empty").hidden = visible.length > 0;
    $("#result-count").textContent = `${visible.length} of ${PROJECTS.length} shown`;
    renderTabs();
    renderChips();
    syncUrl();
  }

  $("#category-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest("[data-cat]");
    if (!tab) return;
    state.cat = tab.dataset.cat;
    render();
  });

  $("#tag-chips").addEventListener("click", (e) => {
    const chip = e.target.closest("button");
    if (!chip) return;
    if (chip.hasAttribute("data-clear-tags")) state.tags.clear();
    else if (state.tags.has(chip.dataset.tag)) state.tags.delete(chip.dataset.tag);
    else state.tags.add(chip.dataset.tag);
    render();
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.q = searchInput.value.trim();
      render();
    }, 120);
  });
  yearSelect.addEventListener("change", () => { state.year = yearSelect.value; render(); });
  sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

  $("[data-reset]").addEventListener("click", () => {
    Object.assign(state, { q: "", cat: "all", year: "all" });
    state.tags.clear();
    searchInput.value = "";
    yearSelect.value = "all";
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !dialog.open) {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });

  /* ---------- Preview dialog ---------- */

  const dialog = $("#preview");
  const iframe = $("#preview-iframe");
  const frame = $("#preview-frame");
  let current = null;

  function openPreview(p) {
    current = p;
    const cat = catOf(p.c);
    dialog.style.setProperty("--cat", `var(--c-${p.c})`);
    $("#preview-cat").textContent = cat.label;
    $("#preview-title").textContent = p.t;
    $("#preview-desc").innerHTML = `${inline(p.desc)} <span class="muted">· ${fmtDate(p.d)} · ${p.tags.map(esc).join(", ")}</span>`;
    $("#preview-open").href = href(p.p);
    $("#preview-source").href = sourceUrl(p.p);
    iframe.src = href(p.p);
    if (!dialog.open) dialog.showModal();
  }

  function step(dir) {
    const list = visible.includes(current) ? visible : PROJECTS;
    const i = list.indexOf(current);
    openPreview(list[(i + dir + list.length) % list.length]);
  }

  // Unload the page on close so audio, webcam or WebGL stop running.
  dialog.addEventListener("close", () => { iframe.src = "about:blank"; });
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  $("#preview-close").addEventListener("click", () => dialog.close());
  $("#preview-prev").addEventListener("click", () => step(-1));
  $("#preview-next").addEventListener("click", () => step(1));
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  $(".seg").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-width]");
    if (!btn) return;
    $(".seg").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    frame.style.width = btn.dataset.width;
  });

  render();

  /* ---------- Notes ---------- */

  const notesState = { q: "", cat: "all" };
  const notesSearch = $("#notes-search");
  const notesGrid = $("#notes-grid");
  const TOPIC_PREVIEW = 6;

  const highlight = (text, words) => {
    let html = inline(text);
    for (const w of words) {
      if (!w) continue;
      html = html.replace(new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![^<]*>)`, "gi"), "<mark>$1</mark>");
    }
    return html;
  };

  function renderNotes() {
    const words = notesState.q.toLowerCase().split(/\s+/).filter(Boolean);
    const hit = (s) => words.every((w) => s.toLowerCase().includes(w));
    const inCat = (n) => notesState.cat === "all" || n.c === notesState.cat;

    const results = NOTES.map((n) => {
      if (!words.length) return { n, topics: n.topics, filtered: false };
      if (hit(n.t + " " + n.s)) return { n, topics: n.topics, filtered: false };
      const topics = n.topics.filter((t) => hit(t.t));
      return topics.length ? { n, topics, filtered: true } : null;
    }).filter(Boolean);

    $("#notes-tabs").innerHTML = [{ id: "all", label: "All" }, ...NOTE_CATEGORIES].map((c) => `
      <button class="tab" role="tab" type="button" data-cat="${c.id}" aria-selected="${notesState.cat === c.id}"
        ${c.id !== "all" ? `style="--cat: var(--c-${c.id})"` : ""}>
        ${c.id !== "all" ? '<span class="dot"></span>' : ""}${esc(c.label)}<span class="count">${results.filter((r) => c.id === "all" || r.n.c === c.id).length}</span>
      </button>`).join("");

    const shown = results.filter((r) => inCat(r.n));
    notesGrid.innerHTML = shown.map(({ n, topics, filtered }, i) => {
      const cat = NOTE_CATEGORIES.find((c) => c.id === n.c);
      const expandAll = filtered || topics.length <= TOPIC_PREVIEW + 1;
      const list = expandAll ? topics : topics.slice(0, TOPIC_PREVIEW);
      const li = (t) => `<li><a href="${href(n.p)}#${encodeURIComponent(t.a)}" target="_blank" rel="noopener">${highlight(t.t, words)}</a></li>`;
      return `
        <article class="note" style="--cat: var(--c-${n.c}); animation-delay: ${Math.min(i, 9) * 30}ms">
          <div class="note-head"><span class="badge">${esc(cat.label)}</span></div>
          <h3><a href="${href(n.p)}" target="_blank" rel="noopener">${highlight(n.t, words)}</a></h3>
          <p class="note-meta">${n.topics.length} topic${n.topics.length === 1 ? "" : "s"} · updated ${fmtDate(n.u)}</p>
          ${n.s ? `<p class="note-summary">${highlight(n.s, words)}</p>` : ""}
          ${topics.length ? `<ul class="topics">${list.map(li).join("")}</ul>` : ""}
          ${!expandAll ? `<button class="more" type="button" data-note="${esc(n.p)}">Show all ${topics.length} topics</button>` : ""}
          ${filtered ? `<p class="note-meta" style="margin:10px 0 0">${topics.length} of ${n.topics.length} topics match</p>` : ""}
        </article>`;
    }).join("");

    $("#notes-empty").hidden = shown.length > 0;
    const topicHits = shown.reduce((s, r) => s + r.topics.length, 0);
    $("#notes-count").textContent = words.length
      ? `${shown.length} notes · ${topicHits} topics match`
      : `${shown.length} notes · ${topicHits} topics`;
  }

  notesGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-note]");
    if (!btn) return;
    const n = NOTES.find((x) => x.p === btn.dataset.note);
    const ul = btn.previousElementSibling;
    ul.innerHTML += n.topics.slice(TOPIC_PREVIEW).map((t) =>
      `<li><a href="${href(n.p)}#${encodeURIComponent(t.a)}" target="_blank" rel="noopener">${inline(t.t)}</a></li>`
    ).join("");
    btn.remove();
  });

  $("#notes-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest("[data-cat]");
    if (!tab) return;
    notesState.cat = tab.dataset.cat;
    renderNotes();
  });

  let notesTimer;
  notesSearch.addEventListener("input", () => {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => {
      notesState.q = notesSearch.value.trim();
      renderNotes();
    }, 120);
  });

  renderNotes();
})();
