import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./product";

const baseData = {
  brand: "Apple",
  model: "iPhone 15",
  price: "999",
  cpu: "A17 Pro",
};

describe("Product", () => {
  it("renders the brand", () => {
    // given ~ a product with a brand
    // when
    render(<Product data={baseData} />);
    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("renders the model", () => {
    // given ~ a product with a model
    // when
    render(<Product data={baseData} />);
    // then
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });

  it("renders the price followed by €", () => {
    // given ~ a product with a price
    // when
    render(<Product data={baseData} />);
    // then
    expect(screen.getByText(/999/)).toBeInTheDocument();
  });

  it("renders only '€' when price is an empty string", () => {
    // given ~ a product with no price
    const data = { ...baseData, price: "" };
    // when
    render(<Product data={data} />);
    // then
    expect(screen.getByText("€")).toBeInTheDocument();
  });
});
