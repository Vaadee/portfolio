import { marked } from 'marked';
import markedAlert from 'marked-alert';
import markedFootnote from 'marked-footnote';

marked.use(markedAlert());
marked.use(markedFootnote());

/**
 * Resolves absolute paths safely against Vite's BASE_URL (needed for GitHub Pages)
 */
export const getPath = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '');

/**
 * Configure Marked renderer to ensure Markdown images respect the Vite BASE_URL
 */
const renderer = new marked.Renderer();
renderer.image = function (href, title, text) {
  const actualHref = href && href.href ? href.href : href;
  const actualTitle = href && href.title ? href.title : title;
  const actualText = href && href.text ? href.text : text;

  const finalHref =
    actualHref && actualHref.startsWith('/') ? getPath(actualHref) : actualHref;

  return `<img src="${finalHref}" alt="${actualText || ''}" title="${actualTitle || ''}" class="rounded-lg shadow-sm w-full h-auto mt-6 mb-8" loading="lazy" />`;
};
marked.use({ renderer });

export { marked };
