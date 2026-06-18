import { describe, it, expect } from "vitest";
import { filterProducts } from "./itx-store-service";

const products = [
  { brand: "Apple", model: "iPhone 14", price: "999" },
  { brand: "Samsung", model: "Galaxy S22", price: "799" },
  { brand: "Xiaomi", model: "Mi 11", price: "499" },
];

describe("filterProducts", () => {
  it("returns all products when the query is empty", () => {
    // given
    const query = "";

    // when
    const result = filterProducts(products, query);

    // then
    expect(result).toHaveLength(3);
  });

  it("filters by brand case-insensitively", () => {
    // given
    const query = "apple";

    // when
    const result = filterProducts(products, query);

    // then
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Apple");
  });

  it("filters by model case-insensitively", () => {
    // given
    const query = "galaxy";

    // when
    const result = filterProducts(products, query);

    // then
    expect(result).toHaveLength(1);
    expect(result[0].model).toBe("Galaxy S22");
  });

  it("returns an empty array when no product matches the query", () => {
    // given
    const query = "zzznomatch";

    // when
    const result = filterProducts(products, query);

    // then
    expect(result).toHaveLength(0);
  });

  it("matches products whose brand or model contains the query", () => {
    // given
    const mixed = [
      { brand: "Apple", model: "iPhone 14" },
      { brand: "Samsung", model: "iPhone SE clone" },
    ];
    const query = "iphone";

    // when
    const result = filterProducts(mixed, query);

    // then
    expect(result).toHaveLength(2);
  });

  it("does not mutate the original array", () => {
    // given
    const original = [...products];

    // when
    filterProducts(products, "apple");

    // then
    expect(products).toEqual(original);
  });
});
