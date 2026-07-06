import { getPublishedPlayItems } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://maxtaylor.design";
const SITE_NAME = "Max Taylor — Play";
const SITE_DESCRIPTION = "Blog posts, notes, projects, and experiments";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = getPublishedPlayItems().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/play/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/play/${item.slug}/</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/play/${item.slug}/</guid>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
