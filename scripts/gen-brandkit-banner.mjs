// Builds wide banner PNGs of the finalized lockup (badge + "Soo SOLUTIONS") for social covers, website
// headers, email, etc. Reuses the already-outlined lockup SVG (no fonts needed) and centres it on three
// backgrounds: white, transparent, and a brand navy gradient (with the wordmark flipped to white so it
// reads on dark). Run: node scripts/gen-brandkit-banner.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const W = 1600;
const H = 500;
const LOGO_H = 320; // logo height inside the banner; the rest is breathing room

const lockupSvg = readFileSync("brandkit/soo-solutions-lockup.svg", "utf8");
const navyLockup = Buffer.from(lockupSvg);
const whiteLockup = Buffer.from(lockupSvg.replaceAll("#1c2540", "#ffffff")); // navy letters -> white

async function renderLogo(svgBuffer) {
  const png = await sharp(svgBuffer, { density: 300 }).resize({ height: LOGO_H }).png().toBuffer();
  const meta = await sharp(png).metadata();
  return { png, meta };
}

function navyGradient() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c2540"/><stop offset="1" stop-color="#0b1326"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`;
  return sharp(Buffer.from(svg));
}

async function banner(base, logoSvg, out) {
  const { png, meta } = await renderLogo(logoSvg);
  const left = Math.round((W - meta.width) / 2);
  const top = Math.round((H - meta.height) / 2);
  await base.composite([{ input: png, left, top }]).png().toFile(out);
  console.log(`OK  ${out}  (${W}x${H}, logo ${meta.width}x${meta.height})`);
}

async function run() {
  await banner(
    sharp({ create: { width: W, height: H, channels: 4, background: "#ffffff" } }),
    navyLockup,
    "brandkit/soo-solutions-banner.png",
  );
  await banner(
    sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }),
    navyLockup,
    "brandkit/soo-solutions-banner-transparent.png",
  );
  await banner(navyGradient(), whiteLockup, "brandkit/soo-solutions-banner-dark.png");
}

run();
