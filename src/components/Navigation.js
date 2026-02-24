import { getPath } from '../lib/markdown.js';

export const NavTabs = (currentPath) => `
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

export function updateThemeIcon() {
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
