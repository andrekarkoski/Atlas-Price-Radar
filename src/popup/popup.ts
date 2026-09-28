import { loadProducts, saveProducts } from "../core/storage.js";

const productName = document.querySelector<HTMLInputElement>("#product-name");
const targetPrice = document.querySelector<HTMLInputElement>("#target-price");
const button = document.querySelector("#add-product");
const productList = document.querySelector<HTMLUListElement>("#product-list");

async function renderProducts(): Promise<void> {
  if (!productList) {
    return;
  }

  const products = await loadProducts();

  productList.innerHTML = "";

  for (const [index, product] of products.entries()) {
    const item = document.createElement("li");

    item.textContent =
      `${product.name} — R$ ${product.targetPrice.toFixed(2)} `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";

    removeButton.addEventListener("click", async () => {
      products.splice(index, 1);

      await saveProducts(products);

      await renderProducts();
    });

    item.appendChild(removeButton);
    productList.appendChild(item);
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