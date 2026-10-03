import type { PriceOffer } from "./offer.js";
import { shouldSaveOffer } from "./offer-history.js";

const STORAGE_KEY = "priceOffers";

export async function saveOffer(offer: PriceOffer): Promise<void> {
  const offers = await loadOffers();

  const matchingOffers = offers.filter(
    (existingOffer) =>
      existingOffer.store === offer.store &&
      existingOffer.url === offer.url,
  );

  const latestOffer = matchingOffers.at(-1);

  if (!shouldSaveOffer(latestOffer, offer)) {
    return;
  }

  offers.push(offer);

  await chrome.storage.local.set({
    [STORAGE_KEY]: offers,
  });
}

export async function loadOffers(): Promise<PriceOffer[]> {
  const result = await chrome.storage.local.get(STORAGE_KEY);

  return (result[STORAGE_KEY] as PriceOffer[] | undefined) ?? [];
}