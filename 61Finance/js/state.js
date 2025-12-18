import {
    $search,
    $fundHouse,
    $category,
    $categorynameList
} from './dom.js';
import {
    parseNum
} from './utils.js';
import {
    renderTable
} from './ui.js';

export let state = {
    all: [],
    filtered: [],
    page: 1,
    pageSize: 10
};

export function applyFilters() {
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
        if (checkedCategoryNames.length >= 0 && !checkedCategoryNames.includes(d._categoryname)) return false;

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