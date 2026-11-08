import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { WordPressService, WordPressPost } from '@/lib/wordpress';

export const revalidate = 60; // Automatic ISR fallback every 60 seconds (Zero build required)

export const metadata: Metadata = {
  title: 'Pakistan Fuel Market Insights, OGRA Analysis & Petroleum News',
  description:
    'Authoritative analysis and news covering petrol prices in Pakistan, OGRA regulatory circulars, global Brent crude parity, and fuel economy guidance.',
  keywords: [
    'pakistan fuel news',
    'petrol price analysis pakistan',
    'ogra circular breakdown',
    'pakistan petroleum market insights',
    'fuel economy guide pakistan',
  ],
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await WordPressService.getPosts(12);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 w-full">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">
            Blog
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Articles &amp; News
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Blog
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Latest news, guides, and updates on petroleum pricing in Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-2">
          <p className="font-bold text-slate-900 dark:text-white text-base">
            No articles published yet
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Check back soon for the latest petroleum analysis, market insights, and regulatory announcements.
          </p>
        </div>
      )}

      {/* Featured Primary Story */}
      {featuredPost && (
        <section aria-label="Featured Story" className="w-full">
          <div className="group relative bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {/* Media image */}
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Story Details */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{featuredPost.formattedDate}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>By {featuredPost.author}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Analysis</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Secondary Stories */}
      {remainingPosts.length > 0 && (
        <section aria-label="Latest Articles" className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight">
              Latest Petroleum Dispatches &amp; Guides
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Showing {remainingPosts.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map(post => (
              <article
                key={post.slug || `${post.id}`}
                className="group bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-sm border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span>{post.formattedDate}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-bold text-slate-950 dark:text-white text-base tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read →</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
