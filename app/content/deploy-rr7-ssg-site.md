---
title: Deploying a React Router v7 blog with full SSG to Cloudflare Pages
date: 2025-09-01
description: A personal walkthrough of building a full SSG blog with React Router v7 and deploying it to Cloudflare Pages.
---

# Deploying a React Router v7 blog with full SSG to Cloudflare Pages

[As mentioned in my previous post](./built-my-own-blog), this blog is built with React Router v7, statically generated, and deployed to CloudFlare Pages. I’m used to working with Next.js, and for that framework there are endless guides and examples. But when I searched for stories of people doing full SSG with React Router v7, I found almost nothing. That’s exactly why I thought I’d write down my own experience.

At first, I assumed it would be enough to just put prerender: true into react-router.config.ts. I expected the build to happily generate all my pages. It worked fine for static paths, but as soon as I tried to build my blog, which has dynamic routes like `/blog/:slug`, it failed. React Router simply won’t prerender parameterized routes with prerender: true.

The real solution was to define a `prerender()` function myself. Instead of asking React Router to “figure it out,” I had to return the exact list of URLs I wanted to generate. For my setup, the blog posts are just Markdown files in a folder, so I could scan that directory and turn each filename into a slug. The config ended up looking like this:

```
// react-router.config.ts
export default {
  ssr: false,
  async prerender() {
    const { readdir } = await import("node:fs/promises")
    const path = await import("node:path")
    const dir = path.join(process.cwd(), "app", "content")
    const files = await readdir(dir)

    const slugs = files
      .filter((f) => /\.md?$/i.test(f))
      .map((f) => f.replace(/\.(md)$/, ""))

    return ["/", "/blog", ...slugs.map((s) => `/blog/${s}`)]
  },
} satisfies Config
```

Once I made that change, the build finally produced exactly what I wanted: a build/client directory with an index.html for every blog post, along with the blog index and the homepage. Every route had a real file on disk, which meant I could deploy it anywhere as a plain static site.

From there, Cloudflare Pages made things super easy. I didn’t need `@cloudflare/vite-plugin` or any special server logic because everything was already prerendered. All I had to do was point Cloudflare to the right folder:

- Build command: `npm run build`
- Build output directory: `build/client`

That was literally it. After the deploy finished, I could visit the preview URL and open the homepage, the blog index, and each blog post directly. All of them were instantly served as static HTML.

Compared to Next.js, the path to get here felt less documented. There weren’t many examples online, which is exactly why I thought this was worth writing up. React Router v7 in framework mode is still young, but it’s already flexible enough to power a simple blog like this.

For me, the takeaway was simple: if you want to do full static generation with React Router v7, don’t just set `prerender: true`. Instead, write a `prerender()` function that returns the exact paths you need. Point Cloudflare Pages at build/client, and you’ve got a fast, CDN-backed blog without any servers involved.

It may not be as mainstream as Next.js yet, but I like the direction React Router is taking. My little blog is up and running now, and it feels good to know I had to figure it out myself—and that by sharing, maybe someone else will have an easier time.
