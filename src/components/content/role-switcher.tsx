"use client";

import { cn } from "@/lib/utils/cn";

export type DemoRole = "admin" | "team_lead" | "employee";

const ROLE_OPTIONS: Array<{
  value: DemoRole;
  label: string;
}> = [
  { value: "admin", label: "Admin" },
  { value: "team_lead", label: "Teamleiter" },
  { value: "employee", label: "Mitarbeiter" },
];

const ACTIVE_POSITION: Record<DemoRole, string> = {
  admin: "translate-x-0",
  team_lead: "translate-x-full",
  employee: "translate-x-[200%]",
};

export function RoleSwitcher({
  value,
  onChange,
  className,
}: {
  value: DemoRole;
  onChange: (role: DemoRole) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-grid w-full max-w-[34rem] grid-cols-3 rounded-[1.35rem] border border-[rgba(36,51,69,0.12)] bg-[rgba(255,252,247,0.9)] p-1 shadow-[var(--shadow-crisp)]",
        className,
      )}
    >
      <div className="relative col-span-3 grid grid-cols-3">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-[1rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,var(--color-primary),var(--color-primary-strong))] shadow-[0_16px_34px_rgba(27,37,50,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            ACTIVE_POSITION[value],
          )}
        />

        {ROLE_OPTIONS.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "relative z-10 rounded-[1rem] px-3 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none sm:px-5",
                isActive
                  ? "text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
              )}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
