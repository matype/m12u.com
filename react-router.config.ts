import type { Config } from "@react-router/dev/config"

export const siteConfig = {
  name: "mochachocomaru",
  domain: "m12u.com",
  description: "mochachocomaru's website",
}

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

    console.log("[prerender] slugs:", slugs)

    return ["/", "/blog", ...slugs.map((s) => `/blog/${s}`)]
  },
} satisfies Config
