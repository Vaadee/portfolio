---
name: accessibility
description: Strict WCAG guidelines, semantic HTML conventions, and ARIA best practices for building inclusive, production-ready web interfaces.
---

# Accessibility (A11y) Best Practices

When building or modifying web interfaces, you **MUST** adhere to strict WCAG (Web Content Accessibility Guidelines) best practices to ensure the application is inclusive and easily operable by assistive technologies like screen readers and keyboard navigation.

## 1. Semantic HTML

Always use the most appropriate, semantic HTML tags before reaching for `<div>` or `<span>`.

- **Landmarks**: Ensure the page structure uses `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>` where appropriate.
- **Buttons vs Links**: Use `<button>` for actions that change state or trigger scripts. Use `<a>` only for navigating between pages or anchor links.
- **Dates & Times**: Always wrap dates in a `<time>` element with a machine-readable `datetime` attribute (e.g., `<time datetime="2024-10-15T00:00:00.000Z">Oct 15, 2024</time>`).

## 2. Heading Hierarchy

Screen reader users navigate documents by heading levels.

- You must **never** skip heading levels (e.g., jumping from `<h1>` to `<h3>` is forbidden).
- Each page should ideally have exactly one `<h1>`. Subsections should naturally flow `<h2>`, then `<h3>`, and so forth.

## 3. ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes carefully to communicate state changes to screen readers.

- **Toggles & Filters**: Use `aria-pressed="true"` (or `false`) on toggle buttons that filter content or change visual modes (e.g., dark mode toggle, topic tags).
- **Expanded Content**: Use `aria-expanded="true/false"` on buttons that reveal or hide content (e.g., dropdowns, accordions).
- **Hidden Elements**: If an element is decorative (like an icon) and should be ignored by screen readers, apply `aria-hidden="true"`.

## 4. Keyboard Navigation

Users who navigate via keyboard (Tab and Shift+Tab) rely on visual cues.

- **Focus Rings**: Never remove outline styles without providing an adequate replacement fallback. Always provide clear, high-contrast focus rings for interactive elements.
  - _Tailwind Example:_ `focus-within:ring-2 focus-within:ring-gray-400 dark:focus-within:ring-gray-600 focus:outline-none`. Make sure the ring contrast pops against its surrounding background.
- **Tab Order**: Keep a logical DOM structure so that natural `tabindex` flows intuitively from top to bottom, left to right. Avoid using `tabindex` greater than 0.

## 5. Screen Reader Context for Links

Links must make sense out of context. "Click here" or "Read more" are anti-patterns.

- **Descriptive Links**: Ensure the link text describes its destination (e.g., "Read the case study on CureBay").
- **Opening New Tabs**: If an external link (using `target="_blank"`) opens in a new tab, warn the screen reader user with visually hidden text (`sr-only`) appended inside the anchor.
  - _Example:_ `<a href="https://example.com" target="_blank">External Site <span class="sr-only">(opens in a new tab)</span></a>`

## 6. Button Types

By default, `<button>` elements inside forms submit the form. To prevent accidental submittals and unexpected behavior in assistive tech, **always** explicitly define a `type`.

- _Example:_ `<button type="button">Toggle Menu</button>`

## 7. Color Contrast & Images

- **Images**: All `<img>` elements must have an `alt` attribute. If the image is purely decorative, use an empty alt string: `alt=""`. If it conveys meaning, briefly describe it.
- **Contrast Ratios**: Ensure text color against background color meets a minimum ratio of 4.5:1 for normal text, and 3:1 for large text. Tailwind's standard gray scales typically conform naturally when dark mode is correctly implemented.
