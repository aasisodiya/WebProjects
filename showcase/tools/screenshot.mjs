// Generates showcase/thumbs/<slug>.webp for every project in showcase/projects.js.
//
//   node showcase/tools/screenshot.mjs                 # all projects
//   node showcase/tools/screenshot.mjs --missing       # only projects without a thumbnail
//   node showcase/tools/screenshot.mjs 61Finance name  # only paths containing these strings
//
// Serves the repo on a local port, drives headless Chrome/Edge over the DevTools
// protocol and captures a 1280x800 viewport scaled down to 640x400 WebP.
// Set CHROME_PATH to override browser detection. Needs Node 22+ (global WebSocket).

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, statSync, rmSync } from "node:fs";
import { join, extname, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "showcase/thumbs");
const SERVER_PORT = 8765;
const DEBUG_PORT = 9333;
const SETTLE_MS = 2500;
const CONCURRENCY = 4;

const slug = (p) => p.replace(/\.html$/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, "showcase/projects.js"), "utf8"), sandbox);
const args = process.argv.slice(2);
const onlyMissing = args.includes("--missing");
const filters = args.filter((a) => !a.startsWith("--"));
const projects = sandbox.window.SHOWCASE_PROJECTS.filter(
  (p) =>
    (!filters.length || filters.some((f) => p.p.includes(f))) &&
    (!onlyMissing || !existsSync(join(OUT, slug(p.p) + ".webp")))
);

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".woff2": "font/woff2",
  ".woff": "font/woff", ".ttf": "font/ttf", ".ico": "image/x-icon", ".wasm": "application/wasm",
};

const server = createServer((req, res) => {
  let file = join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream" });
  res.end(readFileSync(file));
});

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  const found = candidates.find((c) => c && existsSync(c));
  if (!found) throw new Error("No Chrome/Edge found; set CHROME_PATH");
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForJson(path) {
  for (let i = 0; i < 50; i++) {
    try {
      return await (await fetch(`http://127.0.0.1:${DEBUG_PORT}${path}`)).json();
    } catch {
      await sleep(200);
    }
  }
  throw new Error("Browser did not start");
}

// Minimal CDP session over the page's own WebSocket.
function connect(wsUrl) {
  return new Promise((resolveConn, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const listeners = new Map();
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { ok, fail } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? fail(new Error(msg.error.message)) : ok(msg.result);
      } else if (msg.method) {
        (listeners.get(msg.method) || []).forEach((fn) => fn(msg.params));
      }
    };
    ws.onerror = reject;
    ws.onopen = () =>
      resolveConn({
        send: (method, params = {}) =>
          new Promise((ok, fail) => {
            pending.set(++id, { ok, fail });
            ws.send(JSON.stringify({ id, method, params }));
          }),
        on: (method, fn) => listeners.set(method, [...(listeners.get(method) || []), fn]),
        close: () => ws.close(),
      });
  });
}

async function shoot(project) {
  const target = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const cdp = await connect(target.webSocketDebuggerUrl);
  try {
    await cdp.send("Page.enable");
    cdp.on("Page.javascriptDialogOpening", () => cdp.send("Page.handleJavaScriptDialog", { accept: true }).catch(() => {}));
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    const loaded = new Promise((r) => cdp.on("Page.loadEventFired", r));
    const url = `http://127.0.0.1:${SERVER_PORT}/${encodeURI(project.p)}`;
    await cdp.send("Page.navigate", { url });
    await Promise.race([loaded, sleep(10000)]);
    await sleep(SETTLE_MS);
    const { data } = await cdp.send("Page.captureScreenshot", {
      format: "webp",
      quality: 72,
      clip: { x: 0, y: 0, width: 1280, height: 800, scale: 0.5 },
    });
    writeFileSync(join(OUT, slug(project.p) + ".webp"), Buffer.from(data, "base64"));
    console.log("✓", project.p);
  } catch (err) {
    console.log("✗", project.p, err.message);
  } finally {
    cdp.close();
    await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/close/${target.id}`).catch(() => {});
  }
}

mkdirSync(OUT, { recursive: true });
await new Promise((r) => server.listen(SERVER_PORT, "127.0.0.1", r));
const profile = mkdtempSync(join(tmpdir(), "showcase-shots-"));
const browser = spawn(findBrowser(), [
  "--headless=new",
  `--remote-debugging-port=${DEBUG_PORT}`,
  `--user-data-dir=${profile}`,
  "--mute-audio",
  "--hide-scrollbars",
  "--no-first-run",
  "--use-fake-ui-for-media-stream",
  "--use-fake-device-for-media-stream",
  "--autoplay-policy=no-user-gesture-required",
]);

try {
  await waitForJson("/json/version");
  console.log(`Capturing ${projects.length} project(s)…`);
  const queue = [...projects];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) await shoot(queue.shift());
    })
  );
} finally {
  // On Windows, kill() only stops the launcher; take down the whole process tree.
  if (process.platform === "win32") spawn("taskkill", ["/PID", String(browser.pid), "/T", "/F"]);
  else browser.kill();
  server.close();
  await sleep(1500);
  rmSync(profile, { recursive: true, force: true });
}
