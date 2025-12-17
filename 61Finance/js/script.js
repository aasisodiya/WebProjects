// Template Code Start
"use strict";
// Just for Fun!
console.log(
    "%c Stop Right There! ",
    "background: #222; color: orange;font-size:20px"
);
console.log(
    "%c You Shall Not Pass! ",
    "background: #222; color: red; font-size:40px"
);
// Template Code End

(function () {
    const root = document.documentElement;

    // Build page HTML
    document.title = 'Finance Data Explorer';

    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Inter, system-ui, Arial, sans-serif';

    const app = document.createElement('div');
    app.id = 'app';
    app.innerHTML = `
		<style>
			:root{
				--bg:#f6f8fb; --card:#ffffff; --accent:#2563eb; --muted:#6b7280; --ok:#10b981;
			}
			*{box-sizing:border-box}
			body{background:var(--bg); color:#111827}
			.container{width:95vw;min-width:1200px;margin:28px auto;padding:20px}
			.header{display:flex;align-items:center;gap:16px;margin-bottom:18px}
			.logo{width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
			.title{font-size:20px;font-weight:700}
			.subtitle{color:var(--muted);font-size:13px}
			.grid{display:grid;grid-template-columns:320px 1fr;gap:16px}
			.panel{background:var(--card);padding:14px;border-radius:10px;box-shadow:0 1px 2px rgba(16,24,40,0.04)}
			.filters h3{margin:0 0 8px 0}
			.field{margin-bottom:10px}
			.field label{display:block;font-weight:600;margin-bottom:6px;font-size:13px}
			.input, .select, .range{width:100%;padding:8px;border-radius:8px;border:1px solid #e6e7ea}
			.row{display:flex;gap:8px}
			.tag{display:inline-block;padding:6px 10px;border-radius:999px;background:#f3f4f6;color:#111827;font-weight:600;font-size:12px}
			.badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#f3f4f6;color:#111827;font-weight:600;font-size:12px;margin-left:6px}
			.sortable{cursor:pointer;user-select:none}
			.sort-indicator{font-size:11px;color:var(--muted);margin-left:6px}
			.scheme-row{display:flex;flex-direction:column}
			.scheme-name{font-weight:700}
			.scheme-sub{font-size:12px;color:var(--muted)}
			.ret-value{font-weight:700}
			.ret-positive{color:var(--ok)}
			.ret-negative{color:#ef4444}
			.bench{font-size:11px;color:#9ca3af;margin-top:4px}
			.small-icon{width:14px;height:14px;display:inline-block;margin-right:6px;vertical-align:text-bottom}
			.action-icon{width:16px;height:16px;display:inline-block;margin-left:8px;vertical-align:text-bottom}
			.rank-icon{width:18px;height:18px;display:inline-block;vertical-align:middle;margin-left:6px}
			.rank-badge{display:inline-block;padding:4px 8px;border-radius:8px;background:#f3f4f6;color:#111827;font-weight:700;font-size:12px}
			table{width:100%;border-collapse:collapse}
			th, td{padding:10px 12px;border-bottom:1px solid #eef2f7;text-align:left;font-size:13px}
			th{Position:sticky;top:0;background:linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.8));backdrop-filter: blur(2px);z-index:1}
			tr:hover td{background:#fbfdff}
			.muted{color:var(--muted)}
			.controls{display:flex;gap:8px;align-items:center}
			.btn{background:var(--accent);color:white;padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
			.btn.secondary{background:#e6eefc;color:var(--accent)}
			.pager{display:flex;gap:6px;align-items:center}
			.page-input{width:56px;padding:6px;border-radius:6px;border:1px solid #e6e7ea}
			.small{font-size:12px;color:var(--muted)}
			.no-results{padding:28px;text-align:center;color:var(--muted)}
			@media (max-width:880px){.grid{grid-template-columns:1fr}.filters{order:2}}
		</style>

		<div class="container">
			<div class="header">
				<div class="logo"><img src="img/orange-outline-a.svg" alt="Finance Data Explorer Logo" /></div>
				<div>
					<div class="title">Finance Data Explorer</div>
					<div class="subtitle">Interactive filters, table view, and pagination — powered by static data</div>
				</div>
			</div>

			<div class="grid">
				<div class="panel filters">
					<h3>Filters</h3>
					<div class="field">
						<label>Search</label>
						<input id="search" class="input" placeholder="Search scheme name or fund house" />
					</div>

					<div class="field">
						<label>Fund House</label>
						<select id="fundHouse" class="select"><option value="__any">Any</option></select>
					</div>

					<div class="field">
						<label>Category</label>
						<select id="category" class="select"><option value="__any">Any</option></select>
					</div>

					<div class="field">
						<label>Plan Name</label>
						<select id="planName" class="select"><option value="__any">Any</option></select>
					</div>

					<div class="field">
						<label>Category (check)</label>
						<div id="categorynameList" style="display:flex;gap:8px;flex-wrap:wrap"></div>
					</div>

					<div class="field">
						<label>Returns filters (use min / max)</label>
						<div style="display:flex;gap:8px">
							<input id="ret1Min" class="input" placeholder="1Y min" />
							<input id="ret1Max" class="input" placeholder="1Y max" />
						</div>
						<div style="display:flex;gap:8px;margin-top:8px">
							<input id="ret3Min" class="input" placeholder="3Y min" />
							<input id="ret3Max" class="input" placeholder="3Y max" />
						</div>

					</div>

					<div class="field" style="margin-top:12px">
						<div class="controls">
							<button id="apply" class="btn">Apply</button>
							<button id="reset" class="btn secondary">Reset</button>
							<div style="flex:1"></div>
							<div class="small">Results: <span id="resultCount">0</span></div>
						</div>
					</div>
				</div>

				<div class="panel">
					<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
						<div class="controls">
							<div class="small">Page size</div>
							<select id="pageSize" class="select" style="width:90px;margin-left:6px">
								<option>10</option>
								<option>25</option>
								<option>50</option>
								<option>100</option>
							</select>
						</div>
						<div class="controls pager">
							<button id="prev" class="btn secondary">Prev</button>
							<div class="small">Page <input id="curPage" class="page-input" value="1"/> of <span id="totalPages">1</span></div>
							<button id="next" class="btn">Next</button>
						</div>
					</div>

					<div id="tableWrap" style="max-height:100vh;overflow:auto;border-radius:8px">
						<table id="results">
							<thead>
								<tr>
								<th data-key="scheme" class="sortable">Scheme <span class="sort-indicator"></span></th>
								<th data-key="fundHouse" class="sortable">Fund House <span class="sort-indicator"></span></th>
								<th data-key="category" class="sortable">Category <span class="sort-indicator"></span></th>
								<th data-key="plan" class="sortable">Plan Name <span class="sort-indicator"></span></th>
								<th data-key="r1" class="sortable">1Y <span class="sort-indicator"></span></th>
								<th data-key="r3" class="sortable">3Y <span class="sort-indicator"></span></th>
								<th data-key="r3m" class="sortable">3M <span class="sort-indicator"></span></th>
								<th data-key="r6m" class="sortable">6M <span class="sort-indicator"></span></th>
								<th data-key="crisil" class="sortable">CRISIL <span class="sort-indicator"></span></th>
							</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>

					<div id="noResults" class="no-results" style="display:none">No matching records</div>
				</div>
			</div>
		</div>
	`;

    document.body.appendChild(app);

    // Utilities
    function text(v) { return v == null || v === '' ? null : String(v).trim() }
    function parseNum(v) {
        if (v == null) return null;
        const n = parseFloat(String(v).replace(/[^0-9eE\-\.]/g, ''));
        return Number.isFinite(n) ? n : null;
    }

    // Use only the explicit JSON keys provided by the user.
    // We will read numeric returns directly from the listed keys.


    // Read dataset
    let docs = [];
    fetch('./data/data.json').then(r => r.json()).then(js => {
        docs = Array.isArray(js.docs) ? js.docs : (Array.isArray(js) ? js : []);
        init(docs);
    }).catch(err => {
        document.body.innerHTML = '<pre style="color:red;padding:20px">Failed to load data.json — start a local web server and retry.\nError: ' + String(err) + '</pre>';
        console.error(err);
    });

    // State
    let state = {
        all: [],
        filtered: [],
        page: 1,
        pageSize: 10
    };

    // DOM refs
    const $search = () => document.getElementById('search');
    const $fundHouse = () => document.getElementById('fundHouse');
    const $category = () => document.getElementById('category');
    const $categorynameList = () => document.getElementById('categorynameList');
    const $apply = () => document.getElementById('apply');
    const $reset = () => document.getElementById('reset');
    const $resultsBody = () => document.querySelector('#results tbody');
    const $resultCount = () => document.getElementById('resultCount');
    const $pageSize = () => document.getElementById('pageSize');
    const $prev = () => document.getElementById('prev');
    const $next = () => document.getElementById('next');
    const $curPage = () => document.getElementById('curPage');
    const $totalPages = () => document.getElementById('totalPages');
    const $noResults = () => document.getElementById('noResults');

    function init(inputDocs) {
        // normalize docs
        state.all = inputDocs.map(d => Object.assign({}, d));

        // Use only the exact keys provided in the schema list.
        // Mapping:
        //  - Scheme name: `schemeName`
        //  - Fund house: `fundName` (or `fundcode` if present as fallback key in data but we will prefer `fundName`)
        //  - Category: `categoryName`
        //  - CPR category / categoryname-like label: `cprCategoryName`
        //  - CPR date: `cprDate`
        //  - Returns: `scheme1YearReturn`, `scheme3YearReturn` (no 5Y key provided in the allowed list)

        state.all.forEach(doc => {
            doc._scheme = text(doc['schemeName']) || 'Unknown';
            doc._fundHouse = text(doc['fundName']) || text(doc['fundcode']) || 'Unknown';
            doc._category = text(doc['categoryName']) || text(doc['cprCategoryName']) || 'Unknown';
            doc._categoryname = text(doc['cprCategoryName']) || '';
            doc._plan = text(doc['planName']) || '';
            doc._invtype = text(doc['invtype']) || text(doc['invTypeId']) || '';
            // doc._cprDate = text(doc['cprDate']) || '';
            // Use only the explicit return keys requested
            doc._r1 = parseNum(doc['scheme1YearReturn']);
            doc._r3 = parseNum(doc['scheme3YearReturn']);
            // 5-year return key is not in the provided list, so we leave it null (will display N/A)
            doc._r5 = null;
            // keep other useful explicit fields handy
            doc._3m = parseNum(doc['scheme3MonthReturn']);
            doc._6m = parseNum(doc['scheme6MonthReturn']);
            doc._crisil = text(doc['crisilCprRanking']) || '';
            doc._bench1 = parseNum(doc['benchmark1YearReturn']);
            doc._bench3 = parseNum(doc['benchmark3YearReturn']);
            doc._bench6 = parseNum(doc['benchmark6MonthReturn']);
            doc._bench3m = parseNum(doc['benchmark3MonthReturn']);
        });

        // Build a category -> benchmark map so missing benchmarks can be filled
        // Use the assumption: benchmark values are the same for all entries with the same `cprCategoryName`/category
        const categoryBench = {};
        state.all.forEach(doc => {
            const cat = doc._category || '';
            if (!categoryBench[cat]) categoryBench[cat] = {};
            if (doc._bench1 != null) categoryBench[cat].b1 = doc._bench1;
            if (doc._bench3 != null) categoryBench[cat].b3 = doc._bench3;
            if (doc._bench3m != null) categoryBench[cat].b3m = doc._bench3m;
            if (doc._bench6 != null) categoryBench[cat].b6 = doc._bench6;
        });

        // Fill missing benchmark values on each doc from the category map
        state.all.forEach(doc => {
            const cat = doc._category || '';
            const m = categoryBench[cat] || {};
            if (doc._bench1 == null && m.b1 != null) doc._bench1 = m.b1;
            if (doc._bench3 == null && m.b3 != null) doc._bench3 = m.b3;
            if (doc._bench3m == null && m.b3m != null) doc._bench3m = m.b3m;
            if (doc._bench6 == null && m.b6 != null) doc._bench6 = m.b6;
        });

        populateFilters();
        attachEvents();
        applyFilters();
    }

    function populateFilters() {
        // fund houses
        const houses = Array.from(new Set(state.all.map(d => d._fundHouse).filter(Boolean))).sort();
        const fundHouseEl = $fundHouse();
        houses.forEach(h => {
            const o = document.createElement('option'); o.value = h; o.textContent = h; fundHouseEl.appendChild(o);
        });

        // categories
        const cats = Array.from(new Set(state.all.map(d => d._category).filter(Boolean))).sort();
        const catEl = $category();
        cats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; catEl.appendChild(o); });

        // plan names
        const plans = Array.from(new Set(state.all.map(d => d._plan).filter(Boolean))).sort();
        const planEl = document.getElementById('planName');
        plans.forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; planEl.appendChild(o); });

        // categoryname checkboxes
        const categorynames = Array.from(new Set(state.all.map(d => d._categoryname).filter(Boolean))).sort();
        const categorynameWrap = $categorynameList();
        categorynameWrap.innerHTML = '';
        categorynames.forEach(r => {
            const id = 'categoryname_' + r.replace(/[^a-z0-9]/ig, '_');
            const wrapper = document.createElement('label');
            wrapper.style.display = 'inline-flex'; wrapper.style.alignItems = 'center'; wrapper.style.gap = '6px';
            wrapper.style.fontSize = '13px';
            const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = r; cb.id = id;
            const span = document.createElement('span'); span.textContent = r; span.style.fontSize = '13px';
            wrapper.appendChild(cb); wrapper.appendChild(span); categorynameWrap.appendChild(wrapper);
        });
    }

    function attachEvents() {
        $apply().addEventListener('click', () => { state.page = 1; applyFilters(); });
        $reset().addEventListener('click', () => { resetFilters(); state.page = 1; applyFilters(); });
        $pageSize().addEventListener('change', e => { state.pageSize = parseInt(e.target.value) || 10; state.page = 1; renderTable(); });
        $prev().addEventListener('click', () => { if (state.page > 1) { state.page--; renderTable(); $curPage().value = state.page; } });
        $next().addEventListener('click', () => { const tp = Math.max(1, Math.ceil(state.filtered.length / state.pageSize)); if (state.page < tp) { state.page++; renderTable(); $curPage().value = state.page; } });
        $curPage().addEventListener('change', e => { const v = parseInt(e.target.value) || 1; const tp = Math.max(1, Math.ceil(state.filtered.length / state.pageSize)); state.page = Math.min(Math.max(1, v), tp); renderTable(); });
        // quick: apply on Enter in search
        $search().addEventListener('keydown', e => { if (e.key === 'Enter') { state.page = 1; applyFilters(); } });

        // Header sorting
        const ths = document.querySelectorAll('#results thead th.sortable');
        ths.forEach(h => {
            h.addEventListener('click', () => {
                const key = h.getAttribute('data-key');
                if (state.sortKey === key) state.sortDir = -state.sortDir; else { state.sortKey = key; state.sortDir = 1; }
                // update indicators
                ths.forEach(x => { const ind = x.querySelector('.sort-indicator'); if (ind) ind.textContent = ''; });
                const ind = h.querySelector('.sort-indicator'); if (ind) ind.textContent = state.sortDir === 1 ? '▲' : '▼';
                state.page = 1; renderTable();
            });
        });
    }

    function resetFilters() {
        $search().value = '';
        $fundHouse().value = '__any';
        $category().value = '__any';
        document.getElementById('planName').value = '__any';
        $categorynameList().querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
        ['ret1Min', 'ret1Max', 'ret3Min', 'ret3Max'].forEach(id => document.getElementById(id).value = '');
    }

    function applyFilters() {
        const q = ($search().value || '').toLowerCase().trim();
        const house = $fundHouse().value;
        const cat = $category().value;
        const plan = (document.getElementById('planName').value || '__any');
        const checkedCategoryNames = Array.from($categorynameList().querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);

        const r1min = parseNum(document.getElementById('ret1Min').value);
        const r1max = parseNum(document.getElementById('ret1Max').value);
        const r3min = parseNum(document.getElementById('ret3Min').value);
        const r3max = parseNum(document.getElementById('ret3Max').value);


        const filtered = state.all.filter(d => {
            if (q) {
                const hay = (d._scheme + ' ' + d._fundHouse + ' ' + d._category + ' ' + (d._plan || '') + ' ' + (d._categoryname || '')).toLowerCase();
                if (!hay.includes(q)) return false;
            }
            if (house && house !== '__any' && d._fundHouse !== house) return false;
            if (cat && cat !== '__any' && d._category !== cat) return false;
            if (plan && plan !== '__any' && d._plan !== plan) return false;
            if (checkedCategoryNames.length && !checkedCategoryNames.includes(d._categoryname)) return false;

            if (r1min != null && (d._r1 == null || d._r1 < r1min)) return false;
            if (r1max != null && (d._r1 == null || d._r1 > r1max)) return false;
            if (r3min != null && (d._r3 == null || d._r3 < r3min)) return false;
            if (r3max != null && (d._r3 == null || d._r3 > r3max)) return false;


            return true;
        });

        state.filtered = filtered;
        state.page = 1;
        renderTable();
    }

    function renderTable() {
        const tbody = $resultsBody();
        tbody.innerHTML = '';
        const total = state.filtered.length;

        // Apply sorting if set
        let renderList = state.filtered.slice();
        if (state.sortKey) {
            const getSortValue = (item, key) => {
                switch (key) {
                    case 'scheme': return (item._scheme || '').toLowerCase();
                    case 'fundHouse': return (item._fundHouse || '').toLowerCase();
                    case 'category': return (item._category || '').toLowerCase();
                    case 'plan': return (item._plan || '').toLowerCase();
                    case 'r1': return (item._r1 == null) ? Number.NEGATIVE_INFINITY : item._r1;
                    case 'r3': return (item._r3 == null) ? Number.NEGATIVE_INFINITY : item._r3;
                    case 'r3m': return (item._3m == null) ? Number.NEGATIVE_INFINITY : item._3m;
                    case 'r6m': return (item._6m == null) ? Number.NEGATIVE_INFINITY : item._6m;
                    case 'crisil': {
                        const n = parseInt(item._crisil, 10);
                        return Number.isFinite(n) ? n : (item._crisil || '').toLowerCase();
                    }
                    // case 'cprDate': {
                    // 	const t = Date.parse(item._cprDate);
                    // 	return isNaN(t)? 0 : t;
                    // }
                    default: return '';
                }
            };

            renderList.sort((a, b) => {
                const va = getSortValue(a, state.sortKey);
                const vb = getSortValue(b, state.sortKey);
                if (typeof va === 'string' && typeof vb === 'string') return va.localeCompare(vb) * state.sortDir;
                if (va < vb) return -1 * state.sortDir;
                if (va > vb) return 1 * state.sortDir;
                return 0;
            });
        }
        $resultCount().textContent = total;
        const pageSize = state.pageSize = parseInt($pageSize().value) || state.pageSize;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        $totalPages().textContent = totalPages;
        if (state.page > totalPages) state.page = totalPages;
        $curPage().value = state.page;

        if (!total) {
            $noResults().style.display = 'block';
            return;
        } else { $noResults().style.display = 'none'; }

        const start = (state.page - 1) * pageSize;
        const pageItems = renderList.slice(start, start + pageSize);

        for (const d of pageItems) {
            const tr = document.createElement('tr');
            const tdPlain = (v) => { const e = document.createElement('td'); e.textContent = v == null || v === '' ? '—' : v; return e };

            // Scheme cell: include small trend icon and invtype badge
            const schemeTd = document.createElement('td');
            const schemeWrap = document.createElement('div'); schemeWrap.className = 'scheme-row';
            const firstLine = document.createElement('div');

            // // small trend dot (3M)
            // const iconColor = (d._3m==null)?'#9ca3af': (d._3m>=0? '#10b981' : '#ef4444');
            // const dotSpan = document.createElement('span');
            // dotSpan.innerHTML = `<svg class="small-icon" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="4" fill="${iconColor}"/></svg>`;
            // firstLine.appendChild(dotSpan);

            const nameSpan = document.createElement('span'); nameSpan.className = 'scheme-name'; nameSpan.textContent = d._scheme || '—';
            firstLine.appendChild(nameSpan);

            if (d._invtype) { const b = document.createElement('span'); b.className = 'badge'; b.textContent = d._invtype; firstLine.appendChild(b); }



            schemeWrap.appendChild(firstLine);
            const secondLine = document.createElement('div'); secondLine.className = 'scheme-sub'; secondLine.textContent = d.fundName || d._fundHouse || '';
            schemeWrap.appendChild(secondLine);
            schemeTd.appendChild(schemeWrap);
            tr.appendChild(schemeTd);

            tr.appendChild(tdPlain(d._fundHouse));
            tr.appendChild(tdPlain(d._category));
            tr.appendChild(tdPlain(d._plan || '—'));

            // returns with benchmark below
            const makeRetTd = (val, bench, label) => {
                const td = document.createElement('td');
                const valDiv = document.createElement('div');
                valDiv.className = 'ret-value ' + ((val == null) ? '' : (val >= 0 ? 'ret-positive' : 'ret-negative'));
                valDiv.textContent = (val == null) ? 'N/A' : formatReturn(val);
                td.appendChild(valDiv);
                if (bench != null) {
                    const b = document.createElement('div'); b.className = 'bench';
                    // benchmark text
                    b.textContent = 'Benchmark: ' + formatReturn(bench);
                    // add icon next to benchmark if both val and bench numeric
                    if (val != null) {
                        if (val > bench) {
                            const ic = document.createElement('span'); ic.className = 'action-icon'; ic.title = `Above benchmark (${label})`;
                            ic.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L23.2 9.75l-5.6 5.46L18.336 24 12 19.897 5.664 24l.736-8.79L.8 9.75l7.532-1.732L12 .587z"/></svg>`;
                            b.appendChild(ic);
                        } else if (val < bench) {
                            const ic = document.createElement('span'); ic.className = 'action-icon'; ic.title = `Below benchmark (${label})`;
                            ic.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#ef4444" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18v2H3V6zm2 3h14l-1.2 11.2c-.1.9-.9 1.8-1.9 1.8H8.1c-1 0-1.8-.9-1.9-1.8L5 9zm5 2v7h2v-7H10zm4 0v7h2v-7h-2zM9 4V2h6v2h5v2H4V4h5z"/></svg>`;
                            b.appendChild(ic);
                        }
                    }
                    td.appendChild(b);
                }
                return td;
            };

            tr.appendChild(makeRetTd(d._r1, d._bench1, '1Y'));
            tr.appendChild(makeRetTd(d._r3, d._bench3, '3Y'));
            tr.appendChild(makeRetTd(d._3m, d._bench3m, '3M'));
            tr.appendChild(makeRetTd(d._6m, d._bench6, '6M'));
            // CRISIL ranking (render as icons/badges)
            const crisilTd = document.createElement('td');
            (function renderCrisil(val) {
                if (!val && val !== 0) { crisilTd.textContent = '—'; return; }
                const raw = String(val).trim();
                // try numeric rank
                const n = parseInt(raw.replace(/[^0-9\-]/g, ''), 10);
                if (Number.isFinite(n)) {
                    if (n === 1) {
                        crisilTd.innerHTML = `<span title="CRISIL rank: 1"><svg class="rank-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#f59e0b" d="M12 2l2.39 4.85L19 8.27l-3.5 3.41.83 4.82L12 14.9 7.67 13.5l.83-4.82L5 8.27l4.61-.42L12 2z"/></svg></span>`;
                    } else if (n === 2) {
                        crisilTd.innerHTML = `<span title="CRISIL rank: 2"><svg class="rank-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#9ca3af" d="M12 2l2.39 4.85L19 8.27l-3.5 3.41.83 4.82L12 14.9 7.67 13.5l.83-4.82L5 8.27l4.61-.42L12 2z"/></svg></span>`;
                    } else if (n === 3) {
                        crisilTd.innerHTML = `<span title="CRISIL rank: 3"><svg class="rank-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#b7791f" d="M12 2l2.39 4.85L19 8.27l-3.5 3.41.83 4.82L12 14.9 7.67 13.5l.83-4.82L5 8.27l4.61-.42L12 2z"/></svg></span>`;
                    } else {
                        crisilTd.innerHTML = `<span title="CRISIL rank: 3"><svg class="rank-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#000000ff" d="M12 2l2.39 4.85L19 8.27l-3.5 3.41.83 4.82L12 14.9 7.67 13.5l.83-4.82L5 8.27l4.61-.42L12 2z"/></svg></span>`;
                    }
                } else {
                    // non-numeric — show text (or short badge)
                    const span = document.createElement('span'); span.className = 'rank-badge'; span.title = raw; span.textContent = raw; crisilTd.appendChild(span);
                }
            })(d._crisil);
            tr.appendChild(crisilTd);
            // tr.appendChild(tdPlain(d._cprDate || '—'));
            tbody.appendChild(tr);
        }
    }

    function formatReturn(v) {
        if (v == null) return 'N/A';
        // Data values are percentages (e.g. 1.6246 means 1.6246%), so format with 2 decimals.
        return (Math.round(v * 100) / 100).toFixed(2) + '%';
    }

})();
