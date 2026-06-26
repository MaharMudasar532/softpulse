import { getAllPosts } from "@/lib/blog/get-posts";
import { CANONICAL_BASE } from "@/lib/seo";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${CANONICAL_BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${CANONICAL_BASE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SoftPulse Blog</title>
    <link>${CANONICAL_BASE}/blog</link>
    <description>Software development and IT training insights from SoftPulse</description>
    <language>en-pk</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${CANONICAL_BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
