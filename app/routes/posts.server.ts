import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import matter from "gray-matter"
import { marked } from "marked"
import { JSDOM } from "jsdom"
import DOMPurify from "dompurify"

const window = new JSDOM("").window
const purify = DOMPurify(window)

const CONTENT_DIR = join(process.cwd(), "app", "content")

function toISODateString(input: unknown): string {
  if (!input) return ""
  const d =
    input instanceof Date
      ? input
      : new Date(typeof input === "string" ? input : String(input))
  return Number.isNaN(d.getTime())
    ? String(input)
    : d.toISOString().slice(0, 10)
}

export type PostMeta = {
  slug: string
  title: string
  date: string
  description?: string
}

export function getAllSlugs(): string[] {
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = readFileSync(join(CONTENT_DIR, `${slug}.md`), "utf8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: toISODateString(data.date) ?? "",
        description: data.description ?? "",
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostHtml(slug: string) {
  const raw = readFileSync(join(CONTENT_DIR, `${slug}.md`), "utf8")
  const { data, content } = matter(raw)
  const html = purify.sanitize(await marked.parse(content))
  return {
    slug,
    title: data.title ?? slug,
    date: toISODateString(data.date) ?? "",
    description: data.description ?? "",
    html,
  }
}
