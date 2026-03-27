import { cn } from "@/lib/utils/cn";

export function Select({
  value,
  onValueChange,
  placeholder,
  options,
  name,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  name: string;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      className={cn(
        "flex h-12 w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
      )}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
