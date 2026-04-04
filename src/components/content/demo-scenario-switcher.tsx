"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { VisualPlaceholder } from "@/components/content/visual-placeholder";

export type DemoScenario = {
  key: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  caption: string;
};

export function DemoScenarioSwitcher({
  scenarios,
}: {
  scenarios: DemoScenario[];
}) {
  const [activeKey, setActiveKey] = useState(scenarios[0]?.key ?? "");
  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.key === activeKey) ?? scenarios[0],
    [activeKey, scenarios],
  );

  if (!activeScenario) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.68fr,1.32fr] lg:items-start">
      <div className="space-y-3">
        <div className="inline-flex flex-wrap rounded-full border border-[var(--color-border)] bg-white p-1">
          {scenarios.map((scenario) => (
            <button
              key={scenario.key}
              type="button"
              onClick={() => setActiveKey(scenario.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                scenario.key === activeKey
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-3xl text-[var(--color-text)]">
            {activeScenario.title}
          </h3>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            {activeScenario.summary}
          </p>
          <p className="text-sm leading-7 text-[var(--color-text)]">
            {activeScenario.detail}
          </p>
        </div>
      </div>

      <div
        key={activeScenario.key}
        className="transition duration-300 ease-out data-[state=idle]:opacity-100"
      >
        <VisualPlaceholder
          variant="wireframe"
          title={activeScenario.title}
          caption={activeScenario.caption}
          eyebrow="Ablaufvorschau"
          className="min-h-[360px]"
        />
      </div>
    </div>
  );
}
