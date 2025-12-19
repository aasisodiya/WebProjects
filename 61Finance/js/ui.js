import {
    $fundHouse,
    $category,
    $invtype,
    $categorynameList,
    $resultsBody,
    $resultCount,
    $pageSize,
    $curPage,
    $totalPages,
    $noResults,
    $search
} from './dom.js';
import {
    formatReturn
} from './utils.js';
import {
    state
} from './state.js';

export function populateFilters() {
    // fund houses
    const houses = Array.from(new Set(state.all.map(d => d._fundHouse).filter(Boolean))).sort();
    const fundHouseEl = $fundHouse();
    houses.forEach(h => {
        const o = document.createElement('option');
        o.value = h;
        o.textContent = h;
        fundHouseEl.appendChild(o);
    });

    // categories
    const cats = Array.from(new Set(state.all.map(d => d._category).filter(Boolean))).sort();
    const catEl = $category();
    cats.forEach(c => {
        const o = document.createElement('option');
        o.value = c;
        o.textContent = c;
        catEl.appendChild(o);
    });

    // plan names
    const plans = Array.from(new Set(state.all.map(d => d._plan).filter(Boolean))).sort();
    const planEl = document.getElementById('planName');
    plans.forEach(p => {
        const o = document.createElement('option');
        o.value = p;
        o.textContent = p;
        planEl.appendChild(o);
    });

    // invtype
    const invtypes = Array.from(new Set(state.all.map(d => d._invtype).filter(Boolean))).sort();
    const invtypeEl = $invtype();
    invtypes.forEach(p => {
        const o = document.createElement('option');
        o.value = p;
        o.textContent = p;
        invtypeEl.appendChild(o);
    });
    console.log('Populated invtypes:', invtypes);

    // categoryname checkboxes
    const categorynames = Array.from(new Set(state.all.map(d => d._categoryname).filter(Boolean))).sort();
    const categorynameWrap = $categorynameList();
    categorynameWrap.innerHTML = '';
    categorynames.forEach(r => {
        const id = 'categoryname_' + r.replace(/[^a-z0-9]/ig, '_');
        const wrapper = document.createElement('label');
        wrapper.style.display = 'inline-flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '6px';
        wrapper.style.fontSize = '13px';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = r;
        cb.id = id;
        cb.checked = true;
        const span = document.createElement('span');
        span.textContent = r;
        span.style.fontSize = '13px';
        wrapper.appendChild(cb);
        wrapper.appendChild(span);
        categorynameWrap.appendChild(wrapper);
    });
}

export function renderTable() {
    const tbody = $resultsBody();
    tbody.innerHTML = '';
    const total = state.filtered.length;

    // Apply sorting if set
    let renderList = state.filtered.slice();
    if (state.sortKey) {
        const getSortValue = (item, key) => {
            switch (key) {
                case 'scheme':
                    return (item._scheme || '').toLowerCase();
                case 'fundHouse':
                    return (item._fundHouse || '').toLowerCase();
                case 'category':
                    return (item._category || '').toLowerCase();
                case 'plan':
                    return (item._plan || '').toLowerCase();
                case 'r1':
                    return (item._r1 == null) ? Number.NEGATIVE_INFINITY : item._r1;
                case 'r3':
                    return (item._r3 == null) ? Number.NEGATIVE_INFINITY : item._r3;
                case 'r3m':
                    return (item._3m == null) ? Number.NEGATIVE_INFINITY : item._3m;
                case 'r6m':
                    return (item._6m == null) ? Number.NEGATIVE_INFINITY : item._6m;
                case 'crisil':
                    {
                        const n = parseInt(item._crisil, 10);
                        return Number.isFinite(n) ? n : (item._crisil || '').toLowerCase();
                    }
                default:
                    return '';
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
        $noResults().style.display = 'flex';
        return;
    } else {
        $noResults().style.display = 'none';
    }

    const start = (state.page - 1) * pageSize;
    const pageItems = renderList.slice(start, start + pageSize);

    for (const d of pageItems) {
        const tr = document.createElement('tr');
        const tdPlain = (v) => {
            const e = document.createElement('td');
            e.textContent = v == null || v === '' ? '—' : v;
            return e
        };

        // Scheme cell: include small trend icon and invtype badge
        const schemeTd = document.createElement('td');
        const schemeWrap = document.createElement('div');
        schemeWrap.className = 'scheme-row';
        const firstLine = document.createElement('div');
        const nameSpan = document.createElement('span');
        nameSpan.className = 'scheme-name';
        nameSpan.textContent = d._scheme || '—';
        firstLine.appendChild(nameSpan);

        if (d._invtype) {
            const b = document.createElement('span');
            b.className = 'badge';
            b.textContent = d._invtype;
            firstLine.appendChild(b);
        }



        schemeWrap.appendChild(firstLine);
        const secondLine = document.createElement('div');
        secondLine.className = 'scheme-sub';
        secondLine.textContent = d.fundName || d._fundHouse || '';
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
                const b = document.createElement('div');
                b.className = 'bench';
                // If we have a numeric value, show the icon before the benchmark text
                if (val != null) {
                    if (val > bench) {
                        const ic = document.createElement('span');
                        ic.className = 'action-icon';
                        ic.title = `Above benchmark (${label})`;
                        ic.innerHTML = `📈`;
                        b.appendChild(ic);
                    } else if (val < bench) {
                        const ic = document.createElement('span');
                        ic.className = 'action-icon';
                        ic.title = `Below benchmark (${label})`;
                        ic.innerHTML = `📉`;
                        b.appendChild(ic);
                    }
                    const textSpan = document.createElement('span');
                    textSpan.textContent = 'Benchmark: ' + formatReturn(bench);
                    b.appendChild(textSpan);
                } else {
                    // No value to compare — just show benchmark text
                    b.textContent = 'Benchmark: ' + formatReturn(bench);
                }
                td.appendChild(b);
            }
            return td;
        };

        tr.appendChild(makeRetTd(d._3m, d._bench3m, '3M'));
        tr.appendChild(makeRetTd(d._6m, d._bench6, '6M'));
        tr.appendChild(makeRetTd(d._r1, d._bench1, '1Y'));
        tr.appendChild(makeRetTd(d._r3, d._bench3, '3Y'));
        // CRISIL ranking (render as icons/badges)
        const crisilTd = document.createElement('td');
        (function renderCrisil(val) {
            if (!val && val !== 0) {
                crisilTd.textContent = '—';
                return;
            }
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
                const span = document.createElement('span');
                span.className = 'rank-badge';
                span.title = raw;
                span.textContent = raw;
                crisilTd.appendChild(span);
            }
        })(d._crisil);
        tr.appendChild(crisilTd);
        tbody.appendChild(tr);
    }
}

export function resetFilters() {
    $search().value = '';
    $fundHouse().value = '__any';
    $category().value = '__any';
    $invtype().value = '__any';
    document.getElementById('planName').value = '__any';
    $categorynameList().querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = true);
    ['ret1Min', 'ret1Max', 'ret3Min', 'ret3Max'].forEach(id => document.getElementById(id).value = '');
}
