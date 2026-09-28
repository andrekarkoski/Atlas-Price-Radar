console.log("Atlas Price Radar: background iniciado");

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PRICE_FOUND") {
    console.log(
      "Atlas Price Radar — background recebeu preço:",
      message.price,
    );

    console.log(
      "Atlas Price Radar — preço original:",
      message.rawPrice,
    );
  }
});