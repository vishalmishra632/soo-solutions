import sharp from "sharp";
import { readFileSync } from "node:fs";

// Rasterizes the vector logo into the brand-kit PNG (transparent) and JPG (white background). High
// render density then a downscale keeps the edges crisp. Re-run after editing the source SVG.
const source = "brandkit/soo-solutions-logo.svg";
const size = 1024;
const svg = readFileSync(source);

async function generate() {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile("brandkit/soo-solutions-logo.png");

  await sharp(svg, { density: 384 })
    .resize(size, size)
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile("brandkit/soo-solutions-logo.jpg");

  console.log(`brandkit: wrote ${size}px PNG (transparent) + JPG (white bg)`);
}

generate();
