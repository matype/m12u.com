import type { Route } from "./+types/home"

import { Link } from "react-router"
import { getAllPostsMeta } from "./posts.server"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "m12u - mochachocomaru" },
    { name: "description", content: "mochachocomaru's website" },
  ]
}

export function loader() {
  return { posts: getAllPostsMeta() }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h2 className="mt-16 font-bold">about</h2>
      <p className="mt-4">hi, it's me!</p>
      <ul className="mt-8">
        {links.map((link, i) => (
          <li key={i}>
            <a
              className="text-blue-700 hover:underline underline-offset-2"
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 font-bold">blog</h2>
      <ul className="mt-4">
        {loaderData.posts.slice(0, 5).map((p) => (
          <li className="mt-4" key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="text-blue-700 hover:underline underline-offset-2"
            >
              {p.title.toLowerCase()}
            </Link>
            <p>{p.description}</p>
            <time className="block text-slate-500">{p.date}</time>
          </li>
        ))}
      </ul>
      <Link
        to="/blog"
        className="inline-block text-blue-700 hover:underline underline-offset-2 mt-8"
      >
        read all
      </Link>

      <p className="mt-24">
        this site doesn't store any logs, including any kind of cookies
      </p>
    </>
  )
}

const links = [
  {
    name: "X (Twitter)",
    url: "https://x.com/mochachocomaru/",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mochachocomaru/",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/m12u.bsky.social",
  },
]
