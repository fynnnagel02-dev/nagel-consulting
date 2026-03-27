import { cn } from "@/lib/utils/cn";

export function VisualPlaceholder({
  title,
  caption,
  variant = "surface",
  className,
}: {
  title: string;
  caption: string;
  variant?: "surface" | "wireframe" | "diagram";
  className?: string;
}) {
  const variants = {
    surface:
      "bg-[linear-gradient(140deg,_rgba(47,74,103,0.95),_rgba(79,124,172,0.82))] text-white",
    wireframe:
      "bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(238,242,245,0.98))] text-[var(--color-text)]",
    diagram:
      "bg-[linear-gradient(180deg,_rgba(248,250,252,1),_rgba(238,242,245,1))] text-[var(--color-text)]",
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[32px] border border-[var(--color-border)]",
        variants[variant],
        className,
      )}
    >
      <div className="border-b border-white/10 px-6 py-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-80">
          Vorschau
        </div>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <p className="text-sm font-medium opacity-80">{caption}</p>
          <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
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
      <div className="grid gap-3 sm:grid-cols-[1.4fr,0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
          <div className="h-3 w-28 rounded-full bg-white/30" />
          <div className="mt-5 space-y-3">
            <div className="h-11 rounded-[18px] bg-white/14" />
            <div className="h-11 rounded-[18px] bg-white/12" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-20 rounded-[18px] bg-white/12" />
              <div className="h-20 rounded-[18px] bg-white/12" />
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
          <div className="h-3 w-20 rounded-full bg-white/30" />
          <div className="mt-5 space-y-3">
            <div className="h-8 rounded-full bg-white/12" />
            <div className="h-8 rounded-full bg-white/12" />
            <div className="h-8 rounded-full bg-white/12" />
          </div>
        </div>
      </div>
      <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-20 rounded-[18px] bg-white/12" />
          <div className="h-20 rounded-[18px] bg-white/12" />
          <div className="h-20 rounded-[18px] bg-white/12" />
        </div>
      </div>
    </div>
  );
}

function WireframeLines() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[0.85fr,1.15fr]">
        <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-4">
          <div className="h-3 w-16 rounded-full bg-[var(--color-border)]" />
          <div className="mt-4 space-y-2">
            <div className="h-9 rounded-[14px] bg-[var(--color-background-alt)]" />
            <div className="h-9 rounded-[14px] bg-[var(--color-background-alt)]" />
            <div className="h-9 rounded-[14px] bg-[var(--color-background-alt)]" />
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-4">
          <div className="h-3 w-24 rounded-full bg-[var(--color-border)]" />
          <div className="mt-4 h-28 rounded-[18px] bg-[var(--color-background-alt)]" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="h-16 rounded-[18px] bg-[var(--color-background-alt)]" />
            <div className="h-16 rounded-[18px] bg-[var(--color-background-alt)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramLines() {
  return (
    <div className="grid gap-4 sm:grid-cols-[0.9fr,0.2fr,0.9fr,0.2fr,0.9fr]">
      <div className="rounded-[22px] border border-[var(--color-border)] bg-white p-4">
        <div className="h-3 w-20 rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[16px] bg-[var(--color-background-alt)]" />
      </div>
      <div className="hidden items-center justify-center sm:flex">
        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>
      <div className="rounded-[22px] border border-[var(--color-border)] bg-white p-4">
        <div className="h-3 w-24 rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[16px] bg-[var(--color-background-alt)]" />
      </div>
      <div className="hidden items-center justify-center sm:flex">
        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>
      <div className="rounded-[22px] border border-[var(--color-border)] bg-white p-4">
        <div className="h-3 w-[4.5rem] rounded-full bg-[var(--color-border)]" />
        <div className="mt-4 h-12 rounded-[16px] bg-[var(--color-background-alt)]" />
      </div>
    </div>
  );
}
