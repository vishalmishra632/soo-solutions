// One-shot image pipeline: search Wikimedia Commons (free/CC licences only) for each slot,
// download the best free-licensed match, optimise with sharp (WebP q82, EXIF stripped, sane
// aspect crop), generate a blurDataURL, and emit public/images/image-manifest.json + a credits list.
// Falls back to a branded gradient placeholder so no slot is ever an empty box.
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public", "images");
const UA = "SooSolutionsSiteBuild/1.0 (https://soo-solutions.vercel.app; build script)";
const API = "https://commons.wikimedia.org/w/api.php";

const FOLDERS = ["cameras", "installs/residential", "installs/commercial", "hero", "industries", "partners", "misc"];
for (const f of FOLDERS) mkdirSync(join(PUB, f), { recursive: true });

// --- slots: id, folder, file (no ext), search terms (tried in order), width, aspect (w/h), alt ---
const SLOTS = [
  { id: "hero-camera", folder: "hero", file: "hero-security-camera", w: 2400, ar: 16 / 10,
    terms: ["security camera blue sky", "surveillance camera building sky", "CCTV camera outdoor wall"],
    alt: "A modern security camera mounted on a building against a bright sky" },

  // camera types
  { id: "bullet", folder: "cameras", file: "bullet-camera", w: 1400, ar: 4 / 3,
    terms: ["bullet surveillance camera", "bullet CCTV camera wall", "outdoor security camera wall"],
    alt: "A bullet security camera mounted on an exterior wall" },
  { id: "dome", folder: "cameras", file: "dome-camera", w: 1400, ar: 4 / 3,
    terms: ["dome surveillance camera", "dome CCTV camera ceiling", "dome security camera"],
    alt: "A dome security camera fixed to a ceiling" },
  { id: "turret", folder: "cameras", file: "turret-camera", w: 1400, ar: 4 / 3,
    terms: ["turret security camera", "eyeball CCTV camera", "dome turret surveillance camera"],
    alt: "A turret (eyeball) security camera on a building soffit" },
  { id: "ptz", folder: "cameras", file: "ptz-camera", w: 1400, ar: 4 / 3,
    terms: ["PTZ camera", "pan tilt zoom surveillance camera", "speed dome camera pole"],
    alt: "A pan-tilt-zoom (PTZ) surveillance camera on a pole" },
  { id: "fisheye", folder: "cameras", file: "fisheye-camera", w: 1400, ar: 4 / 3,
    terms: ["fisheye camera ceiling", "panoramic surveillance camera", "360 dome camera ceiling"],
    alt: "A fisheye 360-degree camera mounted on an interior ceiling" },
  { id: "doorbell", folder: "cameras", file: "video-doorbell-camera", w: 1400, ar: 4 / 3,
    terms: ["video doorbell", "smart doorbell camera", "doorbell camera front door"],
    alt: "A video doorbell camera beside a front door" },
  { id: "floodlight", folder: "cameras", file: "floodlight-camera", w: 1400, ar: 4 / 3,
    terms: ["floodlight security camera", "security light camera wall", "outdoor floodlight"],
    alt: "A floodlight security camera mounted under an eave" },
  { id: "covert", folder: "cameras", file: "covert-mini-camera", w: 1400, ar: 4 / 3,
    terms: ["mini security camera", "small surveillance camera", "miniature CCTV camera"],
    alt: "A small, discreet mini security camera" },
  { id: "lpr", folder: "cameras", file: "lpr-anpr-camera", w: 1400, ar: 4 / 3,
    terms: ["license plate camera", "ANPR camera", "automatic number plate recognition camera"],
    alt: "A license-plate-recognition camera covering a vehicle entry" },
  { id: "nvr", folder: "cameras", file: "nvr-recorder-poe", w: 1400, ar: 4 / 3,
    terms: ["network video recorder", "CCTV digital video recorder", "server rack network switch"],
    alt: "A network video recorder and PoE switch for a camera system" },

  // residential installs
  { id: "res-eave", folder: "installs/residential", file: "residential-camera-house-eave", w: 1600, ar: 3 / 2,
    terms: ["security camera house wall", "home CCTV camera eave", "residential surveillance camera"],
    alt: "A security camera mounted under the eave of a house" },
  { id: "res-doorbell", folder: "installs/residential", file: "residential-doorbell-front-door", w: 1600, ar: 3 / 2,
    terms: ["video doorbell front door house", "doorbell camera entrance", "smart doorbell installed"],
    alt: "A video doorbell installed at a residential front door" },
  { id: "res-yard", folder: "installs/residential", file: "residential-camera-backyard", w: 1600, ar: 3 / 2,
    terms: ["security camera backyard garden", "home surveillance camera yard", "outdoor camera house garden"],
    alt: "An outdoor camera covering a residential back yard" },
  { id: "res-indoor", folder: "installs/residential", file: "residential-indoor-camera", w: 1600, ar: 3 / 2,
    terms: ["indoor home security camera", "home camera living room", "wireless indoor camera shelf"],
    alt: "A small indoor camera placed inside a home" },

  // commercial installs
  { id: "com-retail", folder: "installs/commercial", file: "commercial-camera-retail-store", w: 1600, ar: 3 / 2,
    terms: ["CCTV camera retail store", "surveillance camera shop interior", "security camera supermarket"],
    alt: "A surveillance camera covering a retail store interior" },
  { id: "com-warehouse", folder: "installs/commercial", file: "commercial-camera-warehouse-dock", w: 1600, ar: 3 / 2,
    terms: ["security camera warehouse", "CCTV warehouse interior", "surveillance camera loading dock"],
    alt: "A camera covering a warehouse and loading dock" },
  { id: "com-office", folder: "installs/commercial", file: "commercial-camera-office-ceiling", w: 1600, ar: 3 / 2,
    terms: ["security camera office ceiling", "CCTV camera office corridor", "surveillance camera workplace"],
    alt: "A ceiling-mounted camera in a commercial office" },
  { id: "com-parking", folder: "installs/commercial", file: "commercial-camera-parking-pole", w: 1600, ar: 3 / 2,
    terms: ["security camera parking lot pole", "CCTV camera car park", "surveillance camera street pole"],
    alt: "A PTZ camera on a pole overlooking a parking lot" },

  // industries
  { id: "ind-retail", folder: "industries", file: "industry-retail", w: 1600, ar: 3 / 2,
    terms: ["retail store interior aisles", "shop interior", "supermarket aisle"], alt: "A retail store interior" },
  { id: "ind-warehousing", folder: "industries", file: "industry-warehousing", w: 1600, ar: 3 / 2,
    terms: ["warehouse interior shelves", "logistics warehouse", "distribution warehouse"], alt: "A logistics warehouse interior" },
  { id: "ind-hospitality", folder: "industries", file: "industry-hospitality", w: 1600, ar: 3 / 2,
    terms: ["hotel lobby interior", "hotel reception", "hotel lobby"], alt: "A hotel lobby" },
  { id: "ind-healthcare", folder: "industries", file: "industry-healthcare", w: 1600, ar: 3 / 2,
    terms: ["medical clinic interior", "hospital corridor", "clinic waiting room"], alt: "A healthcare clinic interior" },
  { id: "ind-education", folder: "industries", file: "industry-education", w: 1600, ar: 3 / 2,
    terms: ["school building campus", "university campus building", "school hallway"], alt: "A school campus" },
  { id: "ind-multi-residential", folder: "industries", file: "industry-multi-residential", w: 1600, ar: 3 / 2,
    terms: ["apartment building exterior", "condominium building", "residential apartment block"], alt: "A multi-residential condo building" },
  { id: "ind-construction", folder: "industries", file: "industry-construction", w: 1600, ar: 3 / 2,
    terms: ["construction site building", "building construction", "construction site crane"], alt: "A construction site" },
  { id: "ind-offices", folder: "industries", file: "industry-offices", w: 1600, ar: 3 / 2,
    terms: ["modern office interior", "office workspace", "open plan office"], alt: "A modern office interior" },

  // misc
  { id: "misc-technician", folder: "misc", file: "technician-installing-camera", w: 1600, ar: 3 / 2,
    terms: ["technician installing security camera", "electrician ladder camera", "security camera installation worker"],
    alt: "A technician installing a security camera" },
  { id: "misc-control-room", folder: "misc", file: "cctv-control-room-monitors", w: 1600, ar: 3 / 2,
    terms: ["cctv control room monitors", "security monitoring room", "surveillance monitors wall"],
    alt: "A CCTV control room with monitoring screens" },
];

