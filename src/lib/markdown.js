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
 * Helper to slugify text for heading IDs
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // remove HTML tags if any
    .replace(/[^\w]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Configure Marked renderer to ensure Markdown images respect the Vite BASE_URL
 * and Headings get automatic IDs.
 */
const renderer = new marked.Renderer();

renderer.image = function ({ href, title, text }) {
  const actualHref = href;
  const actualTitle = title;
  const actualText = text;

  const finalHref =
    actualHref && actualHref.startsWith('/') ? getPath(actualHref) : actualHref;

  return `<img src="${finalHref}" alt="${actualText || ''}" title="${actualTitle || ''}" class="rounded-lg shadow-sm w-full h-auto mt-6 mb-8" loading="lazy" />`;
};

// Override the heading method to inject an ID.
// Marked v13+ passes a single object to renderer functions.
renderer.heading = function ({ text, depth, tokens }) {
  const slug = slugify(text);
  const innerHTML = this.parser.parseInline(tokens);
  return `<h${depth} id="${slug}">${innerHTML}</h${depth}>\n`;
};
marked.use({ renderer });

export { marked };
