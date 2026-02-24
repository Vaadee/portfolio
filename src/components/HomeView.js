import { marked, getPath } from '../lib/markdown.js';
import { siteConfig } from '../lib/data.js';

const Header = (data) => `
  <header class="mb-8 text-center md:text-left">
    <h1 class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2">${data.name}</h1>
    <h2 class="text-lg text-gray-500 dark:text-gray-400 font-medium">${data.role}</h2>
    <div class="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl prose prose-gray prose-p:mt-0 max-w-none dark:prose-invert mx-auto md:mx-0">
      ${marked.parse(data.content)}
    </div>
  </header>
`;

export const HomeView = (headerData) => `
  <div class="flex-1 flex flex-col justify-center animate-fade-in w-full pb-24">
    <div class="flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
      <div class="flex-1 w-full max-w-3xl">
        ${Header(headerData)}
      </div>
      <div class="w-full md:w-1/3 shrink-0 flex justify-center md:justify-end">
        <div class="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-50 dark:bg-gray-800/40 flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden border border-gray-100 dark:border-gray-800 backdrop-blur-sm transition-all hover:shadow-sm">
          ${
            siteConfig.profileImage
              ? `<img src="${getPath(siteConfig.profileImage)}" alt="Profile/Caricature" class="w-full h-full object-cover" fetchpriority="high" loading="eager" />`
              : `<div class="text-center p-4">
                  <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="text-xs uppercase tracking-widest font-medium block">Caricature</span>
                </div>`
          }
        </div>
      </div>
    </div>
  </div>
`;
