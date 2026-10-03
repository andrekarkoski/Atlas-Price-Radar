import type { PriceOffer } from "./offer.js";

export function shouldSaveOffer(
  latestOffer: PriceOffer | undefined,
  newOffer: PriceOffer,
): boolean {
  if (!latestOffer) {
    return true;
  }

  return latestOffer.price !== newOffer.price;
}