import { loadProducts, saveProducts } from "../core/storage.js";
import { loadOffers } from "../core/offer-storage.js";
import { formatBrazilianCurrency } from "../core/format.js";

const productName = document.querySelector<HTMLInputElement>("#product-name");
const targetPrice = document.querySelector<HTMLInputElement>("#target-price");
const button = document.querySelector("#add-product");
const productList = document.querySelector<HTMLUListElement>("#product-list");
const offerList = document.querySelector<HTMLUListElement>("#offer-list");

async function renderProducts(): Promise<void> {
  if (!productList) {
    return;
  }

  const products = await loadProducts();

  productList.innerHTML = "";

  for (const [index, product] of products.entries()) {
    const item = document.createElement("li");
    item.className = "product-card";

    const name = document.createElement("strong");
    name.textContent = product.name;

    const target = document.createElement("p");
    target.className = "product-target";
    target.textContent =
      `🎯 Preço-alvo: ${formatBrazilianCurrency(product.targetPrice)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.className = "remove-product";

    removeButton.addEventListener("click", async () => {
      products.splice(index, 1);

      await saveProducts(products);

      await renderProducts();
    });

    item.appendChild(name);
    item.appendChild(target);
    item.appendChild(removeButton);
    productList.appendChild(item);
  }
}

async function renderOffers(): Promise<void> {
  if (!offerList) {
    return;
  }

  const offers = await loadOffers();

  offerList.innerHTML = "";

  for (const offer of offers) {
    const item = document.createElement("li");
    item.className = "offer-card";

    const store = document.createElement("strong");
    store.textContent = offer.store.toUpperCase();

    const title = document.createElement("p");
    title.className = "offer-title";
    title.textContent = offer.title;

    const price = document.createElement("p");
    price.className = "offer-price";
    price.textContent = formatBrazilianCurrency(offer.price);

    item.appendChild(store);
    item.appendChild(title);
    item.appendChild(price);

    if (offer.targetPrice !== undefined) {
      const target = document.createElement("p");
      target.className = "offer-target";
      target.textContent =
        `🎯 Alvo: ${formatBrazilianCurrency(offer.targetPrice)}`;

      const comparison = document.createElement("p");
      comparison.className = offer.belowTarget
        ? "offer-below-target"
        : "offer-above-target";

      const difference = formatBrazilianCurrency(offer.difference);
      const percentage = offer.percentage.toFixed(2).replace(".", ",");

      comparison.textContent = offer.belowTarget
        ? `↓ ${difference} abaixo do alvo (${percentage}%)`
        : `↑ ${difference} acima do alvo (${percentage}%)`;

      item.appendChild(target);
      item.appendChild(comparison);
    }

    const date = document.createElement("small");
    date.textContent = new Date(offer.capturedAt).toLocaleString("pt-BR");

    item.appendChild(date);

    const link = document.createElement("a");
    link.href = offer.url;
    link.target = "_blank";
    link.textContent = "Abrir oferta";

    item.appendChild(link);

    offerList.appendChild(item);
  }
}

button?.addEventListener("click", async () => {
  const name = productName?.value.trim();
  const price = Number(targetPrice?.value);

  if (!name) {
    console.log("Informe o nome do produto.");
    return;
  }

  if (!price || price <= 0) {
    console.log("Informe um preço-alvo válido.");
    return;
  }

  const products = await loadProducts();

  const alreadyExists = products.some(
    (product) => product.name.toLowerCase() === name.toLowerCase(),
  );

  if (alreadyExists) {
    console.log("Esse produto já está sendo monitorado.");
    return;
  }

  products.push({
    name,
    targetPrice: price,
  });

  await saveProducts(products);

  console.log("Produto salvo!");

  if (productName) {
    productName.value = "";
  }

  if (targetPrice) {
    targetPrice.value = "";
  }

  await renderProducts();
});

await renderProducts();
await renderOffers();