import { describe, expect, test } from "vitest";
import type { PriceOffer } from "./offer.js";
import { shouldSaveOffer } from "./offer-history.js";

const baseOffer: PriceOffer = {
  store: "magalu",
  productName: "acer aspire go 15",
  title: "Notebook Acer Aspire Go 15",
  price: 3419.10,
  rawPrice: "3.419,10",
  url: "https://exemplo.com/produto",
  capturedAt: "2026-10-01T21:01:07.692Z",
  targetPrice: 4000,
  belowTarget: true,
  difference: 580.90,
  percentage: 14.52,
};

describe("shouldSaveOffer", () => {
  test("salva quando não existe oferta anterior", () => {
    expect(shouldSaveOffer(undefined, baseOffer)).toBe(true);
  });

  test("não salva quando o preço é igual", () => {
    const newOffer = {
      ...baseOffer,
      capturedAt: "2026-10-01T22:00:00.000Z",
    };

    expect(shouldSaveOffer(baseOffer, newOffer)).toBe(false);
  });

  test("salva quando o preço muda", () => {
    const newOffer = {
      ...baseOffer,
      price: 3329.10,
      rawPrice: "3.329,10",
    };

    expect(shouldSaveOffer(baseOffer, newOffer)).toBe(true);
  });
});