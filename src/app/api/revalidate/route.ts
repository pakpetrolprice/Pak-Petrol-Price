import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-Demand Revalidation Webhook for Headless WordPress CMS
 * 
 * When a post is published, updated, or deleted in WordPress, WordPress triggers this webhook:
 * POST /api/revalidate
 * Body: { "secret": "...", "slug": "optional-post-slug", "path": "/blog" }
 * 
 * Or via GET for easy testing:
 * GET /api/revalidate?secret=...&slug=...
 * 
 * Result:
 * Instantly invalidates the cache without triggering a full Netlify build or using any build minutes.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const secret = body.secret || request.nextUrl.searchParams.get('secret');
    const slug = body.slug || request.nextUrl.searchParams.get('slug');
    const path = body.path || request.nextUrl.searchParams.get('path');

    const expectedSecret = process.env.REVALIDATION_SECRET_TOKEN || 'ppp_revalidate_secret_2026';

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid revalidation secret token' }, { status: 401 });
    }

    // Invalidate the post tag collection across the whole app (Next.js 16 profile/expire signature)
    revalidateTag('posts', { expire: 0 });

    // Invalidate blog archive and homepage
    revalidatePath('/blog');
    revalidatePath('/');

    // If specific slug is targeted, invalidate that post route too
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidateTag(`post-${slug}`, { expire: 0 });
    }

    if (path && path !== '/blog' && path !== '/') {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      invalidated: {
        tags: ['posts', slug ? `post-${slug}` : null].filter(Boolean),
        paths: ['/blog', '/', slug ? `/blog/${slug}` : null, path].filter(Boolean),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err?.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