function isFreeLicense(ext) {
  const s = `${ext?.License?.value ?? ""} ${ext?.LicenseShortName?.value ?? ""}`.toLowerCase();
  if (/fair use|non-free|nonfree|all rights reserved|©|copyright(?!ed free)/.test(s)) return false;
  return /cc0|public domain|^pd|cc[ -]?by|attribution|gfdl/.test(s);
}
function stripHtml(v) {
  return (v ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

async function searchSlot(slot) {
  for (const term of slot.terms) {
    const url =
      `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}` +
      `&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime|extmetadata` +
      `&iiurlwidth=${Math.min(slot.w * 2, 3000)}&format=json`;
    let data;
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      data = await res.json();
    } catch {
      continue;
    }
    const pages = Object.values(data?.query?.pages ?? {});
    const candidates = pages
      .map((p) => p.imageinfo?.[0])
      .filter(Boolean)
      .filter((ii) => /image\/(jpeg|png)/.test(ii.mime))
      .filter((ii) => (ii.width ?? 0) >= slot.w && isFreeLicense(ii.extmetadata))
      .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
    if (candidates.length) {
      const ii = candidates[0];
      return {
        term,
        downloadUrl: ii.thumburl ?? ii.url,
        sourceUrl: ii.descriptionurl,
        author: stripHtml(ii.extmetadata?.Artist?.value) || "Unknown (Wikimedia Commons)",
        license: stripHtml(ii.extmetadata?.LicenseShortName?.value) || "See source",
      };
    }
  }
  return null;
}

async function placeholder(slot) {
  // Branded gradient placeholder — warm near-white → pale blue, with a camera glyph + label.
  const h = Math.round(slot.w / slot.ar);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${slot.w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2f4f9"/><stop offset="1" stop-color="#dfe6f5"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g transform="translate(${slot.w / 2}, ${h / 2 - 40})" fill="none" stroke="#2563eb" stroke-width="${slot.w / 110}" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
      <rect x="-80" y="-44" width="160" height="92" rx="14"/><circle cx="0" cy="2" r="30"/><circle cx="0" cy="2" r="11" fill="#2563eb"/></g>
    <text x="50%" y="${h / 2 + 70}" font-family="sans-serif" font-size="${slot.w / 36}" fill="#1c2540" text-anchor="middle" opacity="0.7">${slot.alt}</text>
  </svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
}

async function run() {
  const manifest = {};
  const credits = [];
  for (const slot of SLOTS) {
    const outPath = join(PUB, slot.folder, `${slot.file}.webp`);
    const rel = `/images/${slot.folder}/${slot.file}.webp`;
    let buf, src, placeholderUsed = false;

    const pick = await searchSlot(slot);
    if (pick) {
      try {
        const res = await fetch(pick.downloadUrl, { headers: { "User-Agent": UA } });
        src = Buffer.from(await res.arrayBuffer());
        if (src.length < 3000) throw new Error("too small");
      } catch {
        src = null;
      }
    }

    try {
      if (src) {
        buf = await sharp(src)
          .resize(slot.w, Math.round(slot.w / slot.ar), { fit: "cover", position: "attention" })
          .webp({ quality: 82 })
          .toBuffer();
      } else {
        buf = await placeholder(slot);
        placeholderUsed = true;
      }
    } catch {
      buf = await placeholder(slot);
      placeholderUsed = true;
    }

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, buf);
    const meta = await sharp(buf).metadata();
    const blur = await sharp(buf).resize(16).webp({ quality: 40 }).toBuffer();
    const blurDataURL = `data:image/webp;base64,${blur.toString("base64")}`;

    manifest[slot.id] = {
      src: rel, width: meta.width, height: meta.height, alt: slot.alt, blurDataURL,
      placeholder: placeholderUsed,
      source: placeholderUsed ? "generated placeholder" : pick?.sourceUrl,
      author: placeholderUsed ? "Soo Solutions build" : pick?.author,
      license: placeholderUsed ? "n/a (placeholder)" : pick?.license,
    };
    credits.push({ file: rel, ...manifest[slot.id] });
    console.log(`${placeholderUsed ? "PLACEHOLDER" : "OK         "}  ${slot.id.padEnd(20)} ${meta.width}x${meta.height}  ${placeholderUsed ? "(no free match)" : pick.license}`);
  }

  writeFileSync(join(PUB, "image-manifest.json"), JSON.stringify(manifest, null, 2));
  const real = credits.filter((c) => !c.placeholder).length;
  console.log(`\nDONE: ${real}/${credits.length} real photos, ${credits.length - real} placeholders.`);
  writeFileSync(join(ROOT, "scripts", "credits-data.json"), JSON.stringify(credits, null, 2));
}

run();
