export function text(v) {
    return v == null || v === '' ? null : String(v).trim();
}

export function parseNum(v) {
    if (v == null) return null;
    const n = parseFloat(String(v).replace(/[^0-9eE\-\.]/g, ''));
    return Number.isFinite(n) ? n : null;
}

export function formatReturn(v) {
    if (v == null) return 'N/A';
    // Data values are percentages (e.g. 1.6246 means 1.6246%), so format with 2 decimals.
    return (Math.round(v * 100) / 100).toFixed(2) + '%';
}
