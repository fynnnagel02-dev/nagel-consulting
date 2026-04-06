"use client";

import { startTransition, useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { RoleSwitcher, type DemoRole } from "@/components/content/role-switcher";

const DEMO_URLS: Record<DemoRole, string> = {
  admin:
    "https://nagel-solutions-zeiterfassung.vercel.app/demo/verwaltung/uebersicht?role=admin",
  team_lead:
    "https://nagel-solutions-zeiterfassung.vercel.app/demo/team/heute?role=team_lead",
  employee:
    "https://nagel-solutions-zeiterfassung.vercel.app/demo/heute?role=employee",
};

const ROLE_DESCRIPTIONS: Record<DemoRole, string> = {
  admin: "Verwaltung, Auswertungen und zentrale Übersicht.",
  team_lead: "Tagessteuerung und Teamkoordination auf einen Blick.",
  employee: "Einfache Zeiterfassung im täglichen Einsatz.",
};

export function DemoEmbedClient({
  variant,
  title,
  description,
  initialRole = "admin",
  chrome = "default",
  className,
}: {
  variant: "home" | "page";
  title?: string;
  description?: string;
  initialRole?: DemoRole;
  chrome?: "default" | "hero";
  className?: string;
}) {
  const [role, setRole] = useState<DemoRole>(initialRole);
  const [isLoading, setIsLoading] = useState(true);

  const src = useMemo(() => DEMO_URLS[role], [role]);

  const frameHeightClass =
    variant === "home"
      ? "h-[720px] sm:h-[780px] lg:h-[860px] xl:h-[930px]"
      : "h-[720px] sm:h-[780px] lg:h-[860px] xl:h-[920px]";

  const shellClass =
    chrome === "hero"
      ? "bg-transparent p-0 shadow-none"
      : "surface-panel rounded-[2rem] border border-[rgba(36,51,69,0.1)] bg-[rgba(255,253,249,0.82)] p-2 shadow-[var(--shadow-panel)] sm:p-3";

  const frameClass =
    chrome === "hero"
      ? "rounded-[1.9rem] border border-[rgba(36,51,69,0.08)] bg-[#e6edf6] shadow-[0_28px_70px_rgba(27,37,50,0.16),0_8px_20px_rgba(27,37,50,0.08)]"
      : "rounded-[1.45rem] border-0 bg-white";

  const headerClass =
    chrome === "hero"
      ? "mx-auto flex max-w-[72rem] flex-col items-center text-center"
      : "";

  const controlsClass =
    chrome === "hero"
      ? "justify-center"
      : "sm:items-center sm:justify-between";

  const roleCopyClass = chrome === "hero" ? "items-center text-center" : "";

  return (
    <div className={cn("space-y-6", className)}>
      <div className={cn("space-y-4", headerClass)}>
        {title ? (
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Produktvorschau
            </p>
            <div className="space-y-3">
              <h3 className="font-display text-[2.3rem] leading-[0.98] text-[var(--color-text)] sm:text-[2.8rem]">
                {title}
              </h3>
              {description ? (
                <p className="max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className={cn("flex flex-col gap-3 sm:flex-row", controlsClass)}>
          <div className={cn("space-y-1", roleCopyClass)}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Rollenansicht
            </p>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              {ROLE_DESCRIPTIONS[role]}
            </p>
          </div>
          <RoleSwitcher
            value={role}
            onChange={(nextRole) => {
              if (nextRole === role) {
                return;
              }

              startTransition(() => {
                setIsLoading(true);
                setRole(nextRole);
              });
            }}
            className="max-w-none sm:w-auto"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[86rem]">
        <div className="pointer-events-none absolute inset-x-[12%] top-6 h-14 rounded-full bg-[radial-gradient(circle,rgba(36,51,69,0.12),rgba(36,51,69,0))] blur-3xl" />
        <div
          className={cn(
            "relative overflow-hidden",
            shellClass,
            frameHeightClass,
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              isLoading ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,247,0.84),rgba(248,244,238,0.92))]" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.72)_28%,transparent_52%)] [background-size:220%_100%] animate-[shimmer_2.2s_linear_infinite] motion-reduce:animate-none" />
            <div className="relative flex h-full flex-col gap-3 p-4 sm:p-6">
              <div className="h-12 w-[12rem] rounded-2xl bg-[rgba(36,51,69,0.08)]" />
              <div className="grid flex-1 gap-3 lg:grid-cols-[0.24fr,0.76fr]">
                <div className="space-y-3 rounded-[1.5rem] border border-[rgba(36,51,69,0.08)] bg-white/60 p-4">
                  <div className="h-4 w-24 rounded-full bg-[rgba(36,51,69,0.08)]" />
                  <div className="h-20 rounded-[1rem] bg-[rgba(36,51,69,0.06)]" />
                  <div className="h-20 rounded-[1rem] bg-[rgba(36,51,69,0.06)]" />
                </div>
                <div className="space-y-3 rounded-[1.5rem] border border-[rgba(36,51,69,0.08)] bg-white/70 p-4">
                  <div className="flex gap-3">
                    <div className="h-24 flex-1 rounded-[1.2rem] bg-[rgba(36,51,69,0.06)]" />
                    <div className="h-24 flex-1 rounded-[1.2rem] bg-[rgba(36,51,69,0.06)]" />
                    <div className="hidden h-24 flex-1 rounded-[1.2rem] bg-[rgba(36,51,69,0.06)] sm:block" />
                  </div>
                  <div className="h-full min-h-[15rem] rounded-[1.35rem] bg-[rgba(36,51,69,0.05)]" />
                </div>
              </div>
            </div>
          </div>

          <iframe
            src={src}
            title={`Nagel Solutions Demo (${role})`}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            className={cn(
              "relative z-0 h-full w-full transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              frameClass,
              isLoading ? "opacity-[0.02]" : "opacity-100",
            )}
          />
        </div>
      </div>
    </div>
  );
}
