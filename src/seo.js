import translations from './i18n/translations';

export const SITE_URL = 'https://kamalovic.uz';
export const DEFAULT_LANG = 'en';
export const languages = ['en', 'uz'];

const ogLocales = { en: 'en_US', uz: 'uz_UZ' };

const socialProfiles = [
  'https://github.com/kamalovicdev-sys',
  'https://linkedin.com/in/kamalovic',
  'https://t.me/kama1ovic',
];

// Har bir til o'z sahifasiga ega: / — inglizcha (standart), /uz/ — o'zbekcha
export const langPath = (lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);

export const getLangFromPath = (pathname) =>
  languages.find((lang) => lang !== DEFAULT_LANG && (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`))) ?? DEFAULT_LANG;

const absoluteUrl = (path) => `${SITE_URL}${path}`;

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Schema.org: qidiruv tizimlari uchun shaxs haqidagi tuzilgan ma'lumot (JSON-LD)
const buildStructuredData = (lang) => {
  const { seo } = translations[lang];
  const url = absoluteUrl(langPath(lang));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: absoluteUrl('/'),
        name: 'Kamalovic',
        inLanguage: languages,
      },
      {
        '@type': 'ProfilePage',
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Mavlonxon Mamadaliev',
        alternateName: 'Kamalovic',
        jobTitle: seo.jobTitle,
        description: seo.description,
        url: absoluteUrl('/'),
        worksFor: { '@type': 'Organization', name: 'Mehrzod Business Group' },
        knowsAbout: ['Python', 'Django', 'Flask', 'React', 'PostgreSQL', 'SQL', 'Data Analysis', 'Metabase'],
        sameAs: socialProfiles,
      },
    ],
  };
};

// scripts/prerender.js har bir til sahifasining <head> qismiga qo'yadigan teglar
export const buildHeadTags = (lang) => {
  const { seo } = translations[lang];
  const url = absoluteUrl(langPath(lang));
  const image = absoluteUrl('/og-image.png');
  // JSON-LD ichida "</script>" uchrab qolsa, skript bloki yopilib qolmasligi uchun
  const jsonLd = JSON.stringify(buildStructuredData(lang)).replace(/</g, '\\u003c');

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...languages.map((code) => `<link rel="alternate" hreflang="${code}" href="${absoluteUrl(langPath(code))}" />`),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(langPath(DEFAULT_LANG))}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="Kamalovic" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<meta property="og:locale" content="${ogLocales[lang]}" />`,
    ...languages.filter((code) => code !== lang).map((code) => `<meta property="og:locale:alternate" content="${ogLocales[code]}" />`),
    `<meta property="profile:first_name" content="Mavlonxon" />`,
    `<meta property="profile:last_name" content="Mamadaliev" />`,
    `<meta property="profile:username" content="kamalovic" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
};

export const buildSitemap = (lastmod) => {
  const alternates = [
    ...languages.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absoluteUrl(langPath(code))}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(langPath(DEFAULT_LANG))}" />`,
  ].join('\n');

  const urls = languages.map((lang) => `  <url>
    <loc>${absoluteUrl(langPath(lang))}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
};

export const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
