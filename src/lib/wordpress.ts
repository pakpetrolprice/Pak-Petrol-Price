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

// Fallback high-authority editorial market insights when WordPress is offline or pending initial setup
export const SAMPLE_POSTS: WordPressPost[] = [
  {
    id: 1,
    slug: 'how-ogra-calculates-fuel-prices-in-pakistan',
    title: 'How OGRA Calculates Petrol & Diesel Prices in Pakistan: The Complete Formula',
    excerpt: 'A comprehensive breakdown of the fortnightly pricing mechanism, Inland Freight Equalization Margin (IFEM), Petroleum Development Levy (PDL), and OMC margins.',
    content: `
      <h2>The Mechanics of Fortnightly Petroleum Pricing</h2>
      <p>Every fortnight on the 15th and last day of the calendar month, the Oil & Gas Regulatory Authority (OGRA) in coordination with the Federal Ministry of Energy (Petroleum Division) announces revised ex-depot sale prices for petroleum products across Pakistan.</p>
      
      <p>While the announcements frequently dominate the news cycle, the underlying mathematical framework is governed by strict statutory rules including the Petroleum Products (Petroleum Development Levy) Ordinance and OGRA regulatory guidelines.</p>

      <h3>1. Base Import Parity Price (Ex-Refinery Benchmark)</h3>
      <p>Pakistan imports approximately 70% of its motor gasoline (petrol) and finished high-speed diesel, alongside crude oil refined domestically by PARCO, NRL, PRL, and Cynergico. The pricing starts with the Arab Gulf Mean FOB pricing reported by Platts.</p>
      
      <p>This benchmark price is converted from USD per barrel to PKR per litre utilizing the weighted average exchange rate established by the State Bank of Pakistan over the preceding pricing cycle.</p>

      <h3>2. Inland Freight Equalization Margin (IFEM)</h3>
      <p>The IFEM is a regulatory equalization pool managed by OGRA to ensure that consumer fuel prices remain uniform across all geographic zones—from Karachi's ports to mountainous Gilgit-Baltistan and remote Balochistan. It absorbs transport differential costs by pipeline, rail, and road tankers.</p>

      <h3>3. Distribution & Marketing Margins</h3>
      <ul>
        <li><strong>Oil Marketing Companies (OMCs) Margin:</strong> Regulated allowance for storage infrastructure, terminal operation, and logistics.</li>
        <li><strong>Dealers' Margin:</strong> Commission granted to petrol pump owners and filling station operators per litre sold.</li>
      </ul>

      <h3>4. Government Taxes: PDL & Sales Tax</h3>
      <p>Currently, the Petroleum Development Levy (PDL) serves as a primary non-tax revenue stream for the Federal Government under IMF fiscal consolidation commitments, capped under annual Finance Acts up to Rs. 70 per litre.</p>
    `,
    date: '2026-10-25T12:00:00Z',
    formattedDate: '25 October 2026',
    author: 'Energy Research Desk',
    category: 'Regulatory Policy',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Oil Refinery in Pakistan',
  },
  {
    id: 2,
    slug: 'impact-of-global-brent-crude-on-pakistan-rupee-inflation',
    title: 'Global Brent Crude Fluctuations & Their Direct Impact on Pakistani Inflation',
    excerpt: 'Analyzing the transmission channel between international commodity markets, import bill pressure, and headline CPI inflation in Pakistan.',
    content: `
      <h2>The Energy-Inflation Transmission Mechanism</h2>
      <p>In Pakistan, energy commodities represent the single largest component of the national import bill. Fluctuations in international crude oil prices (Brent and Arab Light) transmit directly into the domestic economy through transportation fares, agriculture machinery, electricity tariffs, and industrial supply chains.</p>

      <h3>Direct vs Indirect Inflationary Channels</h3>
      <p>When international crude rises by $5 per barrel, Pakistan's fortnightly consumer price increases by approximately Rs. 4 to 6 per litre, depending on the prevailing USD/PKR exchange rate. This generates two distinct waves of inflation:</p>

      <ul>
        <li><strong>Direct Impact:</strong> Immediate increase in the transport sub-index of the Consumer Price Index (CPI), which carries an approximate 6% weight in the national basket.</li>
        <li><strong>Indirect Impact:</strong> Secondary price adjustments across vegetables, dairy, industrial goods, and freight logistics that rely on diesel-powered haulage.</li>
      </ul>

      <h3>The Role of Exchange Rate Hedging</h3>
      <p>Because petroleum imports are denominated in US Dollars, domestic prices can escalate even when global oil prices remain flat if the Pakistani Rupee experiences depreciation against the dollar. Understanding this dual exposure is critical for fiscal policy planners and commercial fleet operators.</p>
    `,
    date: '2026-10-20T09:30:00Z',
    formattedDate: '20 October 2026',
    author: 'Macroeconomics Team',
    category: 'Market Analysis',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Global crude oil logistics and tankers',
  },
  {
    id: 3,
    slug: 'euro-5-fuel-standards-pakistan-refineries-transition',
    title: 'Euro-5 Fuel Standards in Pakistan: Cleaner Emissions & Vehicle Engine Longevity',
    excerpt: 'How Pakistan transitioned from high-sulfur Euro-2 fuels to clean Euro-5 standards and what it means for modern vehicle performance.',
    content: `
      <h2>The Transition to Ultra-Low Sulfur Fuels</h2>
      <p>Pakistan officially transitioned imported motor gasoline and high-speed diesel to Euro-5 specifications in 2020–2021, moving away from archaic high-sulfur Euro-2 standards that had contributed substantially to winter smog in urban hubs like Lahore and Faisalabad.</p>

      <h3>Why Sulfur Content Matters</h3>
      <p>The defining distinction between Euro-2 and Euro-5 lies in sulfur concentration:</p>
      <ul>
        <li><strong>Euro-2 Fuel:</strong> Contained up to 500 parts per million (ppm) of sulfur in petrol and up to 5,000 ppm in diesel.</li>
        <li><strong>Euro-5 Fuel:</strong> Strictly limits sulfur to a maximum of 10 ppm for both petrol and diesel.</li>
      </ul>

      <h3>Benefits for Modern Engines</h3>
      <p>Modern EFI engines and catalytic converters are designed specifically for low-sulfur fuels. High sulfur rapidly poisons catalytic converters, triggers engine check lights, clogs fuel injectors, and reduces fuel efficiency by up to 8%.</p>

      <p>With nationwide Euro-5 compliance, vehicles achieve cleaner combustion, extended engine life, and lower maintenance costs over their operating lifecycle.</p>
    `,
    date: '2026-10-14T14:15:00Z',
    formattedDate: '14 October 2026',
    author: 'Automotive & Technical Desk',
    category: 'Fuel Technology',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1527018607616-0526648e861c?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Fuel pump nozzle filling high efficiency vehicle',
  },
];

