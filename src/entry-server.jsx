import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';
import LanguageProvider from './context/LanguageProvider.jsx';

export { buildHeadTags, buildSitemap, buildRobots, languages, langPath } from './seo.js';

// scripts/prerender.js uchun: berilgan tildagi sahifaning tayyor HTML i
export const render = (lang) =>
  renderToString(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider initialLang={lang}>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
