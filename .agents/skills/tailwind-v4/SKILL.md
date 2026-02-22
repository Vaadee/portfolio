---
name: tailwind-v4
description: Write modern, utility-first CSS using Tailwind CSS v4 features and best practices.
---

# Tailwind CSS v4 Skill

This project uses **Tailwind CSS v4** via the `@tailwindcss/vite` plugin. Tailwind v4 introduces significant architectural changes compared to v3. When styling or configuring this project, strict adherence to v4 principles is required.

## 1. No `tailwind.config.js`
*   Tailwind v4 is configured entirely through CSS. **Do not create or look for a `tailwind.config.js` file.**
*   Theme configuration (colors, sizing, fonts) is done using CSS variables within the `@theme` directive in your main CSS file (e.g., `src/index.css`).

```css
/* Example Configuration in v4 */
@import "tailwindcss";

@theme {
  --color-primary-500: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

## 2. Dynamic Utilities and Arbitrary Values
*   Rely on Tailwind's JIT compiler. Use arbitrary values `w-[15px]`, arbitrary properties `[mask-image:linear-gradient(...)]`, and arbitrary variants `[&_p]:mt-4` to avoid writing custom CSS classes where possible.
*   Instead of complex `apply` directives, keep utility classes inline in the HTML. Only use `@apply` for strictly reusable components where the DOM structure is outside your control (e.g., overriding third-party styles).

## 3. Typography Plugin (`@tailwindcss/typography`)
*   When styling Markdown content rendered via `marked`, use the `prose` class provided by the typography plugin.
*   Customize the prose typography using the new v4 modifiers (e.g., `prose-headings:font-bold`, `prose-a:text-primary-500`).

## 4. CSS Nesting
*   Tailwind v4 supports native CSS nesting out of the box. Use standard CSS nesting syntax (`&`) when writing custom CSS that cannot be achieved with utility classes.

## 5. Performance and Cleanliness
*   Avoid highly nested or overly complex responsive modifiers unless necessary.
*   Prefer semantic HTML tags paired with utility classes rather than heavy abstract component classes.
