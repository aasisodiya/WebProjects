export async function fetchDocs() {
    try {
        const response = await fetch('./data/data.json');
        const data = await response.json();
        return Array.isArray(data.docs) ? data.docs : (Array.isArray(data) ? data : []);
    } catch (err) {
        document.body.innerHTML = '<pre style="color:red;padding:20px">Failed to load data.json — start a local web server and retry.\nError: ' + String(err) + '</pre>';
        console.error(err);
        return [];
    }
}
