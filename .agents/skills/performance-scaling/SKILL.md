---
description: Best practices for optimizing, scaling, and preventing lag on minimalist static sites and GitHub Pages deployments.
name: performance-scaling
---

# Performance and Scaling Best Practices

When maintaining and scaling the minimalist portfolio (hosted on GitHub Pages), "lag" usually refers to either **Initial Load Time** (how long it takes for the page to appear) or **Runtime Performance** (how smooth it feels to scroll or interact).

For a minimalist site, you generally don't need to worry about performance until you hit these specific thresholds. Apply these best practices to scale the site when required.

## 1. Images: The #1 Performance Killer

This is where 90% of portfolio "lag" comes from.

- **The "Worry" Point:** When your total page weight exceeds **2MB–3MB**.
- **The Fix:**
  - **Dimensions:** Don't upload a 4000px wide photo if it only displays at 800px wide.
  - **Format:** Use **WebP** instead of PNG or JPG. It usually reduces file size by 30-50% with no visible quality loss.
  - **Lazy Loading:** Ensure your `<img>` tags have the `loading="lazy"` attribute. This prevents the browser from downloading images at the bottom of the page until the user scrolls to them.

## 2. Number of Blog Posts

Static sites are incredibly fast because they are just HTML files, but the "index" page (where all blogs are listed) can get heavy.

- **The "Worry" Point:** When you have **more than 20–30 posts** listing full content or large preview images on a single page.
- **The Fix:**
  - **Pagination:** Once you hit 20 posts, implement pagination (e.g., "Page 1, 2, 3") or "Load More" functionality.
  - **Excerpts:** Only show a 2-sentence summary and a thumbnail on the main page, rather than the full article.

## 3. DOM Size (Complexity)

If you have thousands of nested `<div>` tags or complex animations on one page, the browser's "main thread" can struggle.

- **The "Worry" Point:** When your DOM tree exceeds **1,500 nodes**. (You can check this in Chrome DevTools under the "Lighthouse" or "Elements" tab).
- **The Fix:** Keep your HTML structure flat and avoid massive libraries for tiny features (e.g., don't import a whole 100KB animation library just to make one button fade in).

## 4. GitHub Pages Limitations

GitHub Pages has some "soft" limits that affect how the site is served:

- **Repo Size:** GitHub recommends keeping repositories under **1GB**. If you store hundreds of high-res "assets" or raw videos in the repo, it will slow down your deployment time (build lag) rather than the page itself.
- **Bandwidth:** There is a **100GB per month** bandwidth limit. Unless your portfolio goes viral on the front page of Hacker News or Reddit, you are unlikely to ever hit this.

## 5. Third-Party Scripts

- **The "Worry" Point:** Adding more than 2-3 external scripts (Google Analytics, Hotjar, Disqus comments, custom fonts).
- **The Fix:** Each external script requires a "DNS lookup" and a new connection, which adds milliseconds of lag. Use **System Fonts** (like Arial, Roboto, or Inter) to avoid the flash of unstyled text while waiting for Google Fonts to load.

## Summary Checklist

You should start optimizing when:

1. **Page Speed Insights** (a free Google tool) gives you a performance score below **90**.
2. Your **total page size** is over **5MB**.
3. You notice a **"layout shift"** (the page jumps around as images load).

As long as you optimize images before uploading them, a minimalist GitHub portfolio can easily handle **hundreds of blog posts** before you ever feel a "lag."
