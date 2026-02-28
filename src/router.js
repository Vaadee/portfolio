import { loadContent, state, siteConfig } from './lib/data.js';
import { NavTabs, updateThemeIcon } from './components/Navigation.js';
import { HomeView } from './components/HomeView.js';
import { ProjectsSection } from './components/ProjectsView.js';
import { BlogListSection, PostView } from './components/WritingView.js';
import { Footer } from './components/Footer.js';

let isContentLoaded = false;
let activeTag = 'All';
let visiblePostsCount = 10;
let scrollSpyTimeout;

/**
 * Updates the Table of Contents active link based on scroll position.
 */
function handleScrollSpy() {
  if (!window.location.pathname.startsWith('/post/')) return;

  if (scrollSpyTimeout) {
    window.cancelAnimationFrame(scrollSpyTimeout);
  }

  scrollSpyTimeout = window.requestAnimationFrame(() => {
    const headings = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    );
    const tocLinks = Array.from(document.querySelectorAll('.toc-link'));

    if (!headings.length || !tocLinks.length) return;

    let activeId = '';
    // 120px offset to account for visual padding/header when scrolling down
    const scrollPosition = window.scrollY + 120;

    for (const h of headings) {
      // offsetTop is relative to the document
      const hTop = h.getBoundingClientRect().top + window.scrollY;
      if (hTop <= scrollPosition) {
        activeId = h.id;
      } else {
        break;
      }
    }

    if (!activeId && headings.length > 0) activeId = headings[0].id;

    tocLinks.forEach((link) => {
      if (link.dataset.target === activeId) {
        link.classList.add(
          'text-gray-900',
          'dark:text-gray-100',
          'font-medium'
        );
        link.classList.remove('text-gray-500', 'dark:text-gray-400');
      } else {
        link.classList.add('text-gray-500', 'dark:text-gray-400');
        link.classList.remove(
          'text-gray-900',
          'dark:text-gray-100',
          'font-medium'
        );
      }
    });
  });
}

/**
 * Main application render function.
 * Handles view switching based on history API.
 */
export async function render() {
  const app = document.getElementById('app');
  let rawPath = window.location.pathname;
  let path = '/';

  // Strip the configuration BASE_URL from the pathname to resolve internal components correctly
  const base = import.meta.env.BASE_URL;
  if (rawPath.startsWith(base)) {
    path = '/' + rawPath.slice(base.length);
  }

  if (!isContentLoaded) {
    await loadContent();
    isContentLoaded = true;
  }

  let content;

  if (path.startsWith('/post/')) {
    const slug = path.split('/post/')[1];
    const post = state.postsList.find((p) => p.slug === slug);
    if (post) {
      content = PostView(post);
    } else {
      content =
        '<div class="text-center py-20 text-gray-500">Post not found.</div>';
    }
  } else if (path === '/projects') {
    content = ProjectsSection(state.projectsList);
  } else if (path === '/writing') {
    content = BlogListSection(state.postsList, activeTag, visiblePostsCount);
  } else {
    content = HomeView(state.headerData);
  }

  app.innerHTML = `
    ${NavTabs(path)}
    ${content}
    ${Footer(siteConfig)}
  `;
  updateThemeIcon();

  if (!path.startsWith('/post/')) {
    window.scrollTo(0, 0);
  } else {
    // Scroll to top or specific hash for posts
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.getElementById(
          window.location.hash.slice(1)
        );
        if (targetElement) {
          const offsetTop =
            targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'auto' });
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
    // Initialize scroll spy
    setTimeout(handleScrollSpy, 100);
  }
}

/**
 * Initializes the router and event listeners.
 */
export function initRouter() {
  // Simple client-side navigation setup
  window.navigateTo = (url) => {
    window.history.pushState({}, '', url);
    render();
  };

  window.addEventListener('popstate', render);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && !link.getAttribute('target')) {
      const href = link.getAttribute('href');

      // Handle internal TOC hash links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.getElementById(href.slice(1));
        if (targetElement) {
          const offsetTop =
            targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
          window.history.pushState({}, '', window.location.pathname + href);
          // Manually trigger scroll spy to feel instantly responsive
          setTimeout(handleScrollSpy, 50);
        }
        return;
      }

      if (href.startsWith(import.meta.env.BASE_URL)) {
        e.preventDefault();
        window.navigateTo(href);
      }
    }

    const themeBtn = e.target.closest('#theme-toggle');
    if (themeBtn) {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcon();
    }

    const tagBtn = e.target.closest('.tag-filter-btn');
    if (tagBtn) {
      activeTag = tagBtn.getAttribute('data-tag');
      visiblePostsCount = 10; // Reset pagination when filter changes
      render(); // Re-render the UI with the updated filter
    }

    const loadMoreBtn = e.target.closest('#load-more-btn');
    if (loadMoreBtn) {
      visiblePostsCount += 10;
      render();
    }
  });

  // Attach scroll listener for TOC spy
  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // Initial render
  render();
}
