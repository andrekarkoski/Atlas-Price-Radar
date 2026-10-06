import { parseBrazilianPrice } from "../core/price.js";

console.log("ATLAS CONTENT SCRIPT CARREGADO");

const priceText = document.body.innerText.match(/Preço R\$\s*([\d.,]+)/);

if (priceText?.[1]) {
  const rawPrice = priceText[1];
  const numericPrice = parseBrazilianPrice(rawPrice);

  console.log("Atlas Price Radar — preço encontrado:", rawPrice);
  console.log("Atlas Price Radar — preço numérico:", numericPrice);

  chrome.runtime.sendMessage({
    type: "PRICE_FOUND",
    store: "magalu",
    title: document.title,
    price: numericPrice,
    rawPrice,
    url: window.location.href,
  });
} else {
  console.log("Atlas Price Radar — preço não encontrado.");
}