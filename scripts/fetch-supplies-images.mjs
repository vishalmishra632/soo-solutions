// One-shot image pipeline for the /supplies page. Mirrors fetch-images.mjs, but the supply photos are
// hand-picked rather than search-ranked — generic CC/CC0/public-domain product shots are scarce, so each
// slot points at a vetted Flickr or Wikimedia Commons image. Every file is downloaded locally (never
// hot-linked), re-encoded to WebP (q82, EXIF stripped) with a blur placeholder, and MERGED into
// public/images/image-manifest.json + scripts/credits-data.json so the camera/install photos already in
// the manifest are left untouched. Run `node scripts/gen-image-content.mjs` afterwards to emit
// src/content/site-images.ts + public/images/CREDITS.md.
import sharp from "sharp";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public", "images");
const UA = "Mozilla/5.0 (compatible; SooSolutionsSiteBuild/1.0; +https://soo-solutions.vercel.app)";
mkdirSync(join(PUB, "supplies"), { recursive: true });

// id, file (no ext), alt, image url, and attribution (creator / licence / landing page).
const SLOTS = [
  { id: "sup-nitrile-gloves", file: "nitrile-gloves", alt: "A blue disposable nitrile examination glove",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/41/Polypropylene_Clean_Room_Wipe_and_Blue_Nitrile_Glove_-_3.jpg",
    creator: "BlueThunderTechnologies", license: "by-sa", license_version: "4.0", source: "wikimedia",
    landing: "https://commons.wikimedia.org/w/index.php?curid=66739113" },
  { id: "sup-vinyl-gloves", file: "vinyl-gloves", alt: "Powder-free disposable vinyl gloves",
    url: "https://live.staticflickr.com/65535/49060694602_bb178361fd.jpg",
    creator: "shop8447", license: "cc0", license_version: "1.0", source: "flickr",
    landing: "https://www.flickr.com/photos/185514373@N06/49060694602" },
  { id: "sup-face-masks", file: "face-masks", alt: "Disposable three-ply earloop face masks",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Blossom_3_Ply_Bacterial_Filter_Masks_Elestic_Earloop_Face_Mask_Surgical_Masks_a.jpg",
    creator: "Blossoma", license: "by-sa", license_version: "4.0", source: "wikimedia",
    landing: "https://commons.wikimedia.org/w/index.php?curid=3736360" },
  { id: "sup-hand-sanitizer", file: "hand-sanitizer", alt: "A bottle of hand sanitiser gel",
    url: "https://live.staticflickr.com/4604/40361043782_a1a1f97209_b.jpg",
    creator: "classroomcamera", license: "by", license_version: "2.0", source: "flickr",
    landing: "https://www.flickr.com/photos/155535822@N07/40361043782" },
  { id: "sup-takeout-containers", file: "takeout-containers", alt: "Stacked disposable takeaway food containers",
    url: "https://live.staticflickr.com/7836/46568639471_3a12ece8aa_b.jpg",
    creator: "sustainablejill", license: "by-sa", license_version: "2.0", source: "flickr",
    landing: "https://www.flickr.com/photos/127081607@N04/46568639471" },
  { id: "sup-bags-boxes", file: "bags-boxes", alt: "Stacked cardboard packaging boxes",
    url: "https://live.staticflickr.com/3880/14762638020_7fb67beaa8_b.jpg",
    creator: "myguys.nova", license: "by-sa", license_version: "2.0", source: "flickr",
    landing: "https://www.flickr.com/photos/124808053@N07/14762638020" },
  { id: "sup-tableware", file: "disposable-tableware", alt: "Disposable paper cups",
    url: "https://live.staticflickr.com/2872/9503540990_fb7674474e_b.jpg",
    creator: "CompleteMerchandise", license: "by", license_version: "2.0", source: "flickr",
    landing: "https://www.flickr.com/photos/95247477@N06/9503540990" },
  { id: "sup-thermal-rolls", file: "thermal-rolls-80mm", alt: "Thermal receipt paper rolls",
    url: "https://live.staticflickr.com/65535/49059520758_4c0a97baa7.jpg",
    creator: "shop8447", license: "cc0", license_version: "1.0", source: "flickr",
    landing: "https://www.flickr.com/photos/185514373@N06/49059520758" },
  { id: "sup-debit-rolls", file: "debit-rolls-57mm", alt: "Thermal rolls for receipt and card-terminal printers",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Thermal_paper_rolls_with_red_alert_line.jpg",
    creator: "Acheolg", license: "by-sa", license_version: "4.0", source: "wikimedia",
    landing: "https://commons.wikimedia.org/w/index.php?curid=156143903" },
  { id: "sup-bond-rolls", file: "bond-2ply-rolls", alt: "Rolls of thermal receipt paper",
    url: "https://live.staticflickr.com/65535/49060310903_d05f814f5f_b.jpg",
    creator: "shop8447", license: "cc0", license_version: "1.0", source: "flickr",
    landing: "https://www.flickr.com/photos/185514373@N06/49060310903" },
];

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "image/*" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function run() {
  const manifest = JSON.parse(readFileSync(join(PUB, "image-manifest.json"), "utf8"));
  let credits = JSON.parse(readFileSync(join(ROOT, "scripts", "credits-data.json"), "utf8"));
  credits = credits.filter((c) => !String(c.file).startsWith("/images/supplies/"));

  for (const slot of SLOTS) {
    const rel = `/images/supplies/${slot.file}.webp`;
    const webp = await sharp(await download(slot.url))
      .resize(1400, 1050, { fit: "cover", position: "attention" })
      .webp({ quality: 82 })
      .toBuffer();
    writeFileSync(join(PUB, "supplies", `${slot.file}.webp`), webp);

    const meta = await sharp(webp).metadata();
    const blur = await sharp(webp).resize(16).webp({ quality: 40 }).toBuffer();
    const license = `${slot.license.toUpperCase()}${slot.license_version ? ` ${slot.license_version}` : ""}`;
    const sourceName = slot.source === "wikimedia" ? "Wikimedia Commons" : "Flickr";
    const entry = {
      src: rel, width: meta.width, height: meta.height, alt: slot.alt,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      placeholder: false, source: slot.landing, author: slot.creator, license, sourceName,
    };
    manifest[slot.id] = entry;
    credits.push({ file: rel, ...entry });
    console.log(`OK  ${slot.id.padEnd(22)} ${meta.width}x${meta.height}  ${license} (${sourceName})`);
  }

  writeFileSync(join(PUB, "image-manifest.json"), JSON.stringify(manifest, null, 2));
  writeFileSync(join(ROOT, "scripts", "credits-data.json"), JSON.stringify(credits, null, 2));
  console.log(`\nMerged ${SLOTS.length} supply images. Run: node scripts/gen-image-content.mjs`);
}

run();
