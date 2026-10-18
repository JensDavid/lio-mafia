import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    "/home",
    "/network",
    "/network/people",
    "/network/requests",
    "/network/requests/scaling-supabase",
    "/network/events",
    "/network/jens-fischer",
    "/build",
    "/build/matchmaker",
    "/build/track",
    "/build/launchpad",
    "/build/launchpad/stack",
    "/build/launchpad/legal",
    "/build/launchpad/customers",
    "/build/launchpad/capital",
    "/profile/edit",
    "/saved",
    "/settings",
  ])("resolves the product page %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.params).not.toHaveProperty("_splat");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
