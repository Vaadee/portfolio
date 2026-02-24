import { marked } from '../lib/markdown.js';

export const ProjectsSection = (projects) => `
  <section class="animate-fade-in mb-16 max-w-3xl mx-auto">
    <ul class="space-y-4">
      ${projects
        .map((p) => {
          const externalIcon = p.url
            ? '<svg class="inline-block w-4 h-4 ml-1.5 -mt-1 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span class="sr-only">(opens in a new tab)</span>'
            : '';

          const actionText = p.url
            ? `
          <div class="mt-4 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
            View project
            <svg class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
            `
            : '';

          const innerContent = `
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
            ${p.title}${externalIcon}
          </h3>
          <div class="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed prose prose-gray prose-p:my-0 max-w-none dark:prose-invert">
            ${marked.parse(p.content.trim())}
          </div>
          ${actionText}
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
