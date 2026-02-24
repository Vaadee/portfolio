/**
 * Google Analytics Setup
 * @param {Object} siteConfig The configuration object containing googleAnalyticsId
 */
export function initAnalytics(siteConfig) {
  if (siteConfig.googleAnalyticsId) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`;
    document.head.insertBefore(script1, document.head.firstChild);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${siteConfig.googleAnalyticsId}');
    `;
    document.head.insertBefore(script2, script1.nextSibling);
  }
}
