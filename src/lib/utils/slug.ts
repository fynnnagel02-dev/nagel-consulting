const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const EDGE_DASHES = /^-+|-+$/g;

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(NON_ALPHANUMERIC, "-")
    .replace(EDGE_DASHES, "");
}

export function ensureSlug(input: string, fallback: string) {
  const normalized = slugify(input);
  return normalized || slugify(fallback);
}
