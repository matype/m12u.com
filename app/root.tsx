import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import { siteConfig } from "react-router.config"

import type { Route } from "./+types/root"
import "./app.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-white text-gray-900 text-base">
        <section className="mx-auto px-6 pt-18 pb-30 max-w-2xl">
          <header className="mb-18">
            <h1 className="font-bold">
              <Link to="/" className="hover:underline underline-offset-2">
                m12u - {siteConfig.name}
              </Link>
            </h1>
          </header>
          {children}
        </section>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main>
      <h1 className="font-bold">{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full mt-6 p-3 overflow-x-auto text-sm bg-gray-800 rounded-xl text-gray-50">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
