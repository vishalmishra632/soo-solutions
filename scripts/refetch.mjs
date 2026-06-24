// Targeted re-fetch for specific slots that need a cleaner image; patches image-manifest.json + credits-data.json.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public", "images");
const UA = "SooSolutionsSiteBuild/1.0 (https://soo-solutions.vercel.app; build script)";
const API = "https://commons.wikimedia.org/w/api.php";

// edit this list to re-fetch specific slots with better terms
const SLOTS = [
  { id: "res-eave", folder: "installs/residential", file: "residential-camera-house-eave", w: 1600, ar: 3 / 2,
    terms: ["modern suburban house exterior", "single family house front", "residential house facade", "two storey house exterior daytime"],
    alt: "A camera mounted on the exterior of a modern home" },
];

const isFree = (ext) => {
  const s = `${ext?.License?.value ?? ""} ${ext?.LicenseShortName?.value ?? ""}`.toLowerCase();
  if (/fair use|non-free|nonfree|all rights reserved|copyright(?!ed free)/.test(s)) return false;
  return /cc0|public domain|^pd|cc[ -]?by|attribution|gfdl/.test(s);
};
const stripHtml = (v) => (v ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

async function pick(slot) {
  for (const term of slot.terms) {
    const url = `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=${Math.min(slot.w * 2, 3000)}&format=json`;
    let data;
    try { data = await (await fetch(url, { headers: { "User-Agent": UA } })).json(); } catch { continue; }
    const c = Object.values(data?.query?.pages ?? {}).map((p) => p.imageinfo?.[0]).filter(Boolean)
      .filter((ii) => /image\/(jpeg|png)/.test(ii.mime)).filter((ii) => (ii.width ?? 0) >= slot.w && isFree(ii.extmetadata))
      .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
    if (c.length) return { term, downloadUrl: c[0].thumburl ?? c[0].url, sourceUrl: c[0].descriptionurl,
      author: stripHtml(c[0].extmetadata?.Artist?.value) || "Unknown (Wikimedia Commons)",
      license: stripHtml(c[0].extmetadata?.LicenseShortName?.value) || "See source" };
  }
  return null;
}

const manifest = JSON.parse(readFileSync(join(PUB, "image-manifest.json"), "utf8"));
const credits = JSON.parse(readFileSync(join(ROOT, "scripts", "credits-data.json"), "utf8"));

for (const slot of SLOTS) {
  const p = await pick(slot);
  if (!p) { console.log(`no match for ${slot.id}`); continue; }
  const src = Buffer.from(await (await fetch(p.downloadUrl, { headers: { "User-Agent": UA } })).arrayBuffer());
  const outPath = join(PUB, slot.folder, `${slot.file}.webp`);
  const rel = `/images/${slot.folder}/${slot.file}.webp`;
  mkdirSync(dirname(outPath), { recursive: true });
  const buf = await sharp(src).resize(slot.w, Math.round(slot.w / slot.ar), { fit: "cover", position: "attention" }).webp({ quality: 82 }).toBuffer();
  writeFileSync(outPath, buf);
  const meta = await sharp(buf).metadata();
  const blurDataURL = `data:image/webp;base64,${(await sharp(buf).resize(16).webp({ quality: 40 }).toBuffer()).toString("base64")}`;
  manifest[slot.id] = { src: rel, width: meta.width, height: meta.height, alt: slot.alt, blurDataURL, placeholder: false, source: p.sourceUrl, author: p.author, license: p.license };
  const ci = credits.findIndex((c) => c.file === rel);
  const entry = { file: rel, ...manifest[slot.id] };
  if (ci >= 0) credits[ci] = entry; else credits.push(entry);
  console.log(`re-fetched ${slot.id}: ${meta.width}x${meta.height} ${p.license} (${p.term})`);
}

writeFileSync(join(PUB, "image-manifest.json"), JSON.stringify(manifest, null, 2));
writeFileSync(join(ROOT, "scripts", "credits-data.json"), JSON.stringify(credits, null, 2));
