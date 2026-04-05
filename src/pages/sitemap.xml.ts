import { SITE } from '@/consts';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const MAX_URLS_PER_SITEMAP = 50000;

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async (context) => {
  const requestUrl = new URL(context.request.url);
  const pathname = requestUrl.pathname;
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const baseUrl = SITE.href.replace(/\/$/, '');

  const projects = await getCollection('projects');

  const now = new Date();
  const latestProjectDate = now;

  const urls: { loc: string; lastmod: string; changefreq?: string; priority?: number }[] = [];

  urls.push({
    loc: `${baseUrl}/`,
    lastmod: formatDate(now),
    changefreq: 'weekly',
    priority: 1.0
  });

  urls.push({
    loc: `${baseUrl}/projects/`,
    lastmod: formatDate(latestProjectDate),
    changefreq: 'weekly',
    priority: 0.9
  });

  urls.push({
    loc: `${baseUrl}/about/`,
    lastmod: formatDate(now),
    changefreq: 'monthly',
    priority: 0.8
  });

  for (const project of projects) {
    urls.push({
      loc: `${baseUrl}/projects/${encodeURIComponent(project.data.slug)}/`,
      lastmod: formatDate(now),
      changefreq: 'yearly',
      priority: 0.6
    });
  }

  const chunks: typeof urls[] = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  const numSitemaps = chunks.length;

  if (normalizedPath.endsWith('/sitemap.xml')) {
    if (numSitemaps > 1) {
      const indexXml = generateSitemapIndex(numSitemaps, baseUrl);
      return new Response(indexXml, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } else {
      const sitemapXml = generateSitemapXml(chunks[0]);
      return new Response(sitemapXml, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
  } 
  else if (/\/sitemap-\d+\.xml$/.test(normalizedPath)) {
    const indexStr = normalizedPath.match(/\/sitemap-(\d+)\.xml$/)?.[1] ?? '';
    const index = parseInt(indexStr, 10);
    if (isNaN(index) || index < 0 || index >= numSitemaps) {
      return new Response('Not Found', { status: 404 });
    }
    const sitemapXml = generateSitemapXml(chunks[index]);
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } else {
    return new Response('Not Found', { status: 404 });
  }
};

function generateSitemapXml(urls: { loc: string; lastmod: string; changefreq?: string; priority?: number }[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${escapeXml(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority !== undefined ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}
    </url>`)
    .join('\n  ')}
</urlset>`;
}

function generateSitemapIndex(count: number, baseUrl: string): string {
  const now = formatDate(new Date());
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: count }, (_, i) => `
    <sitemap>
      <loc>${escapeXml(`${baseUrl}/sitemap-${i}.xml`)}</loc>
      <lastmod>${now}</lastmod>
    </sitemap>`).join('\n  ')}
</sitemapindex>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
