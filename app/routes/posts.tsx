import type { Route } from "./+types/posts"
import { Link } from "react-router"
import { getAllPostsMeta } from "../lib/posts.server"
import { siteConfig } from "react-router.config"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `All posts | ${siteConfig.name}` },
    { name: "description", content: "mochachocomaru's website" },
  ]
}

export function loader() {
  return { posts: getAllPostsMeta() }
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="font-bold">All Posts</h1>
      <ul className="mt-6">
        {loaderData.posts.map((p) => (
          <li className="mt-6" key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="text-blue-700 hover:underline underline-offset-2"
            >
              {p.title}
            </Link>
            <time className="block text-slate-500">{p.date}</time>
          </li>
        ))}
      </ul>
    </>
  )
}
