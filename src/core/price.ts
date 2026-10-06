export function parseBrazilianPrice(value: string): number {
  const priceMatch = value.match(/[\d.]+,\d{2}|[\d.]+/);

  if (!priceMatch) {
    return Number.NaN;
  }

  const normalized = priceMatch[0]
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  return Number(normalized);
}