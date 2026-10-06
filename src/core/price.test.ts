import { describe, expect, test } from "vitest";
import { parseBrazilianPrice } from "./price.js";

describe("parseBrazilianPrice", () => {
  test("converte preço com milhares e centavos", () => {
    expect(parseBrazilianPrice("3.419,10")).toBe(3419.10);
  });

  test("converte preço sem milhares", () => {
    expect(parseBrazilianPrice("999,90")).toBe(999.90);
  });

  test("converte preço inteiro", () => {
    expect(parseBrazilianPrice("5000")).toBe(5000);
  });

  test("aceita símbolo R$", () => {
    expect(parseBrazilianPrice("R$ 3.419,10")).toBe(3419.10);
  });

  test("aceita texto ao redor do preço", () => {
    expect(parseBrazilianPrice("Por R$ 3.419,10 à vista")).toBe(3419.10);
  });

    test("converte preço inteiro com separador de milhares", () => {
    expect(parseBrazilianPrice("R$ 3.419")).toBe(3419);
  });

  test("retorna NaN quando não encontra preço", () => {
    expect(parseBrazilianPrice("Preço indisponível")).toBeNaN();
  });
  /// End tests
});