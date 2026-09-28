console.log("ATLAS CONTENT SCRIPT CARREGADO");

const priceText = document.body.innerText.match(/Preço R\$\s*([\d.,]+)/);

if (priceText?.[1]) {
  const rawPrice = priceText[1];

  const numericPrice = Number(
    rawPrice
      .replace(/\./g, "")
      .replace(",", "."),
  );

  console.log("Atlas Price Radar — preço encontrado:", rawPrice);
  console.log("Atlas Price Radar — preço numérico:", numericPrice);

  chrome.runtime.sendMessage({
    type: "PRICE_FOUND",
    price: numericPrice,
    rawPrice,
  });
} else {
  console.log("Atlas Price Radar — preço não encontrado.");
}