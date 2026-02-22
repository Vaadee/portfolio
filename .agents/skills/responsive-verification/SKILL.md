---
name: responsive-verification
description: Best practices and guidelines for using the browser subagent to verify responsive design on various viewports.
---

# Responsive Verification Skill

When developing UI features or fixing layout issues, it is critical to ensure that the application is fully responsive. As an agent, you must verify visual changes across both desktop and mobile viewports to guarantee a unified experience.

## Guidelines for Verification

1. **Test Multiple Viewports**: Always verify your layout changes on at least two distinct viewport sizes using the browser subagent.
   - **Desktop**: Generally >= 1024px wide (e.g., 1280px or 1440px).
   - **Mobile**: Generally <= 768px wide (e.g., 375px or 400px).
   
2. **Explicit Resizing**: Prior to taking screenshots or evaluating the DOM, explicitly resize the browser using the `browser_resize_window` (or equivalent tool/instruction) to force the media queries to trigger.

3. **Validation Focus Areas**:
   - **Centering & Alignment**: Check if text, images, and containers align as expected (e.g., left-aligned on desktop, center-aligned on mobile).
   - **Overflow & Scrolling**: Ensure there is no unintended horizontal scrollbar and that content does not break out of its container.
   - **Spacing/Margins**: Validate that padding and margins adapt correctly (e.g., smaller gaps on mobile).
   - **Visibility**: Ensure elements hidden on mobile (`hidden md:block`) or visible only on mobile (`block md:hidden`) behave correctly.

4. **Actionable Walkthroughs**: Always record the browser subagent's interaction and include the resulting `.webp` recordings or `.png` screenshots in the walkthrough artifact to provide visual proof of responsiveness to the user.
