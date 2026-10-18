import * as Dialog from "@radix-ui/react-dialog";
import { UserRound, X } from "lucide-react";
import type { ReactNode } from "react";
import { portraits } from "@/lib/community";
import { useDemo } from "./demo-state";
import { cn } from "@/lib/utils";

export function Avatar({
  id,
  initials,
  size = "md",
  className,
  photo: previewPhoto,
}: {
  id: string;
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  photo?: string;
}) {
  const { profile } = useDemo();
  const own = id === "jens-fischer";
  const photo = previewPhoto ?? (own ? profile.photo : portraits[id]);
  const s = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-14 w-14 text-base",
    xl: "h-24 w-24 text-2xl",
  }[size];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-foreground",
        s,
        className,
      )}
    >
      {photo ? (
        <img
          src={photo}
          alt=""
          loading="lazy"
          width={96}
          height={96}
          className="h-full w-full rounded-full object-cover"
        />
      ) : own ? (
        <UserRound className="h-1/2 w-1/2" aria-hidden="true" />
      ) : (
        initials
      )}
    </div>
  );
}

export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "solid" | "signal" | "outline";
}) {
  const t = {
    default: "bg-secondary text-secondary-foreground border-transparent",
    solid: "bg-primary text-primary-foreground border-transparent",
    signal: "border-signal/40 text-signal bg-transparent",
    outline: "border-border text-muted-foreground bg-transparent",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-2 py-1 text-[10px] font-medium",
        t,
      )}
    >
      {children}
    </span>
  );
}

type BtnVariant = "primary" | "ghost" | "outline";
// Shared by Btn and by links that should look like buttons, so every CTA renders the same.
export function buttonClass(variant: BtnVariant = "primary", className?: string) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-border bg-card text-foreground hover:border-border-strong",
    ghost: "text-foreground hover:bg-secondary",
  }[variant];
  return cn(
    "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-sm px-3.5 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    v,
    className,
  );
}

export function Btn({
  children,
  variant = "primary",
  className,
  type = "button",
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button {...p} type={type} className={buttonClass(variant, className)}>
      {children}
    </button>
  );
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
      <span className="eyebrow">{children}</span>
      {right}
    </div>
  );
}

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-popover p-6 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98] data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            className,
          )}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Close
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Journey({ current }: { current: number }) {
  const names = ["Operator", "Builder", "Founder", "Backer"];
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
      {names.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          <span
            aria-current={i === current ? "step" : undefined}
            className={cn(
              i < current
                ? "text-muted-foreground"
                : i === current
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground/50",
            )}
          >
            {n}
            {i < current && " ✓"}
          </span>
          {i < 3 && <span className="text-muted-foreground/40">——</span>}
        </span>
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  sub,
  size = "lg",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  size?: "lg" | "sm";
}) {
  return (
    <header className={cn("animate-rise", size === "lg" ? "mb-12" : "mb-10")}>
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h1
        className={cn(
          "display max-w-4xl",
          size === "lg" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
        )}
      >
        {title}
      </h1>
      {sub && <p className="mt-4 max-w-xl text-lg text-muted-foreground">{sub}</p>}
    </header>
  );
}
