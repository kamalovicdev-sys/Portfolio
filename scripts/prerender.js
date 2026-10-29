// Build'dan keyin har bir til uchun tayyor HTML sahifa yaratadi: dist/index.html (en) va dist/uz/index.html.
// Qidiruv tizimlari va ijtimoiy tarmoqlar kontent va meta teglarni JavaScript'siz ko'radi.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { render, buildHeadTags, buildSitemap, buildRobots, languages, langPath } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const template = readFileSync(path.join(dist, 'index.html'), 'utf-8');

for (const lang of languages) {
  // index.html dagi <title> faqat dev rejimi uchun — uning o'rniga tilga mos SEO teglari qo'yiladi.
  // Funksiya orqali almashtiramiz: matndagi "$" belgilari replace naqshi sifatida o'qilmasligi uchun
  const html = template
    .replace(/<html lang="[^"]*"/, () => `<html lang="${lang}"`)
    .replace(/\s*<title>.*<\/title>/, '')
    .replace('<!--app-head-->', () => buildHeadTags(lang))
    .replace('<!--app-html-->', () => render(lang));

  const outDir = path.join(dist, langPath(lang));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`prerender: ${langPath(lang)} → ${path.relative(root, path.join(outDir, 'index.html'))}`);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap(today));
writeFileSync(path.join(dist, 'robots.txt'), buildRobots());
console.log('prerender: sitemap.xml, robots.txt');
