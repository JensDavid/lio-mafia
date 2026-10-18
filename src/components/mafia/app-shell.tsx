import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAsk } from "./ask-mafia";
import { Btn } from "./primitives";
import { LioLogo } from "./lio-logo";
import { ProfileMenu } from "./profile-menu";

const NAV = [
  { to: "/home", label: "Home" },
  { to: "/network", label: "Network" },
  { to: "/build", label: "Build" },
  { to: "/playbooks", label: "Playbooks" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { open } = useAsk();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex min-h-20 max-w-[1360px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 md:px-12">
          <Link to="/home" aria-label="Lio Mafia home">
            <LioLogo />
          </Link>
          <nav
            aria-label="Main navigation"
            className="order-3 flex w-full gap-6 overflow-x-auto md:order-none md:w-auto md:flex-1 md:justify-end"
          >
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="border-b py-1.5 text-sm transition"
                activeProps={{ className: "text-foreground font-medium border-foreground" }}
                inactiveProps={{
                  className: "border-transparent text-muted-foreground hover:text-foreground",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Btn onClick={open} className="ml-auto h-10 gap-2 md:ml-0">
            <span className="animate-twinkle text-white">✦</span>{" "}
            <span className="hidden sm:inline">Ask the Mafia</span>
          </Btn>
          <ProfileMenu />
        </div>
      </header>
      <main className="mx-auto max-w-[1360px] px-6 pb-20 pt-10 md:px-12 md:pt-12">{children}</main>
    </div>
  );
}
