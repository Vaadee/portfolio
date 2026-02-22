import './style.css';
import { marked } from 'marked';
import markedAlert from 'marked-alert';
import markedFootnote from 'marked-footnote';

marked.use(markedAlert());
marked.use(markedFootnote());

import fm from 'front-matter';
import siteConfig from './content/site.json';

const postFiles = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
});
const projectFiles = import.meta.glob('./content/projects/*.md', {
  query: '?raw',
  import: 'default',
});
const headerFile = import.meta.glob('./content/header.md', {
  query: '?raw',
  import: 'default',
});

let headerData = {};
let projectsList = [];
let postsList = [];
let activeTag = 'All';

async function loadContent() {
  document.title = siteConfig.siteTitle || 'Portfolio';
  // Load Header
  const rawHeader = await headerFile['./content/header.md']();
  const parsedHeader = fm(rawHeader);
  headerData = { ...parsedHeader.attributes, content: parsedHeader.body };

  // Load Projects
  for (const path in projectFiles) {
    const rawProject = await projectFiles[path]();
    const parsedProject = fm(rawProject);
    projectsList.push({
      ...parsedProject.attributes,
      content: parsedProject.body,
    });
  }
  projectsList.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Load Posts
  for (const path in postFiles) {
    const rawPost = await postFiles[path]();
    const parsedPost = fm(rawPost);
    const slug = path.split('/').pop().replace(/\.md$/, '');
    postsList.push({
      slug,
      ...parsedPost.attributes,
      content: parsedPost.body,
    });
  }
  postsList.sort((a, b) => {
    // Both have dates - chronological
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }

    // Fallback: handle placement flags if mixed
    if (a.placement && !b.placement) {
      return a.placement === 'before' ? -1 : 1;
    }
    if (!a.placement && b.placement) {
      return b.placement === 'before' ? 1 : -1;
    }

    // Default to order property if no dates
    return (a.order || 0) - (b.order || 0);
  });
}

// ----------------------------------------------------
// UI Components
// ----------------------------------------------------

// Resolves absolute paths safely against Vite's BASE_URL (needed for GitHub Pages)
const getPath = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '');

// Ensure Markdown images respect the Vite BASE_URL for GitHub Pages
const renderer = new marked.Renderer();
renderer.image = function (href, title, text) {
  // Try to use parsed object properties if they exist, fallback to raw arguments
  const actualHref = href && href.href ? href.href : href;
  const actualTitle = href && href.title ? href.title : title;
  const actualText = href && href.text ? href.text : text;

  // If the image path is absolute, prepend it with our Vite BASE_URL
  const finalHref =
    actualHref && actualHref.startsWith('/') ? getPath(actualHref) : actualHref;

  return `<img src="${finalHref}" alt="${actualText || ''}" title="${actualTitle || ''}" class="rounded-lg shadow-sm w-full h-auto mt-6 mb-8" loading="lazy" />`;
};
marked.use({ renderer });

const NavTabs = (currentPath) => `
  <div class="mb-12 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center w-full">
    <nav>
      <ul class="flex space-x-8 -mb-px text-sm font-medium text-gray-500 dark:text-gray-400">
        <li>
          <a href="${getPath('/')}" class="inline-block pb-4 px-1 border-b-2 ${currentPath === '/' ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100' : 'border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-700'} transition-colors" ${currentPath === '/' ? 'aria-current="page"' : ''}>Home</a>
        </li>
        <li>
          <a href="${getPath('/projects')}" class="inline-block pb-4 px-1 border-b-2 ${currentPath === '/projects' ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100' : 'border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-700'} transition-colors" ${currentPath === '/projects' ? 'aria-current="page"' : ''}>Projects</a>
        </li>
        <li>
          <a href="${getPath('/writing')}" class="inline-block pb-4 px-1 border-b-2 ${currentPath === '/writing' || currentPath.startsWith('/post/') ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100' : 'border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-700'} transition-colors" ${currentPath === '/writing' || currentPath.startsWith('/post/') ? 'aria-current="page"' : ''}>Writing</a>
        </li>
      </ul>
    </nav>
    <button type="button" id="theme-toggle"
      class="p-2 -mt-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
      aria-label="Toggle Dark Mode">
      <svg id="theme-toggle-light-icon" aria-hidden="true" class="hidden w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      <svg id="theme-toggle-dark-icon" aria-hidden="true" class="hidden w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    </button>
  </div>
`;

