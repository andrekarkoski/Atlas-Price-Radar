export function parseBrazilianPrice(value: string): number {
  const normalized = value
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  return Number(normalized);
}