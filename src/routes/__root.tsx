import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { DemoProvider } from "@/components/mafia/demo-state";
import { Btn, buttonClass } from "@/components/mafia/primitives";
import { AskProvider } from "../components/mafia/ask-mafia";
import { AppShell } from "../components/mafia/app-shell";
import { useRouterState } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="py-16 md:py-24">
      <div>
        <div className="eyebrow">404 · Not found</div>
        <h1 className="display mt-4 text-6xl md:text-8xl">This page left the Mafia.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/home" className={buttonClass("primary", "mt-8 h-10 px-4")}>
          Back to Home →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center bg-background px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="eyebrow">Something went wrong</div>
        <h1 className="display mt-4 text-5xl md:text-7xl">This page didn't load.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">Try again, or head back to Home.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Btn
            className="h-10 px-4"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Btn>
          <a href="/home" className={buttonClass("outline", "h-10 px-4")}>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lio Mafia" },
      { name: "description", content: "The founder network for Lio operators and alumni." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isEntry = useRouterState({ select: (s) => s.location.pathname === "/" });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <DemoProvider>
        <AskProvider>
          {isEntry ? (
            <Outlet />
          ) : (
            <AppShell>
              <Outlet />
            </AppShell>
          )}
        </AskProvider>
      </DemoProvider>
    </QueryClientProvider>
  );
}