const Header = (data) => `
  <header class="mb-8 text-center md:text-left">
    <h1 class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2">${data.name}</h1>
    <h2 class="text-lg text-gray-500 dark:text-gray-400 font-medium">${data.role}</h2>
    <div class="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl prose prose-gray prose-p:mt-0 max-w-none dark:prose-invert mx-auto md:mx-0">
      ${marked.parse(data.content)}
    </div>
  </header>
`;

const HomeView = (headerData) => `
  <div class="flex-1 flex flex-col justify-center animate-fade-in w-full pb-24">
    <div class="flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
      <div class="flex-1 w-full max-w-3xl">
        ${Header(headerData)}
      </div>
      <div class="w-full md:w-1/3 shrink-0 flex justify-center md:justify-end">
        <!-- Placeholder for caricature -->
        <div class="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-50 dark:bg-gray-800/40 flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden border border-gray-100 dark:border-gray-800 backdrop-blur-sm transition-all hover:shadow-sm">
          ${
            siteConfig.profileImage
              ? `
            <img src="${getPath(siteConfig.profileImage)}" alt="Profile/Caricature" class="w-full h-full object-cover" />
          `
              : `
            <div class="text-center p-4">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-xs uppercase tracking-widest font-medium block">Caricature</span>
            </div>
          `
          }
        </div>
      </div>
    </div>
  </div>
`;

const ProjectsSection = (projects) => `
  <section class="animate-fade-in mb-16 max-w-3xl mx-auto">
    <ul class="space-y-4">
      ${projects
        .map((p) => {
          const externalIcon = p.url
            ? '<svg class="inline-block w-4 h-4 ml-1 -mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span class="sr-only">(opens in a new tab)</span>'
            : '';
          const innerContent = `
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
            ${p.title}${externalIcon}
          </h3>
          <div class="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed prose prose-gray prose-p:my-0 max-w-none dark:prose-invert">
            ${marked.parse(p.content.trim())}
          </div>
        `;

          return p.url
            ? `
        <li class="group block p-4 -mx-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors focus-within:ring-2 focus-within:ring-gray-400 dark:focus-within:ring-gray-600">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="block focus:outline-none">
            ${innerContent}
          </a>
        </li>
        `
            : `
        <li class="group block p-4 -mx-4">
          ${innerContent}
        </li>
        `;
        })
        .join('')}
    </ul>
  </section>
`;

const BlogListSection = (posts) => {
  // Extract all unique tags
  const allTags = new Set();
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => allTags.add(tag));
    }
  });

  // Sort tags alphabetically
  const uniqueTags = ['All', ...Array.from(allTags).sort()];

  // Filter posts based on activeTag
  const filteredPosts =
    activeTag === 'All'
      ? posts
      : posts.filter((post) => post.tags && post.tags.includes(activeTag));

  // Render tag filter buttons
  const tagButtons = uniqueTags
    .map(
      (tag) => `
    <button type="button" data-tag="${tag}" aria-pressed="${activeTag === tag}" class="tag-filter-btn px-4 py-1.5 xl:px-3 xl:py-2 rounded-full xl:rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-left xl:w-full ${
      activeTag === tag
        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
    }">
      ${tag === 'All' ? 'All Posts' : '#' + tag}
    </button>
  `
    )
    .join('');

  return `
  <section class="animate-fade-in mb-16 relative w-full max-w-3xl mx-auto">
      
      <!-- Sidebar for Tags (Absolute on Desktop to float in negative margin) -->
      <aside class="w-full xl:absolute xl:w-40 xl:-left-48 xl:top-0 shrink-0 mb-8 xl:mb-0">
        <div class="xl:sticky xl:top-12">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 hidden xl:block px-3">Topics</h3>
          <!-- Mobile horizontal scroll, Desktop vertical stack -->
          <div class="flex flex-row xl:flex-col gap-2 overflow-x-auto pb-4 xl:pb-0 scrollbar-hide -mx-6 px-6 md:mx-auto xl:mx-0 xl:px-0 border-b border-gray-100 dark:border-gray-800/60 xl:border-b-0">
            ${tagButtons}
          </div>
        </div>
      </aside>

      <!-- Posts List -->
      <div class="space-y-4">
        ${
          filteredPosts.length > 0
            ? filteredPosts
                .map((post) => {
                  const url = post.externalUrl
                    ? post.externalUrl
                    : '/post/' + post.slug;
                  const target = post.externalUrl
                    ? 'target="_blank" rel="noopener noreferrer"'
                    : '';
                  const externalIcon = post.externalUrl
                    ? '<svg class="inline-block w-4 h-4 ml-1 -mt-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span class="sr-only">(opens in a new tab)</span>'
                    : '';
                  const dateStr = post.date
                    ? new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '';
                  const dateTimeStr = post.date
                    ? new Date(post.date).toISOString()
                    : '';
                  const dateHtml = dateStr
                    ? `<time datetime="${dateTimeStr}" class="block text-sm text-gray-500 dark:text-gray-400 mb-2">${dateStr}</time>`
                    : '';

                  const tagsHtml =
                    post.tags && post.tags.length > 0
                      ? `<div class="mt-3 flex gap-2 flex-wrap">
              ${post.tags.map((t) => `<span class="text-xs font-medium text-gray-400 dark:text-gray-500">#${t}</span>`).join('')}
             </div>`
                      : '';

                  const innerContent = `
  ${dateHtml}
  <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
    ${post.title}
    ${externalIcon}
  </h3>
  ${post.excerpt ? `<p class="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">${post.excerpt}</p>` : ''}
  ${tagsHtml}
