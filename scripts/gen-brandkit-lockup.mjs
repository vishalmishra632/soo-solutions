import opentype from "opentype.js";
import sharp from "sharp";
import { writeFileSync } from "node:fs";

// Builds the horizontal brand lockup (badge + "Soo SOLUTIONS" wordmark) as a self-contained SVG, then
// rasterizes it. The wordmark is outlined to vector paths via Space Grotesk (the site's display font),
// so the SVG/PNG/JPG render identically anywhere with no font dependency. Re-run to regenerate.
const NAVY = "#1c2540";
const BLUE = "#2563eb";

const FONT_BOLD = "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.ttf";
const FONT_SEMI = "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-600-normal.ttf";

const BLADES = [
  "M61 50 L81 50 L65.5 76.85 Z",
  "M55.5 59.53 L65.5 76.85 L34.5 76.85 Z",
  "M44.5 59.53 L34.5 76.85 L19 50 Z",
  "M39 50 L19 50 L34.5 23.15 Z",
  "M44.5 40.47 L34.5 23.15 L65.5 23.15 Z",
  "M55.5 40.47 L65.5 23.15 L81 50 Z",
];

async function loadFont(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`font fetch failed (${response.status}): ${url}`);
  return opentype.parse(await response.arrayBuffer());
}

function badgeGroup(x, y, size) {
  const scale = size / 100;
  const blades = BLADES.map((d) => `<path d="${d}"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect width="100" height="100" rx="24" fill="url(#bg)"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2"/>
    <g fill="#ffffff" stroke="#1b46c2" stroke-width="0.6" stroke-linejoin="round">${blades}</g>
    <circle cx="50" cy="50" r="9.5" fill="url(#hole)"/>
    <circle cx="45.5" cy="45.5" r="2.2" fill="#ffffff" fill-opacity="0.8"/>
  </g>`;
}

function lens(cx, cy, radius) {
  const stroke = radius * 0.34;
  const pupil = radius * 0.32;
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${BLUE}" stroke-width="${stroke}"/><circle cx="${cx}" cy="${cy}" r="${pupil}" fill="${BLUE}"/>`;
}

async function generate() {
  const bold = await loadFont(FONT_BOLD);
  const semi = await loadFont(FONT_SEMI);

  const pad = 44;
  const badgeSize = 140;
  const gapBadge = 34;
  const sooSize = 100;
  const subSize = 31;
  const subTracking = 8;
  const sooBaseline = 128;
  const subBaseline = 166;
  const wordX = pad + badgeSize + gapBadge;

  const parts = [badgeGroup(pad, pad, badgeSize)];

  // "Soo" — the S as type, the two o's as lenses.
  parts.push(`<path d="${bold.getPath("S", wordX, sooBaseline, sooSize).toPathData(2)}" fill="${NAVY}"/>`);
  const lensRadius = sooSize * 0.245;
  const lensGap = sooSize * 0.03;
  const oCenterY = sooBaseline - lensRadius - sooSize * 0.02;
  let lensX = wordX + bold.getAdvanceWidth("S", sooSize) + lensGap + lensRadius;
  parts.push(lens(lensX, oCenterY, lensRadius));
  lensX += lensRadius * 2 + lensGap;
  parts.push(lens(lensX, oCenterY, lensRadius));
  const sooRight = lensX + lensRadius;

  // "SOLUTIONS" — tracked, with the two O's in brand blue.
  let cursor = wordX;
  for (const character of "SOLUTIONS") {
    const fill = character === "O" ? BLUE : NAVY;
    parts.push(`<path d="${semi.getPath(character, cursor, subBaseline, subSize).toPathData(2)}" fill="${fill}"/>`);
    cursor += semi.getAdvanceWidth(character, subSize) + subTracking;
  }
  const subRight = cursor - subTracking;

  const width = Math.round(Math.max(sooRight, subRight) + pad);
  const height = pad + badgeSize + pad;
  const defs = `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f7df7"/><stop offset="1" stop-color="#1b46c2"/></linearGradient>
    <radialGradient id="hole" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#0b1736"/><stop offset="1" stop-color="#16357f"/></radialGradient>
  </defs>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Soo Solutions"><title>Soo Solutions</title>${defs}${parts.join("")}</svg>`;

  writeFileSync("brandkit/soo-solutions-lockup.svg", svg);

  const buffer = Buffer.from(svg);
  await sharp(buffer, { density: 300 }).resize({ width: 1600 }).png().toFile("brandkit/soo-solutions-lockup.png");
  await sharp(buffer, { density: 300 })
    .resize({ width: 1600 })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile("brandkit/soo-solutions-lockup.jpg");

  console.log(`brandkit lockup: ${width}x${height} SVG + 1600px PNG/JPG`);
}

generate();
