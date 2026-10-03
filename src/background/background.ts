import type { PriceOffer } from "../core/offer.js";
import { saveOffer } from "../core/offer-storage.js";
import { loadProducts } from "../core/storage.js";
import { comparePriceToTarget } from "../core/price-target.js";

console.log("Atlas Price Radar: background iniciado");

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "PRICE_FOUND") {
    const products = await loadProducts();

    const matchingProduct = products.find(
      (product) =>
        message.title.toLowerCase().includes(product.name.toLowerCase()),
    );

    if (!matchingProduct) {
      console.log(
        "Atlas Price Radar — nenhum produto monitorado corresponde à oferta.",
      );

      return;
    }

    const result = comparePriceToTarget(
      message.price,
      matchingProduct.targetPrice,
    );

    const offer: PriceOffer = {
      store: message.store,
      productName: matchingProduct.name,
      title: message.title,
      price: message.price,
      rawPrice: message.rawPrice,
      url: message.url,
      capturedAt: new Date().toISOString(),
      targetPrice: matchingProduct.targetPrice,
      belowTarget: result.belowTarget,
      difference: result.difference,
      percentage: result.percentage,
    };

    console.log(
      "Atlas Price Radar — oferta encontrada:",
      offer,
    );

    console.log(
      "Atlas Price Radar — offer ANTES do save:",
      JSON.stringify(offer, null, 2),
    );

await saveOffer(offer);

    await saveOffer(offer);

    console.log(
      "Atlas Price Radar — comparação com preço-alvo:",
      result,
    );
  }
});