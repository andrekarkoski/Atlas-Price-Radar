import type { TrackedProduct } from "./product.js";

const STORAGE_KEY = "trackedProducts";

export async function saveProducts(
  products: TrackedProduct[],
): Promise<void> {
  await chrome.storage.local.set({
    [STORAGE_KEY]: products,
  });
}

export async function loadProducts(): Promise<TrackedProduct[]> {
  const result = await chrome.storage.local.get(STORAGE_KEY);

  return (result[STORAGE_KEY] as TrackedProduct[] | undefined) ?? [];
}