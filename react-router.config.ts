import type { Config } from "@react-router/dev/config"

export const siteConfig = {
  name: "mochachocomaru",
  domain: "m12u.com",
}

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: true,
} satisfies Config
