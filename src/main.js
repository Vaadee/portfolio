import './style.css';
import { marked } from 'marked';
import fm from 'front-matter';
import siteConfig from './content/site.json';

const postFiles = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default' });
const projectFiles = import.meta.glob('./content/projects/*.md', { query: '?raw', import: 'default' });
const headerFile = import.meta.glob('./content/header.md', { query: '?raw', import: 'default' });

let headerData = {};
let projectsList = [];
let postsList = [];

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
    projectsList.push({ ...parsedProject.attributes, content: parsedProject.body });
  }
  projectsList.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Load Posts
  for (const path in postFiles) {
    const rawPost = await postFiles[path]();
    const parsedPost = fm(rawPost);
    const slug = path.split('/').pop().replace(/\.md$/, '');
    postsList.push({ slug, ...parsedPost.attributes, content: parsedPost.body });
  }
  postsList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ----------------------------------------------------
// UI Components
// ----------------------------------------------------

const Header = (data) => `
  <header class="mb-16">
    <h1 class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2">${data.name}</h1>
    <h2 class="text-lg text-gray-500 dark:text-gray-400 font-medium">${data.role}</h2>
    <div class="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl prose prose-gray prose-p:mt-0 max-w-none dark:prose-invert">
      ${marked.parse(data.content)}
    </div>
  </header>
`;

const ProjectsSection = (projects) => `
  <section class="mb-16">
    <h3 class="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">${siteConfig.projectsTitle || 'Selected Work'}</h3>
    <ul class="space-y-8">
      ${projects.map(p => `
        <li class="group">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">${p.title}</h4>
          <div class="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed prose prose-gray prose-p:my-0 max-w-none dark:prose-invert">
            ${marked.parse(p.content.trim())}
          </div>
        </li>
      `).join('')}
    </ul>
  </section>
`;

const BlogListSection = (posts) => `
  <section>
    <h3 class="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">${siteConfig.writingTitle || 'Writing'}</h3>
    <div class="space-y-10">
      ${posts.map(post => {
  const url = post.externalUrl ? post.externalUrl : "/post/" + post.slug;
  const target = post.externalUrl ? 'target="_blank" rel="noopener noreferrer"' : '';
  const externalIcon = post.externalUrl ? '<svg class="inline-block w-4 h-4 ml-1 -mt-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' : '';
  const dateStr = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return `
        <article class="group relative">
          <time class="block text-sm text-gray-500 dark:text-gray-400 mb-2">${dateStr}</time>
          <h4 class="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 transition-all">
            <a href="${url}" ${target} class="focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 rounded before:absolute before:inset-0 text-gray-900 dark:text-gray-100">
              ${post.title}
              ${externalIcon}
            </a>
          </h4>
          <p class="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">${post.excerpt}</p>
        </article>
        `;
}).join('')}
    </div>
  </section>
`;

const PostView = (post) => `
  <article>
    <a href="/" class="inline-flex text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 items-center gap-2">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Back to Home
    </a>
    <header class="mb-10">
      <time class="block text-sm text-gray-500 dark:text-gray-400 mb-3">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">${post.title}</h1>
    </header>
    <div class="prose prose-gray max-w-none">
      ${marked.parse(post.content)}
    </div>
  </article>
`;

// ----------------------------------------------------
// Router
// ----------------------------------------------------

let isContentLoaded = false;

async function render() {
  const app = document.getElementById('app');
  const path = window.location.pathname;

  if (!isContentLoaded) {
    await loadContent();
    isContentLoaded = true;
  }

  if (path.startsWith('/post/')) {
    const slug = path.split('/post/')[1];
    const post = postsList.find(p => p.slug === slug);
    if (post) {
      app.innerHTML = PostView(post);
      window.scrollTo(0, 0);
      return;
    }
  }

  // Default to Home
  app.innerHTML = `
    ${Header(headerData)}
    ${ProjectsSection(projectsList)}
    ${BlogListSection(postsList)}
  `;
}

// Simple client-side navigation
window.navigateTo = (url) => {
  window.history.pushState({}, '', url);
  render();
};

window.addEventListener('popstate', render);

document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/') && !link.getAttribute('target')) {
    e.preventDefault();
    window.navigateTo(link.getAttribute('href'));
  }
});

// Initial render
render();

// Toggle functional setup
function initThemeToggle() {
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (!themeToggleBtn) return;

  if (document.documentElement.classList.contains('dark')) {
    themeToggleLightIcon.classList.remove('hidden');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
  }

  themeToggleBtn.addEventListener('click', function () {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  });
}

initThemeToggle();
