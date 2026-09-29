import {
    $apply,
    $reset,
    $fundHouse,
    $category,
    $invtype,
    $categorynameList,
    $crisilrank,
    $pageSize,
    $prev,
    $next,
    $curPage,
    $search
} from './dom.js';
import {
    state,
    applyFilters
} from './state.js';
import {
    renderTable,
    resetFilters
} from './ui.js';

export function attachEvents() {
    $apply().addEventListener('click', () => {
        state.page = 1;
        applyFilters();
    });
    $reset().addEventListener('click', () => {
        resetFilters();
        state.page = 1;
        applyFilters();
    });
    // Auto-apply when user changes dropdowns or checkboxes
    $fundHouse().addEventListener('change', () => {
        state.page = 1;
        applyFilters();
    });
    $category().addEventListener('change', () => {
        state.page = 1;
        applyFilters();
    });
    $invtype().addEventListener('change', () => {
        state.page = 1;
        applyFilters();
    });
    document.getElementById('planName').addEventListener('change', () => {
        state.page = 1;
        applyFilters();
    });
    // Delegate checkbox changes from the category name list
    $categorynameList().addEventListener('change', e => {
        if (e.target && e.target.matches('input[type=checkbox]')) {
            state.page = 1;
            applyFilters();
        }
    });
    $crisilrank().addEventListener('change', () => {
        state.page = 1;
        applyFilters();
    });
    $pageSize().addEventListener('change', e => {
        state.pageSize = parseInt(e.target.value) || 10;
        state.page = 1;
        renderTable();
    });
    $prev().addEventListener('click', () => {
        if (state.page > 1) {
            state.page--;
            renderTable();
            $curPage().value = state.page;
        }
    });
    $next().addEventListener('click', () => {
        const tp = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
        if (state.page < tp) {
            state.page++;
            renderTable();
            $curPage().value = state.page;
        }
    });
    $curPage().addEventListener('change', e => {
        const v = parseInt(e.target.value) || 1;
        const tp = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
        state.page = Math.min(Math.max(1, v), tp);
        renderTable();
    });
    // quick: apply on Enter in search
    $search().addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            state.page = 1;
            applyFilters();
        }
    });

    // Header sorting
    const ths = document.querySelectorAll('#results thead th.sortable');
    ths.forEach(h => {
        h.addEventListener('click', () => {
            const key = h.getAttribute('data-key');
            if (state.sortKey === key) state.sortDir = -state.sortDir;
            else {
                state.sortKey = key;
                state.sortDir = 1;
            }
            // update indicators
            ths.forEach(x => {
                const ind = x.querySelector('.sort-indicator');
                if (ind) ind.textContent = '';
            });
            const ind = h.querySelector('.sort-indicator');
            if (ind) ind.textContent = state.sortDir === 1 ? '▲' : '▼';
            state.page = 1;
            renderTable();
        });
    });
    const crisilTh = document.querySelector('th[data-key="crisil"]');
    if (crisilTh) {
        crisilTh.style.minWidth = '85px';
    }
}