`;

                  return `
      <article class="group relative block p-5 -mx-5 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors focus-within:ring-2 focus-within:ring-gray-400 dark:focus-within:ring-gray-600">
        <a href="${url}" ${target} class="block focus:outline-none">
          ${innerContent}
        </a>
      </article>
      `;
                })
                .join('')
            : `<div class="text-center py-12 text-gray-500 dark:text-gray-400">No posts found with the tag "#${activeTag}".</div>`
        }
      </div>
  </section>
  `;
};

const PostView = (post) => `
  <article class="animate-fade-in max-w-3xl mx-auto">
    <a href="/writing" class="inline-flex text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 items-center gap-2">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Back to Writing
    </a>
    <header class="mb-10">
      <time datetime="${new Date(post.date).toISOString()}" class="block text-sm text-gray-500 dark:text-gray-400 mb-3">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">${post.title}</h1>
    </header>
    <div class="prose prose-gray max-w-none">
      ${marked.parse(post.content)}
    </div>
  </article>
`;

const getSocialIcon = (platform) => {
  if (platform === 'LinkedIn') {
    return `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>`;
  }
  if (platform === 'GitHub') {
    return `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>`;
  }
  return '';
};

const Footer = (config) => `
  <footer class="mt-auto border-t border-gray-200 dark:border-gray-800 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
    <p>&copy; ${new Date().getFullYear()} ${config.authorName || 'Author'}. All rights reserved.</p>
    <div class="flex space-x-6 mt-4 md:mt-0">
      ${(config.socialLinks || [])
        .map(
          (link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <span class="sr-only">${link.platform}</span>
          ${getSocialIcon(link.platform)}
        </a>
      `
        )
        .join('')}
    </div>
  </footer>
  `;

// ----------------------------------------------------
// Router
// ----------------------------------------------------

let isContentLoaded = false;

/**
 * Main application render function.
 * Handles view switching based on history API to avoid full page reloads.
 */
async function render() {
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
    const post = postsList.find((p) => p.slug === slug);
    if (post) {
      content = PostView(post);
    } else {
      content =
        '<div class="text-center py-20 text-gray-500">Post not found.</div>';
    }
  } else if (path === '/projects') {
    content = ProjectsSection(projectsList);
  } else if (path === '/writing') {
    content = BlogListSection(postsList);
  } else {
    // Default to Home
    content = HomeView(headerData);
  }

  app.innerHTML = `
    ${NavTabs(path)}
    ${content}
    ${Footer(siteConfig)}
`;
  updateThemeIcon();

  if (!path.startsWith('/post/')) {
    window.scrollTo(0, 0);
  }
}

// Simple client-side navigation
window.navigateTo = (url) => {
  window.history.pushState({}, '', url);
  render();
};

window.addEventListener('popstate', render);

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && !link.getAttribute('target')) {
    const href = link.getAttribute('href');
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
    render(); // Re-render the UI with the updated filter
  }
});

function updateThemeIcon() {
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById(
    'theme-toggle-light-icon'
  );

  if (!themeToggleDarkIcon || !themeToggleLightIcon) return;

  if (document.documentElement.classList.contains('dark')) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIcon.classList.add('hidden');
  }
}

// Initial render
render();
