export interface WordPressPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  formattedDate: string;
  author: string;
  category: string;
  readTime: string;
  featuredImage: string;
  featuredImageAlt: string;
}

function calculateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function sanitizeHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z0-9#]+;/gi, ' ').trim();
}

function formatPostDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-PK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Karachi',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export class WordPressService {
  private static getApiUrl(): string {
    const url = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.pakpetrolprice.pk/wp-json/wp/v2';
    return url.replace(/\/$/, '');
  }

  /**
   * Fetches latest posts strictly from Headless WordPress.
   * Zero-build architecture: cached on edge for 60 seconds with on-demand webhook invalidation.
   * No sample or mock posts are included.
   */
  static async getPosts(limit: number = 10): Promise<WordPressPost[]> {
    const apiUrl = this.getApiUrl();

    try {
      const endpoint = `${apiUrl}/posts?_embed&per_page=${limit}`;
      const response = await fetch(endpoint, {
        next: { revalidate: 60, tags: ['posts'] },
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        console.warn(`[WordPress] API returned status ${response.status}`);
        return [];
      }

      const wpPosts = await response.json();
      if (!Array.isArray(wpPosts)) {
        return [];
      }

      return wpPosts.map((post: any): WordPressPost => {
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
        const terms = post._embedded?.['wp:term']?.[0];
        const author = post._embedded?.['author']?.[0]?.name || 'Pak Petrol Price';
        const rawContent = post.content?.rendered || '';

        return {
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || 'Untitled Article',
          excerpt: sanitizeHtml(post.excerpt?.rendered || '').slice(0, 220) + (post.excerpt?.rendered ? '...' : ''),
          content: rawContent,
          date: post.date,
          formattedDate: formatPostDate(post.date),
          author,
          category: terms?.[0]?.name || 'Market News',
          readTime: calculateReadTime(rawContent),
          featuredImage:
            featuredMedia?.source_url ||
            'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
          featuredImageAlt: featuredMedia?.alt_text || post.title?.rendered || 'Fuel market article',
        };
      });
    } catch (error) {
      console.warn('[WordPress] Failed to connect to WordPress CMS API:', error);
      return [];
    }
  }

  /**
   * Fetches a single post by slug strictly from Headless WordPress.
   */
  static async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const apiUrl = this.getApiUrl();

    try {
      const endpoint = `${apiUrl}/posts?_embed&slug=${encodeURIComponent(slug)}`;
      const response = await fetch(endpoint, {
        next: { revalidate: 60, tags: ['posts', `post-${slug}`] },
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return null;
      }

      const wpPosts = await response.json();
      if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
        return null;
      }

      const post = wpPosts[0];
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const terms = post._embedded?.['wp:term']?.[0];
      const author = post._embedded?.['author']?.[0]?.name || 'Pak Petrol Price';
      const rawContent = post.content?.rendered || '';

      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || 'Untitled Article',
        excerpt: sanitizeHtml(post.excerpt?.rendered || '').slice(0, 220) + '...',
        content: rawContent,
        date: post.date,
        formattedDate: formatPostDate(post.date),
        author,
        category: terms?.[0]?.name || 'Market News',
        readTime: calculateReadTime(rawContent),
        featuredImage:
          featuredMedia?.source_url ||
          'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: featuredMedia?.alt_text || post.title?.rendered || 'Fuel market article',
      };
    } catch (error) {
      console.warn(`[WordPress] Error fetching post slug "${slug}":`, error);
      return null;
    }
  }

  /**
   * Retrieves all slugs strictly from live WordPress for static generation.
   */
  static async getAllSlugs(): Promise<string[]> {
    const posts = await this.getPosts(50);
    return posts.map(p => p.slug);
  }
}
