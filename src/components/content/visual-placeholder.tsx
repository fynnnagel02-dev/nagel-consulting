import { cn } from "@/lib/utils/cn";

export function VisualPlaceholder({
  title,
  caption,
  eyebrow = "Vorschau",
  variant = "surface",
  className,
}: {
  title: string;
  caption: string;
  eyebrow?: string;
  variant?: "surface" | "wireframe" | "diagram";
  className?: string;
}) {
  const variants = {
    surface:
      "bg-[linear-gradient(155deg,_rgba(28,40,55,0.96),_rgba(36,51,69,0.94)_48%,_rgba(83,66,47,0.82))] text-white shadow-[var(--shadow-panel)]",
    wireframe:
      "bg-[linear-gradient(180deg,_rgba(255,253,249,0.98),_rgba(241,235,226,0.98))] text-[var(--color-text)] shadow-[var(--shadow-crisp)]",
    diagram:
      "bg-[linear-gradient(180deg,_rgba(251,248,242,1),_rgba(235,229,219,0.92))] text-[var(--color-text)] shadow-[var(--shadow-crisp)]",
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-[var(--color-border)]",
        variants[variant],
        className,
      )}
    >
      <div className="border-b border-white/10 px-6 py-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.32em] opacity-72">
          {eyebrow}
        </div>
      </div>
      <div className="space-y-6 p-6 sm:p-7">
        <div>
          <p className="text-sm font-medium opacity-72">{caption}</p>
          <h3 className="mt-2 font-display text-[2rem] leading-[0.95] sm:text-[2.2rem]">{title}</h3>
        </div>
        {variant === "surface" ? <SurfaceLines /> : null}
        {variant === "wireframe" ? <WireframeLines /> : null}
        {variant === "diagram" ? <DiagramLines /> : null}
      </div>
    </div>
  );
}

function SurfaceLines() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1.28fr,0.92fr]">
        <div className="rounded-[1.6rem] border border-white/12 bg-white/9 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-28 rounded-full bg-white/30" />
            <div className="rounded-full border border-white/14 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/68">
              Live
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-3">
              <div className="h-11 rounded-[1rem] bg-white/14" />
              <div className="h-11 rounded-[1rem] bg-white/10" />
              <div className="h-24 rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-3">
                <div className="h-2.5 w-16 rounded-full bg-white/24" />
                <div className="mt-4 grid gap-2">
                  <div className="h-7 rounded-[0.9rem] bg-white/10" />
                  <div className="h-7 rounded-[0.9rem] bg-white/14" />
                </div>
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-black/10 p-3">
              <div className="h-2.5 w-16 rounded-full bg-white/24" />
              <div className="mt-4 h-24 rounded-[1rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),rgba(255,255,255,0.06))]" />
              <div className="mt-3 grid gap-2">
                <div className="h-8 rounded-[0.95rem] bg-white/10" />
                <div className="h-8 rounded-[0.95rem] bg-white/14" />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-4">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-20 rounded-full bg-white/28" />
            <div className="h-2.5 w-2.5 rounded-full bg-[rgba(215,178,132,0.9)]" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-10 rounded-[1rem] bg-white/10" />
            <div className="h-24 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))]" />
            <div className="h-9 rounded-[1rem] bg-white/12" />
          </div>
        </div>
      </div>
      <div className="rounded-[1.6rem] border border-white/10 bg-white/7 p-4">
        <div className="grid gap-3 sm:grid-cols-[0.86fr,1.14fr]">
          <div className="h-24 rounded-[1rem] bg-white/10" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-24 rounded-[1rem] bg-white/14" />
            <div className="h-24 rounded-[1rem] bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WireframeLines() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[0.85fr,1.15fr]">
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4">
          <div className="h-3 w-16 rounded-full bg-[var(--color-border)]" />
          <div className="mt-4 space-y-2">
            <div className="h-9 rounded-[0.9rem] bg-[var(--color-background-alt)]" />
            <div className="h-9 rounded-[0.9rem] bg-[var(--color-background-alt)]" />
            <div className="h-9 rounded-[0.9rem] bg-[var(--color-background-alt)]" />
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4">
          <div className="h-3 w-24 rounded-full bg-[var(--color-border)]" />
          <div className="mt-4 h-28 rounded-[1rem] bg-[var(--color-background-alt)]" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="h-16 rounded-[1rem] bg-[var(--color-background-alt)]" />
            <div className="h-16 rounded-[1rem] bg-[var(--color-background-alt)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramLines() {
  return (
    <div className="grid gap-4 sm:grid-cols-[0.9fr,0.2fr,0.9fr,0.2fr,0.9fr]">
      <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4">
        <div className="h-3 w-20 rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[0.95rem] bg-[var(--color-background-alt)]" />
      </div>
      <div className="hidden items-center justify-center sm:flex">
        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>
      <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4">
        <div className="h-3 w-24 rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[0.95rem] bg-[var(--color-background-alt)]" />
      </div>
      <div className="hidden items-center justify-center sm:flex">
        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>
      <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4">
        <div className="h-3 w-[4.5rem] rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[0.95rem] bg-[var(--color-background-alt)]" />
      </div>
    </div>
  );
}