function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
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
  private static getApiUrl(): string | null {
    const url = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.pakpetrolprice.pk/wp-json/wp/v2';
    if (!url || url.includes('your-wordpress-site')) {
      return null;
    }
    return url.replace(/\/$/, '');
  }

  /**
   * Fetches latest posts from Headless WordPress with ISR caching.
   * Zero-build architecture: cached on edge for 60 seconds with on-demand webhook invalidation.
   */
  static async getPosts(limit: number = 10): Promise<WordPressPost[]> {
    const apiUrl = this.getApiUrl();

    if (!apiUrl) {
      return SAMPLE_POSTS.slice(0, limit);
    }

    try {
      const endpoint = `${apiUrl}/posts?_embed&per_page=${limit}`;
      const response = await fetch(endpoint, {
        next: { revalidate: 60, tags: ['posts'] },
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        console.warn(`[WordPress] API returned status ${response.status}, falling back to sample posts.`);
        return SAMPLE_POSTS.slice(0, limit);
      }

      const wpPosts = await response.json();
      if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
        return SAMPLE_POSTS.slice(0, limit);
      }

      const livePosts = wpPosts.map((post: any): WordPressPost => {
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
        const terms = post._embedded?.['wp:term']?.[0];
        const author = post._embedded?.['author']?.[0]?.name || 'PakPetrolPrice Editorial';
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
          category: terms?.[0]?.name || 'Market Analysis',
          readTime: calculateReadTime(rawContent),
          featuredImage:
            featuredMedia?.source_url ||
            'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
          featuredImageAlt: featuredMedia?.alt_text || post.title?.rendered || 'Fuel market article',
        };
      });

      // If live WordPress has fewer posts than requested limit, append sample guides so grid is complete
      if (livePosts.length < limit) {
        const remainingNeeded = limit - livePosts.length;
        const liveSlugs = new Set(livePosts.map(p => p.slug));
        const filler = SAMPLE_POSTS.filter(s => !liveSlugs.has(s.slug)).slice(0, remainingNeeded);
        return [...livePosts, ...filler];
      }

      return livePosts.slice(0, limit);
    } catch (error) {
      console.warn('[WordPress] Failed to connect to API, using fallback data:', error);
      return SAMPLE_POSTS.slice(0, limit);
    }
  }

  /**
   * Fetches single post by slug with zero-build on-demand ISR.
   */
  static async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const apiUrl = this.getApiUrl();

    if (!apiUrl) {
      const found = SAMPLE_POSTS.find(p => p.slug === slug);
      return found || null;
    }

    try {
      const endpoint = `${apiUrl}/posts?_embed&slug=${encodeURIComponent(slug)}`;
      const response = await fetch(endpoint, {
        next: { revalidate: 60, tags: ['posts', `post-${slug}`] },
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const fallback = SAMPLE_POSTS.find(p => p.slug === slug);
        return fallback || null;
      }

      const wpPosts = await response.json();
      if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
        const fallback = SAMPLE_POSTS.find(p => p.slug === slug);
        return fallback || null;
      }

      const post = wpPosts[0];
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const terms = post._embedded?.['wp:term']?.[0];
      const author = post._embedded?.['author']?.[0]?.name || 'Editorial Team';
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
        category: terms?.[0]?.name || 'Market Analysis',
        readTime: calculateReadTime(rawContent),
        featuredImage:
          featuredMedia?.source_url ||
          'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: featuredMedia?.alt_text || post.title?.rendered || 'Fuel market article',
      };
    } catch (error) {
      console.warn(`[WordPress] Error fetching post slug "${slug}":`, error);
      const fallback = SAMPLE_POSTS.find(p => p.slug === slug);
      return fallback || null;
    }
  }

  /**
   * Retrieves all slugs for static generation.
   */
  static async getAllSlugs(): Promise<string[]> {
    const posts = await this.getPosts(50);
    return posts.map(p => p.slug);
  }
}
