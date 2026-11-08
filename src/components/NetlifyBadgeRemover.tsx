'use client';

import { useEffect } from 'react';

/**
 * NetlifyBadgeRemover
 * Proactively observes the DOM and removes any Netlify badges, drawers,
 * feedback widgets, or injected promotional elements.
 */
export function NetlifyBadgeRemover() {
  useEffect(() => {
    function purgeNetlifyElements() {
      const selectors = [
        'site-badge',
        'netlify-badge',
        'netlify-drawer',
        '#netlify-drawer',
        '#netlify-badge',
        '[data-netlify-drawer]',
        '[data-netlify-badge]',
        '[id*="netlify"]',
        '[class*="netlify"]',
        '[class*="site-badge"]',
        'iframe[src*="netlify"]',
        'iframe[id*="netlify"]',
        'div[data-netlify-badge]',
        'div[id*="netlify"]',
        'div[class*="netlify"]',
        'a[href*="netlify.com/?utm_campaign"]',
        'a[href*="netlify.new/?utm_campaign"]',
        'a[href*="netlify.com"][class*="badge"]',
        'div[style*="z-index: 2147483647"]',
        'div[style*="z-index: 999999"]',
        'div[style*="z-index: 1000000"]',
      ];

      try {
        const found = document.querySelectorAll(selectors.join(', '));
        found.forEach((el) => {
          el.remove();
        });

        // Scan any iframes or fixed widgets at bottom
        document.querySelectorAll('iframe, aside, div').forEach((el) => {
          const outer = (el.outerHTML || '').toLowerCase();
          if (outer.includes('powered by netlify') || outer.includes('netlify.com/?utm_campaign')) {
            el.remove();
          }
        });
      } catch {
        // Safe failover
      }
    }

    // Run immediately
    purgeNetlifyElements();

    // Fast interval sweep for the first 5 seconds to catch late edge injections
    const interval = setInterval(purgeNetlifyElements, 150);
    const timeout = setTimeout(() => clearInterval(interval), 6000);

    // Observe documentElement (catches elements added outside document.body)
    const observer = new MutationObserver(() => {
      purgeNetlifyElements();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return null;
}

