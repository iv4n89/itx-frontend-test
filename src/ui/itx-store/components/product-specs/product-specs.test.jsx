import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductSpecs } from "./product-specs";

describe("ProductSpecs", () => {
  it("renders the specs that are present in data", () => {
    // given ~ a product with several specs
    const data = { cpu: "A17 Pro", ram: "8GB", os: "iOS 17" };
    // when
    render(<ProductSpecs data={data} />);
    // then
    expect(screen.getByText("A17 Pro")).toBeInTheDocument();
    expect(screen.getByText("8GB")).toBeInTheDocument();
    expect(screen.getByText("iOS 17")).toBeInTheDocument();
  });

  it("does not render a spec when the field is absent", () => {
    // given ~ a product without cpu
    const data = { ram: "8GB" };
    // when
    render(<ProductSpecs data={data} />);
    // then
    expect(screen.queryByText(/CPU/)).not.toBeInTheDocument();
  });

  it("renders weight with the 'g' suffix", () => {
    // given ~ a product with weight
    const data = { weight: "206" };
    // when
    render(<ProductSpecs data={data} />);
    // then
    expect(screen.getByText("206g")).toBeInTheDocument();
  });

  it("renders an empty list when no specs are provided", () => {
    // given ~ a product with no spec fields
    // when
    const { container } = render(<ProductSpecs data={{}} />);
    // then
    expect(container.querySelector("li")).toBeNull();
  });
});
