import { ImageResponse } from "next/og";

// Shared Open Graph template (1200×630). next/og only supports inline styles + a flexbox subset, so this
// is built from plain divs and gradients — a bright, premium card with the brand lens mark and the page's
// title. Each route's opengraph-image.tsx calls renderOgImage() with its own eyebrow/title/subtitle.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BACKGROUND = "#fafaf7";
const NAVY = "#1c2540";
const BLUE = "#2563eb";
const SLATE = "#4b5563";

// The Aperture badge as a data-URI — solid fills only (no gradients/masks), which is safe for the OG
// rasterizer. Mirrors public/brand/app-icon.svg: a brand-blue badge with a six-blade camera iris.
const MARK = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' rx='24' fill='${BLUE}'/><circle cx='50' cy='50' r='34' fill='none' stroke='#fff' stroke-opacity='0.18' stroke-width='2'/><g fill='#fff' stroke='#1b46c2' stroke-width='0.6' stroke-linejoin='round'><path d='M61 50 L81 50 L65.5 76.85 Z'/><path d='M55.5 59.53 L65.5 76.85 L34.5 76.85 Z'/><path d='M44.5 59.53 L34.5 76.85 L19 50 Z'/><path d='M39 50 L19 50 L34.5 23.15 Z'/><path d='M44.5 40.47 L34.5 23.15 L65.5 23.15 Z'/><path d='M55.5 40.47 L65.5 23.15 L81 50 Z'/></g><circle cx='50' cy='50' r='9.5' fill='#0b1736'/><circle cx='45.5' cy='45.5' r='2.2' fill='#fff' fill-opacity='0.8'/></svg>`;
const BRAND_MARK = `data:image/svg+xml,${encodeURIComponent(MARK)}`;

interface OgContent {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function renderOgImage({ eyebrow, title, subtitle }: OgContent) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BACKGROUND,
          backgroundImage:
            "radial-gradient(900px 500px at 100% 0%, rgba(37,99,235,0.16), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(37,99,235,0.08), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={64} height={64} src={BRAND_MARK} alt="Soo Solutions" style={{ display: "flex" }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: NAVY, letterSpacing: -0.5 }}>
            Soo Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: BLUE }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, color: NAVY, marginTop: 22, lineHeight: 1.05 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 32, color: SLATE, marginTop: 24, maxWidth: 900 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: SLATE }}>
          <div>Security Cameras &amp; CCTV — Supply &amp; Installation</div>
          <div style={{ color: BLUE, fontWeight: 600 }}>Smart Solutions. Safer Futures.</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
