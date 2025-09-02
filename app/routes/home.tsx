import type { Route } from "./+types/home"

import { Link } from "react-router"
import { getAllPostsMeta } from "../lib/posts.server"

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
      <section>
        <h2 className="font-bold">about</h2>
        <p className="mt-6">hi, it's me!</p>
        <ul className="flex gap-4">
          {links.map((link, i) => (
            <li key={i}>
              <a
                className="text-blue-700 hover:underline underline-offset-2"
                href={link.url}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-18">
        <h2 className="font-bold">blog</h2>
        <ul className="mt-6">
          {loaderData.posts.slice(0, 5).map((p) => (
            <li className="mt-6" key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="text-blue-700 hover:underline underline-offset-2"
              >
                {p.title.toLowerCase()}
              </Link>
              <p>{p.description?.toLowerCase()}</p>
              <time className="block text-slate-500">{p.date}</time>
            </li>
          ))}
        </ul>
        <Link
          to="/blog"
          className="inline-block text-blue-700 hover:underline underline-offset-2 mt-6"
        >
          view all →
        </Link>
      </section>

      <p className="mt-18">
        <small className="text-base">
          this site doesn't store any logs, including any kind of cookies
        </small>
      </p>
    </>
  )
}

const links = [
  {
    name: "bluesky",
    url: "https://bsky.app/profile/m12u.bsky.social",
  },
  {
    name: "mastodon",
    url: "https://mastodon.social/@mochachocomaru",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/mochachocomaru/",
  },
  {
    name: "twitter",
    url: "https://x.com/mochachocomaru/",
  },
]
