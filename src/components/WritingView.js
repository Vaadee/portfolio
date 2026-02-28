import { marked, getPath, slugify } from '../lib/markdown.js';
import { siteConfig } from '../lib/data.js';

export const BlogListSection = (posts, activeTag, visiblePostsCount) => {
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
                .slice(0, visiblePostsCount)
                .map((post) => {
                  const url = post.externalUrl
                    ? post.externalUrl
                    : '/post/' + post.slug;
                  const target = post.externalUrl
                    ? 'target="_blank" rel="noopener noreferrer"'
                    : '';
                  const externalIcon = post.externalUrl
                    ? '<svg class="inline-block w-4 h-4 ml-1.5 -mt-1 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span class="sr-only">(opens in a new tab)</span>'
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

                  const actionText = `
  <div class="mt-4 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
    ${post.externalUrl ? 'Read external article' : 'Read article'}
    <svg class="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
  </div>
`;

                  const innerContent = `
  ${dateHtml}
  <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
    ${post.title}
    ${externalIcon}
  </h3>
  ${post.excerpt ? `<p class="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">${post.excerpt}</p>` : ''}
  ${tagsHtml}
  ${actionText}
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
      
      ${
        filteredPosts.length > visiblePostsCount
          ? `
      <div class="mt-8 text-center animate-fade-in">
        <button type="button" id="load-more-btn" class="px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600">
          Load More
        </button>
      </div>
      `
          : ''
      }
  </section>
  `;
};

export const PostView = (post) => {
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(post.content)) !== null) {
    const level = match[1].length;
    let textStr = match[2];
    const originalTextStr = textStr;
    textStr = textStr.replace(/\[\^.*?\]/g, ''); // Fix escaping for footnote regex
    textStr = textStr.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Fix escaping for link regex
    textStr = textStr.replace(/[*_`~]/g, ''); // Remove inline formatting
    textStr = textStr.trim();

    headings.push({
      level,
      text: textStr,
      id: slugify(originalTextStr),
    });
  }

  const tocHtml =
    headings.length > 0
      ? `
    <aside class="hidden xl:block w-56 absolute h-full left-1/2 ml-[400px] top-0 pt-6 shrink-0 transition-opacity z-10">
      <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide py-2">
        <h4 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">On this page</h4>
        <nav class="flex flex-col gap-[0.35rem] toc-nav border-l border-gray-100 dark:border-gray-800/60 pl-4">
          ${headings
            .map(
              (h) => `
            <a href="#${h.id}" data-target="${h.id}" class="text-[13px] leading-snug text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors toc-link ${h.level === 3 ? 'ml-3' : ''}">
              ${h.text}
            </a>
          `
            )
            .join('')}
        </nav>
      </div>
    </aside>
  `
      : '';

  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dateTimeStr = new Date(post.date).toISOString();
  const authorName = siteConfig.authorName || 'Author';

  return `
  <article class="animate-fade-in relative lg:mx-auto">
    <div class="max-w-3xl mx-auto w-full px-4 sm:px-0">
      <a href="/writing" class="inline-flex text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 items-center gap-2">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Writing
      </a>
      <header class="mb-10">
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 gap-2">
          <time datetime="${dateTimeStr}">${dateStr}</time>
          <span>&middot;</span>
          <span>${authorName}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">${post.title}</h1>
        ${post.heroImage ? `<img src="${getPath(post.heroImage)}" alt="${post.title}" class="w-full h-auto rounded-2xl shadow-sm mb-8 object-cover aspect-[2/1] md:aspect-video" />` : ''}
      </header>
      <div class="prose prose-gray max-w-none">
        ${marked.parse(post.content)}
      </div>
    </div>
    ${tocHtml}
  </article>
  `;
};
