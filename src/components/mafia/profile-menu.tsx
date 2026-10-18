import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Avatar, Btn } from "./primitives";
import { useDemo } from "./demo-state";
export function ProfileMenu() {
  const { profile } = useDemo();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Btn variant="ghost" aria-label="Open profile menu" className="gap-2 px-1">
          <Avatar id="jens-fischer" initials="JF" size="md" />
          <ChevronDown className="h-3 w-3" />
        </Btn>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          align="end"
          sideOffset={14}
          className="z-50 min-w-60 rounded-md border border-border bg-popover p-2 text-sm"
        >
          <div className="px-3 py-3">
            <div className="font-medium">{profile.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">{profile.role}</p>
          </div>
          <Dropdown.Separator className="my-1 h-px bg-border" />
          {(
            [
              {
                to: "/network/$memberId",
                params: { memberId: "jens-fischer" },
                label: "View profile",
              },
              { to: "/profile/edit", label: "Edit founder profile" },
              { to: "/build/matchmaker", label: "My projects" },
              {
                to: "/network/requests",
                search: { mine: true, compose: false },
                label: "My requests",
              },
              { to: "/saved", label: "Saved" },
            ] as const
          ).map((item) => (
            <Dropdown.Item key={item.label} asChild>
              <Link
                to={item.to}
                {...("params" in item ? { params: item.params } : {})}
                {...("search" in item ? { search: item.search } : {})}
                className="block rounded-sm px-3 py-2 outline-none focus:bg-secondary"
              >
                {item.label}
              </Link>
            </Dropdown.Item>
          ))}
          <Dropdown.Separator className="my-1 h-px bg-border" />
          <Dropdown.Item asChild>
            <Link to="/" className="block rounded-sm px-3 py-2 outline-none focus:bg-secondary">
              Sign out
            </Link>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
