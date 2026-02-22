---
name: frontend-design
description: Create distinctive, production-grade, minimalistic, and highly accessible frontend interfaces.
---

# Frontend Design Skill

This skill guides the creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details, strict accessibility standards, and minimalistic creative choices.

When the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI), rely on this skill.

## Design Thinking

Before coding, understand the context and commit to a **BстуюLD MINIMALIST** and **ACCESSIBLE** aesthetic direction:

*   **Purpose:** What problem does this interface solve? Who uses it?
*   **Tone:** Choose a flavor of minimalism: brutally minimal, Swiss minimalism, elegant/refined, industrial/utilitarian, or soft/pastel. There are many ways to be minimal—pick one and stay true to it.
*   **Accessibility (A11y):** Accessibility is non-negotiable. Ensure semantic structure, proper color contrast, keyboard navigability, and screen-reader compatibility from the start.
*   **Constraints:** Technical requirements (framework, performance, accessibility).
*   **Differentiation:** What makes this unforgettable despite its simplicity? Generous negative space? Impeccable typography? Unorthodox but clean grid alignment?

**CRITICAL:** Choose a clear conceptual direction and execute it with precision. Minimalist and refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from flawless execution.

## Implementation Guidelines

Implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

1.  **Production-grade and functional**
2.  **Strictly accessible and inclusive by default**
3.  **Cohesive with a clear minimalist aesthetic point-of-view**
4.  **Meticulously refined in every detail**

### Frontend Aesthetics Guidelines

Focus on:

*   **Typography:** Choose fonts that are beautiful, clean, and highly legible. Avoid generic fonts like Arial and Inter unless explicitly requested; opt instead for distinctive choices (e.g., highly legible sans-serifs or elegant serifs) that elevate the frontend's aesthetics while maintaining absolute clarity. Ensure font sizing and line height scale properly across devices.
*   **Color & Theme:** Commit to a cohesive minimalist aesthetic. Use CSS variables for consistency. Ensure all foreground and background color combinations meet or exceed WCAG AA (preferably AAA) contrast requirements. A strict, refined color palette (e.g., mostly grayscale or monochrome with a single sharp accent color) often outperforms scattered colors.
*   **Motion:** Use animations for effects and micro-interactions sparingly and with purpose. Focus on high-impact moments, like a well-orchestrated page load with staggered reveals. **Crucial:** Always implement `prefers-reduced-motion` media queries to respect user accessibility preferences.
*   **Spatial Composition:** Generous negative space is vital. Control density. Use predictable yet interesting grid layouts. Asymmetry can work in minimalism when balanced perfectly by whitespace.
*   **Backgrounds & Visual Details:** Keep it clean. Create atmosphere through subtle soft shadows, clean borders, or minimalistic gradient textures rather than noisy visual clutter. The UI should guide the user, not distract them.
*   **Accessibility First:**
    *   Always use semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<button>`, etc.).
    *   Never remove focus outlines unless replacing them with highly visible custom focus states.
    *   Use appropriate `aria-*` attributes, but remember that native HTML elements are always preferred over ARIA band-aids.
    *   Provide descriptive `alt` text for images and use `aria-hidden="true"` for purely decorative elements.

**NEVER** use generic AI-generated aesthetics like overused font families, predictable layouts, and cookie-cutter design that lacks context-specific character. Vary between light/dark themes and typographic pairings to feel genuinely designed for the context, but never at the expense of an accessible user experience.

Remember: Truly great minimalist web design is harder than complex design because every single detail matters. Execute the vision perfectly.
