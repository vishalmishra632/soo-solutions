// Additive one-shot fetch for content images added after the initial build: a Sault Ste. Marie
// waterfront photo for the About page, plus extra packaging variety (paper bags, shipping boxes) for the
// Supplies page. Each is downloaded locally, re-encoded to WebP (q82) with a blur placeholder, and MERGED
// into image-manifest.json + scripts/credits-data.json without disturbing the existing images. Run
// `node scripts/gen-image-content.mjs` afterwards to emit src/content/site-images.ts + CREDITS.md.
import sharp from "sharp";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public", "images");
const UA = "Mozilla/5.0 (compatible; SooSolutionsSiteBuild/1.0; +https://soosolutions.ca)";
mkdirSync(join(PUB, "supplies"), { recursive: true });
mkdirSync(join(PUB, "about"), { recursive: true });

const SLOTS = [
  {
    id: "about-sault", folder: "about", file: "sault-ste-marie-waterfront", w: 1600, h: 900,
    alt: "The Sault Ste. Marie waterfront on the St. Marys River in Northern Ontario",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Sault_Ste._Marie_Waterfront_%2853207216109%29.jpg",
    creator: "WabbitWanderer", license: "by-sa", license_version: "2.0", source: "wikimedia",
    landing: "https://commons.wikimedia.org/w/index.php?curid=154220629",
  },
  {
    id: "sup-paper-bags", folder: "supplies", file: "paper-bags", w: 1400, h: 1050,
    alt: "A stack of brown kraft paper bags",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Stack_of_brown_paper_bags_beneath_a_counter.jpg",
    creator: "Tessa Bury", license: "by", license_version: "4.0", source: "wikimedia",
    landing: "https://commons.wikimedia.org/w/index.php?curid=180612727",
  },
  {
    id: "sup-shipping-boxes", folder: "supplies", file: "shipping-boxes", w: 1400, h: 1050,
    alt: "Stacked corrugated cardboard shipping boxes",
    url: "https://live.staticflickr.com/7848/47303024801_e7463d51c5_b.jpg",
    creator: "hireahelper", license: "by", license_version: "2.0", source: "flickr",
    landing: "https://www.flickr.com/photos/158517012@N07/47303024801",
  },
];

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "image/*" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function run() {
  const manifest = JSON.parse(readFileSync(join(PUB, "image-manifest.json"), "utf8"));
  let credits = JSON.parse(readFileSync(join(ROOT, "scripts", "credits-data.json"), "utf8"));
  const rels = new Set(SLOTS.map((slot) => `/images/${slot.folder}/${slot.file}.webp`));
  credits = credits.filter((credit) => !rels.has(credit.file));

  for (const slot of SLOTS) {
    const rel = `/images/${slot.folder}/${slot.file}.webp`;
    const webp = await sharp(await download(slot.url))
      .resize(slot.w, slot.h, { fit: "cover", position: "attention" })
      .webp({ quality: 82 })
      .toBuffer();
    writeFileSync(join(PUB, slot.folder, `${slot.file}.webp`), webp);

    const meta = await sharp(webp).metadata();
    const blur = await sharp(webp).resize(16).webp({ quality: 40 }).toBuffer();
    const license = `${slot.license.toUpperCase()} ${slot.license_version}`;
    const sourceName = slot.source === "wikimedia" ? "Wikimedia Commons" : "Flickr";
    const entry = {
      src: rel, width: meta.width, height: meta.height, alt: slot.alt,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      placeholder: false, source: slot.landing, author: slot.creator, license, sourceName,
    };
    manifest[slot.id] = entry;
    credits.push({ file: rel, ...entry });
    console.log(`OK  ${slot.id.padEnd(20)} ${meta.width}x${meta.height}  ${license} (${sourceName})`);
  }

  writeFileSync(join(PUB, "image-manifest.json"), JSON.stringify(manifest, null, 2));
  writeFileSync(join(ROOT, "scripts", "credits-data.json"), JSON.stringify(credits, null, 2));
  console.log(`\nMerged ${SLOTS.length} images. Run: node scripts/gen-image-content.mjs`);
}

run();
