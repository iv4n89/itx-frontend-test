import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductSpecs } from "./product-specs";

describe("ProductSpecs", () => {
  it("renders the spec fields that are present in the data", () => {
    // given
    const data = { brand: "Apple", model: "iPhone 14", cpu: "A15" };

    // when
    render(<ProductSpecs data={data} />);

    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
    expect(screen.getByText("A15")).toBeInTheDocument();
  });

  it("does not render fields absent from the data", () => {
    // given
    const data = { brand: "Apple" };

    // when
    render(<ProductSpecs data={data} />);

    // then
    expect(screen.queryByText("CPU:")).not.toBeInTheDocument();
    expect(screen.queryByText("RAM:")).not.toBeInTheDocument();
  });

  it("renders weight with the gram suffix", () => {
    // given
    const data = { weight: "206" };

    // when
    render(<ProductSpecs data={data} />);

    // then
    expect(screen.getByText("206g")).toBeInTheDocument();
  });

  it("renders an empty list when no fields are present", () => {
    // given / when
    const { container } = render(<ProductSpecs data={{}} />);

    // then
    expect(container.querySelector("li")).toBeNull();
  });
});
