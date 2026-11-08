import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WordPressService } from '@/lib/wordpress';

export const revalidate = 60; // Auto-revalidates every 60s + on-demand webhook invalidation
export const dynamicParams = true; // Allows newly published WordPress posts to render on demand

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await WordPressService.getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await WordPressService.getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Pak Petrol Price`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await WordPressService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pak Petrol Price',
      url: 'https://pakpetrolprice.pk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pakpetrolprice.pk/opengraph-image',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pakpetrolprice.pk/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8 w-full">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600 transition">
            Market Insights
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs font-bold">
            {post.category}
          </span>
        </div>

        {/* Header Section */}
        <header className="space-y-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Byline & Date */}
          <div className="flex items-center justify-between gap-4 pt-2 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {post.author}
              </span>
            </div>
            <div>
              <span>Published: {post.formattedDate}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-4
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 dark:prose-headings:text-white
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200/60 dark:prose-h2:border-slate-800/60 prose-h2:pb-2
            prose-h3:text-lg sm:prose-h3:text-xl
            prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-950 dark:prose-strong:text-white
            prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back Link & Disclaimer */}
        <footer className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 block font-mono">
              Editorial &amp; Regulatory Note
            </span>
            <p>
              This publication is prepared by the Pak Petrol Price research team. Verified statutory retail prices are governed by the Federal Ministry of Energy and OGRA.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 transition"
            >
              <span>← Back to all Insights &amp; Articles</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              <span>Check Live Fuel Rates →</span>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
