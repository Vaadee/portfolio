---
name: vanilla-dom-markdown
description: Best practices for Vanilla JS DOM manipulation, Markdown rendering, and XSS prevention.
---

# Vanilla JS & Markdown Rendering Skill

This project uses Vanilla JavaScript, Vite, `marked`, and `front-matter`. This skill outlines the best practices for handling data fetching, parsing markdown, and injecting HTML into the DOM securely and efficiently without a frontend framework.

## 1. Safe Markdown Rendering
*   **XSS Prevention:** When converting Markdown to HTML using `marked`, ensure that the output is safe to inject. Since you are rendering raw HTML into the DOM via `innerHTML`, never render unsanitized user-generated content. If you introduce user comments later, you must add DOMPurify.
*   **Front-matter Parsing:** Use `front-matter` to extract metadata (title, date, tags) before passing the body to `marked`.
*   **Asynchronous Loading:** Use `fetch()` to dynamically load `.md` files based on the requested route/URL hash instead of hardcoding content.

```javascript
import frontMatter from 'front-matter';
import { marked } from 'marked';

async function loadPost(slug) {
  const response = await fetch(`/posts/${slug}.md`);
  if (!response.ok) throw new Error('Post not found');
  
  const text = await response.text();
  const { attributes, body } = frontMatter(text);
  const html = marked.parse(body);
  
  return { meta: attributes, html };
}
```

## 2. Efficient DOM Manipulation
*   **Avoid Excessive Reflows:** Instead of updating the DOM multiple times in a loop, build a raw HTML string or use a `DocumentFragment` in memory, then append it to the live DOM exactly once.
*   **Event Delegation:** Attach event listeners to parent containers rather than individual child elements. This is especially critical for elements dynamically generated from your Markdown content.
*   **Element Selection:** Cache DOM lookups. Do not repeatedly call `document.querySelector` inside loops or scroll handlers.

```javascript
// Good: Event Delegation
const container = document.getElementById('blog-list');
container.addEventListener('click', (e) => {
  if (e.target.matches('.post-link')) {
    e.preventDefault();
    // handle navigation
  }
});
```

## 3. Configuration & Data Management
* **No hardcoded dynamic data in code.** URLs, social links, system configurations, copyright information, and raw text content should never be embedded inside HTML or JS template strings.
* **Centralized Configuration:** Store site-wide configuration inside a central `src/content/site.json` file.
* **Content isolation:** For large text or blog content, store them directly in individual `.md` files with YAML/JSON front-matter to manage attributes.

## 4. State Management
*   Keep state (e.g., current theme, active page) in simple JS objects or use `sessionStorage`/`localStorage`. 
*   Reflect state changes to the DOM explicitly using clear, separated render functions rather than mixing state logic with DOM manipulation logic.
