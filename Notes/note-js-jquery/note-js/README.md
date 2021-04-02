# Sorting

## Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
```

### Example Code For Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
let test = {
    "ok":"ok",
    "ak":"ak",
    "zk":"zk",
    "bk":"bk",
    "0":"0",
    "10":"10",
    "2":"2"
}
let sorted = sortObjectByKeys(test);
console.log(sorted);
// Output : {0: "0", 2: "2", 10: "10", ak: "ak", bk: "bk", ok: "ok", zk: "zk"}
```

---

## Swap Key-Value in JSON

```javascript
let swappedKeyValue = Object.assign({}, ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key })))
```

### Example Code For Swapping Key-Value in JSON

```javascript
let keyValue = {
    "key1":"value1",
    "key2":"value2"
}
let swappedKeyValue = Object.assign({}, ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key })))
console.log(swappedKeyValue);
// Output: {value1: "key1", value2: "key2"}
```

---

## Copy Content To Clipboard

```javascript
// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<input>");
    $("body").append(input);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}
```

---
