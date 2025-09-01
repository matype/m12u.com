import {
  index,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  ...prefix("blog", [
    index("routes/posts.tsx"),
    route(":slug", "routes/posts.$slug.tsx"),
  ]),
] satisfies RouteConfig
