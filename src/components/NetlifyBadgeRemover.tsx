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
        '#netlify-drawer',
        '[data-netlify-drawer]',
        'netlify-drawer',
        '.netlify-badge',
        '[class*="netlify-badge"]',
        '[id*="netlify-badge"]',
        '[id*="netlify-drawer"]',
        '[class*="netlify-drawer"]',
        'iframe[src*="netlify"]',
        'iframe[id*="netlify"]',
        'div[data-netlify-badge]',
        'a[href*="netlify.com/?utm_campaign"]',
        'a[href*="netlify.new/?utm_campaign"]',
        'a[href*="netlify.com"][class*="badge"]',
      ];

      try {
        const found = document.querySelectorAll(selectors.join(', '));
        found.forEach((el) => {
          el.remove();
        });
      } catch {
        // Safe failover
      }
    }

    // Run immediately on mount
    purgeNetlifyElements();

    // Observe any delayed script injections
    const observer = new MutationObserver(() => {
      purgeNetlifyElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
