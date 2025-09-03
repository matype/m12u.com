import type { Route } from "./+types/posts.$slug"
import { getPostHtml } from "../lib/posts.server"
import { siteConfig } from "react-router.config"

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostHtml(params.slug)
  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }
  return { post }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.post.title} | ${siteConfig.name}` },
    { name: "description", content: data.post.description },
  ]
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData
  return (
    <article className="mt-12">
      <time className="text-gray-500">{post.date}</time>
      <div
        className="m12u-markdown"
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      />
    </article>
  )
}
