import './style.css';
import { siteConfig } from './lib/data.js';
import { initAnalytics } from './lib/analytics.js';
import { initRouter } from './router.js';

// Setup Google Analytics
initAnalytics(siteConfig);

// Initialize application routing and UI
initRouter();
