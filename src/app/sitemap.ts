import { MetadataRoute } from 'next';
import { WordPressService } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pakpetrolprice.pk';
  const currentDate = new Date().toISOString();

  const staticRoutes: Array<{
    route: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> = [
    { route: '', changeFrequency: 'daily', priority: 1.0 },
    { route: '/petrol-price-in-pakistan', changeFrequency: 'daily', priority: 0.95 },
    { route: '/diesel-price-in-pakistan', changeFrequency: 'daily', priority: 0.95 },
    { route: '/hi-octane-price-in-pakistan', changeFrequency: 'daily', priority: 0.9 },
    { route: '/kerosene-oil-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/light-diesel-oil-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/lpg-price-in-pakistan', changeFrequency: 'daily', priority: 0.85 },
    { route: '/petrol-calculator', changeFrequency: 'weekly', priority: 0.9 },
    { route: '/petrol-price-history', changeFrequency: 'daily', priority: 0.85 },
    { route: '/diesel-price-history', changeFrequency: 'daily', priority: 0.85 },
    { route: '/fuel-price-changes', changeFrequency: 'daily', priority: 0.85 },
    { route: '/blog', changeFrequency: 'daily', priority: 0.85 },
    { route: '/advertise', changeFrequency: 'monthly', priority: 0.7 },
    { route: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { route: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { route: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
    { route: '/terms-and-conditions', changeFrequency: 'monthly', priority: 0.5 },
    { route: '/disclaimer', changeFrequency: 'monthly', priority: 0.5 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(item => ({
    url: `${baseUrl}${item.route}`,
    lastModified: currentDate,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  try {
    const postSlugs = await WordPressService.getAllSlugs();
    const blogEntries: MetadataRoute.Sitemap = postSlugs.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    return [...staticEntries, ...blogEntries];
  } catch {
    return staticEntries;
  }
}
