import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { siteConfig } from "react-router.config"

type PostFrontmatter = {
  date?: string | Date
}

const SITE_URL = `https://${siteConfig.domain}`
const CONTENT_DIR = path.join(process.cwd(), "app", "content")
const OUT_DIR = path.join(process.cwd(), "public")
const OUT_FILE = path.join(OUT_DIR, "sitemap.xml")

const isPostFile = (f: string) => /\.md?$/i.test(f)

function toSlug(filename: string): string {
  return filename.replace(/\.(md)$/i, "")
}

function toDate(value: unknown): Date {
  if (value instanceof Date) return value
  if (typeof value === "string") {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}

async function main() {
  const urls: { loc: string; lastmod?: string }[] = []

  urls.push({ loc: `${SITE_URL}/` })
  urls.push({ loc: `${SITE_URL}/blog` })

  const files = await fs.readdir(CONTENT_DIR)
  for (const file of files.filter(isPostFile)) {
    const slug = toSlug(file)
    const full = path.join(CONTENT_DIR, file)
    const raw = await fs.readFile(full, "utf-8")
    const parsed = matter(raw)
    const fm = parsed.data as PostFrontmatter

    const date = toDate(fm.date)
    urls.push({
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod: date.toISOString(),
    })
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        return (
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
          `  </url>`
        )
      })
      .join("\n") +
    `\n</urlset>\n`

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(OUT_FILE, xml, "utf-8")
  console.log(`✔ sitemap.xml written: ${OUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
