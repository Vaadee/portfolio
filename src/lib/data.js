import fm from 'front-matter';
import siteConfig from '../content/site.json';

// We leverage Vite's import.meta.glob to load all markdown files at build/runtime
const postFiles = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
});
const projectFiles = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
});
const headerFile = import.meta.glob('../content/header.md', {
  query: '?raw',
  import: 'default',
});

// Centralized state container
export const state = {
  headerData: {},
  projectsList: [],
  postsList: [],
};

// Expose config for other modules
export { siteConfig };

/**
 * Fetch and parse all markdown content
 */
export async function loadContent() {
  document.title = siteConfig.siteTitle || 'Portfolio';

  // Load Header
  const rawHeader = await headerFile['../content/header.md']();
  const parsedHeader = fm(rawHeader);
  state.headerData = { ...parsedHeader.attributes, content: parsedHeader.body };

  // Load Projects
  for (const path in projectFiles) {
    const rawProject = await projectFiles[path]();
    const parsedProject = fm(rawProject);
    state.projectsList.push({
      ...parsedProject.attributes,
      content: parsedProject.body,
    });
  }
  state.projectsList.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Load Posts
  for (const path in postFiles) {
    const rawPost = await postFiles[path]();
    const parsedPost = fm(rawPost);
    const slug = path.split('/').pop().replace(/\.md$/, '');
    state.postsList.push({
      slug,
      ...parsedPost.attributes,
      content: parsedPost.body,
    });
  }
  state.postsList.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    if (a.placement && !b.placement) {
      return a.placement === 'before' ? -1 : 1;
    }
    if (!a.placement && b.placement) {
      return b.placement === 'before' ? 1 : -1;
    }
    return (a.order || 0) - (b.order || 0);
  });
}
