import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/settings")({
  head: () => pageHead("Settings", "Settings now live in your founder profile."),
  beforeLoad: () => {
    throw redirect({ to: "/profile/edit" });
  },
});
