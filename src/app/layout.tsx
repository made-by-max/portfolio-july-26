import type { Metadata } from "next";
import "@/styles/globals.css";
import "@fontsource/clear-sans";
// Supports weights 300-900
import "@fontsource-variable/figtree/wght.css";
import {
  TopNav,
  Footer,
  ScrollTimelinePolyfillLoader,
} from "@/components/layout";

const SITE_URL = "https://maxtaylor.design";
const SITE_NAME = "Max Taylor";
const SITE_DESCRIPTION = "Product design portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies a previously-chosen theme before first paint, so the
            manual toggle in Footer doesn't cause a flash of the wrong
            theme on reload. No stored choice = falls back to the
            prefers-color-scheme media query in globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <ScrollTimelinePolyfillLoader />
        <TopNav />
        <div className="page-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
