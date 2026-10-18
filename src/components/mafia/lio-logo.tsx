export function LioLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <img src="/lio-logo.svg" alt="Lio" className="h-8 w-auto shrink-0" />

      {showWordmark && (
        <>
          <span className="h-5 w-px bg-black/20" aria-hidden="true" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
            MAFIA
          </span>
        </>
      )}
    </div>
  );
}
