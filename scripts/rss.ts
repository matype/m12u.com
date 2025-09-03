import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import RSS from "rss"
import { siteConfig } from "react-router.config"

type PostFrontmatter = {
  title?: string
  description?: string
  date?: string | Date
}

const SITE_URL = `https://${siteConfig.domain}`
const CONTENT_DIR = path.join(process.cwd(), "app", "content")
const OUT_DIR = path.join(process.cwd(), "public")
const OUT_FILE = path.join(OUT_DIR, "rss.xml")

const isPostFile = (f: string) => /\.md?$/i.test(f)

function toDate(value: unknown): Date {
  if (value instanceof Date) return value
  if (typeof value === "string") {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}

function toSlug(filename: string): string {
  return filename.replace(/\.(md)$/i, "")
}

async function main() {
  const feed = new RSS({
    title: `m12u - ${siteConfig.name}`,
    description: `${siteConfig.description}`,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: "en",
  })

  const files = await fs.readdir(CONTENT_DIR)
  const postFiles = files.filter(isPostFile)

  const posts = await Promise.all(
    postFiles.map(async (file) => {
      const full = path.join(CONTENT_DIR, file)
      const raw = await fs.readFile(full, "utf-8")
      const parsed = matter(raw)
      const fm = parsed.data as PostFrontmatter
      const slug = toSlug(file)

      return {
        slug,
        title: fm.title ?? slug,
        description: fm.description ?? "",
        date: toDate(fm.date),
      }
    }),
  )

  posts
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .forEach((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`
      feed.item({
        title: p.title,
        description: p.description,
        url,
        guid: url,
        date: p.date,
      })
    })

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(OUT_FILE, feed.xml({ indent: true }), "utf-8")
  console.log(`✔ rss.xml written: ${OUT_FILE}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
