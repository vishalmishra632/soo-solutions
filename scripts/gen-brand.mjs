// Generates the full Soo Solutions logo system from one locked geometry: the "Twin Aperture" — two
// camera-lens rings (the "oo" of Soo) offset for depth. Writes standalone SVGs to public/brand/, the
// favicon/app-icon set, and a verification contact sheet. Run: node scripts/gen-brand.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const BLUE = "#2563eb";
const NAVY = "#1c2540";
const WHITE = "#ffffff";
const LIFT = "#7db0ff";

// ---- locked geometry (100×100 viewBox, mark spans ~12..88) ----
const R = 21;
const SW = 8;
const PUP = 5;
const BACK = [37, 63];
const FRONT = [63, 37];
const MASK_R = R + SW / 2 + 2.5;

mkdirSync("public/brand", { recursive: true });

function lens([cx, cy], ring, pupil) {
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${ring}" stroke-width="${SW}"/><circle cx="${cx}" cy="${cy}" r="${PUP}" fill="${pupil}"/>`;
}

// The mark with clean front-over-back depth via a mask (transparent-safe). `id` must be unique per file.
function markInner({ backRing, backPup, frontRing, frontPup }, id) {
  return `<defs><mask id="${id}"><rect width="100" height="100" fill="#fff"/><circle cx="${FRONT[0]}" cy="${FRONT[1]}" r="${MASK_R}" fill="#000"/></mask></defs>
<g mask="url(#${id})">${lens(BACK, backRing, backPup)}</g>
${lens(FRONT, frontRing, frontPup)}`;
}

function svg(inner, { size = 100, viewBox = "0 0 100 100" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" role="img" aria-label="Soo Solutions"><title>Soo Solutions</title>${inner}</svg>`;
}

// Colour treatments
const PRIMARY = { backRing: NAVY, backPup: NAVY, frontRing: BLUE, frontPup: NAVY };
const MONO = { backRing: NAVY, backPup: NAVY, frontRing: NAVY, frontPup: NAVY };
const REVERSED = { backRing: LIFT, backPup: LIFT, frontRing: WHITE, frontPup: LIFT };
const ONWHITE = { backRing: WHITE, backPup: WHITE, frontRing: WHITE, frontPup: WHITE }; // for blue square

// Blue rounded-square app mark (favicon / app icon). pad = mark inset; corner = square radius.
function appMark({ corner = 22, pad = 0, square = BLUE } = {}, id = "m") {
  const s = (100 - 2 * pad) / 100;
  return `<rect width="100" height="100" rx="${corner}" fill="${square}"/><g transform="translate(${pad} ${pad}) scale(${s})">${markInner(ONWHITE, id)}</g>`;
}

// ---- standalone SVG assets ----
writeFileSync("public/brand/icon.svg", `${svg(markInner(PRIMARY, "d"))}\n`);
writeFileSync("public/brand/icon-mono.svg", `${svg(markInner(MONO, "d"))}\n`);
writeFileSync("public/brand/icon-reversed.svg", `${svg(markInner(REVERSED, "d"))}\n`);
writeFileSync("public/brand/app-icon.svg", `${svg(appMark({ corner: 22, pad: 16 }, "a"))}\n`);

// Lockups + wordmark (wordmark set in the site display font with system fallbacks).
const FONT = "'Space Grotesk', 'General Sans', ui-sans-serif, system-ui, sans-serif";
function wordmark(x, y, size, fill) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="700" letter-spacing="-0.02em" fill="${fill}">Soo Solutions</text>`;
}
const lockH = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="96" viewBox="0 0 360 96" role="img" aria-label="Soo Solutions"><title>Soo Solutions</title>
<g transform="translate(8 8) scale(0.8)">${markInner(PRIMARY, "lh")}</g>
${wordmark(96, 60, 36, NAVY)}</svg>`;
writeFileSync("public/brand/lockup-horizontal.svg", `${lockH}\n`);

const lockS = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="170" viewBox="0 0 260 170" role="img" aria-label="Soo Solutions"><title>Soo Solutions</title>
<g transform="translate(80 6) scale(1)">${markInner(PRIMARY, "ls")}</g>
${wordmark(130, 152, 30, NAVY)}<style>text{text-anchor:middle}</style></svg>`;
writeFileSync("public/brand/lockup-stacked.svg", `${lockS}\n`);

writeFileSync(
  "public/brand/wordmark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="60" viewBox="0 0 300 60" role="img" aria-label="Soo Solutions"><title>Soo Solutions</title>${wordmark(4, 42, 36, NAVY)}</svg>\n`,
);

// ---- favicon + app icons (Next file-convention paths + manifest PNGs) ----
const faviconSquare = svg(appMark({ corner: 22, pad: 8 }, "f"));
writeFileSync("src/app/icon.svg", `${faviconSquare}\n`);
writeFileSync("public/icon.svg", `${faviconSquare}\n`);

const maskable = svg(appMark({ corner: 0, pad: 18 }, "k")); // full-bleed + safe-zone padding

async function png(svgString, size, file) {
  await sharp(Buffer.from(svgString)).resize(size, size).png().toFile(file);
}
await png(svg(appMark({ corner: 24, pad: 8 }, "p1")), 180, "src/app/apple-icon.png");
await png(svg(appMark({ corner: 26, pad: 8 }, "p2")), 192, "public/icon-192.png");
await png(svg(appMark({ corner: 70, pad: 8 }, "p3")), 512, "public/icon-512.png");
await png(maskable, 512, "public/icon-maskable-512.png");

// favicon.ico = 32px PNG wrapped in a single-image ICO container
const ico32 = await sharp(Buffer.from(svg(appMark({ corner: 18, pad: 6 }, "ico")))).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(ico32.length, 8);
entry.writeUInt32LE(22, 12);
writeFileSync("src/app/favicon.ico", Buffer.concat([header, entry, ico32]));

console.log("brand assets written to public/brand/, src/app/, and public/");
