type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function toClassName(input: ClassValue): string {
  if (!input) {
    return "";
  }

  if (typeof input === "string" || typeof input === "number") {
    return String(input);
  }

  if (Array.isArray(input)) {
    return input.map(toClassName).filter(Boolean).join(" ");
  }

  return Object.entries(input)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(toClassName).filter(Boolean).join(" ");
}
