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
import {
    fetchDocs
} from './api.js';
import {
    attachEvents
} from './events.js';
import {
    state,
    applyFilters
} from './state.js';
import {
    populateFilters
} from './ui.js';
import {
    text,
    parseNum
} from './utils.js';

async function init() {
    const docs = await fetchDocs();
    // normalize docs
    state.all = docs.map(d => Object.assign({}, d));

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

init();