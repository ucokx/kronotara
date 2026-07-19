// ─────────────────────────────────────────────────────────────────
// app/root.tsx
// ─────────────────────────────────────────────────────────────────
// The root layout component — wraps all routes.
// Do NOT remove the <Meta>, <Links>, <Scripts>, <ScrollRestoration>
// components — they are required by React Router.
// ─────────────────────────────────────────────────────────────────

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

// ── SEO & Global Meta ─────────────────────────────────────────────
export const meta: Route.MetaFunction = () => [
  { title: "Kronotara — Geospatial Heatmap Platform" },
  {
    name: "description",
    content:
      "Kronotara is a geospatial heatmap platform built on Cloudflare, MapLibre GL, and Deck.gl.",
  },
];

// ── Link tags (stylesheets, fonts, etc.) ──────────────────────────
export const links: Route.LinksFunction = () => [
  // Preconnect to Google Fonts for faster loading
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  // Main stylesheet
  { rel: "stylesheet", href: stylesheet },
];

// ── Root Layout ───────────────────────────────────────────────────
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ── Default export: Renders nested routes via <Outlet> ─────────────
export default function App() {
  return <Outlet />;
}

// ── Error Boundary ─────────────────────────────────────────────────
// Catches errors from any route in the app.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{message}</h1>
      <p className="text-muted-foreground">{details}</p>
      {stack && (
        <pre className="w-full max-w-2xl overflow-auto rounded-lg bg-muted p-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
