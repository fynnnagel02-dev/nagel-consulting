import { PlusIcon } from "@/components/ui/icons";

export function Accordion({
  items,
}: {
  items: Array<{ title: string; content: string }>;
}) {
  return (
    <div className="w-full">
      {items.map((item) => (
        <details key={item.title} className="group border-b border-[var(--color-border)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-[var(--color-text)]">
            <span>{item.title}</span>
            <span className="transition group-open:rotate-45">
              <PlusIcon className="size-4 text-[var(--color-primary)]" />
            </span>
          </summary>
          <div className="pb-5 pr-8 text-sm leading-7 text-[var(--color-muted)]">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
