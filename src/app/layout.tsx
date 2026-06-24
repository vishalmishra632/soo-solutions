import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ConsentedAnalytics } from "@/components/layout/consented-analytics";
import { CookieConsentBanner } from "@/components/layout/cookie-consent-banner";
import { ContactFab } from "@/components/layout/contact-fab";
import { SiteLoader } from "@/components/loader/site-loader";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BackToTop } from "@/components/shared/back-to-top";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.defaultTagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_CA",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#fafaf7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(bodyFont.variable, displayFont.variable)}
    >
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <SiteLoader />
        {/* If JS never runs, don't let the first-paint loader hide the content. */}
        <noscript dangerouslySetInnerHTML={{ __html: "<style>[data-site-loader]{display:none}</style>" }} />
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>
              <a
                href="#main-content"
                className="focus:bg-primary focus:text-primary-foreground focus:shadow-glow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2"
              >
                Skip to content
              </a>
              <ScrollProgress />
              <div className="flex min-h-dvh flex-col">
                <Header />
                {children}
                <Footer />
              </div>
              <ConsentedAnalytics />
              <CookieConsentBanner />
              <ContactFab />
              <BackToTop />
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
