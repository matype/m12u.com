import type { Route } from "./+types/posts"
import { Link } from "react-router"
import { getAllPostsMeta } from "./posts.server"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export function loader() {
  return { posts: getAllPostsMeta() }
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="mt-16 font-bold">All Posts</h1>
      <ul className="mt-4">
        {loaderData.posts.map((p) => (
          <li className="mt-4" key={p.slug}>
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
