import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HomeView } from "./home";

vi.mock("@/ui/itx-store/hooks/use-list-products/use-list-products", () => ({
  useListProducts: vi.fn(),
}));

import { useListProducts } from "@/ui/itx-store/hooks/use-list-products/use-list-products";

const products = [
  { id: "1", brand: "Apple", model: "iPhone 14", price: "999", imgUrl: "" },
  { id: "2", brand: "Samsung", model: "Galaxy S22", price: "799", imgUrl: "" },
];

function renderHome() {
  return render(<MemoryRouter><HomeView /></MemoryRouter>);
}

describe("HomeView", () => {
  it("renders the search input", () => {
    // given
    useListProducts.mockReturnValue({ products: [], isLoading: false });

    // when
    renderHome();

    // then
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows all products on initial load", () => {
    // given
    useListProducts.mockReturnValue({ products, isLoading: false });

    // when
    renderHome();

    // then
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S22")).toBeInTheDocument();
  });

  it("filters products in real time as the user types", () => {
    // given
    useListProducts.mockReturnValue({ products, isLoading: false });
    renderHome();

    // when
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "apple" } });

    // then
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
    expect(screen.queryByText("Galaxy S22")).not.toBeInTheDocument();
  });

  it("restores all products when the search is cleared", () => {
    // given
    useListProducts.mockReturnValue({ products, isLoading: false });
    renderHome();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "apple" } });

    // when
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    // then
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S22")).toBeInTheDocument();
  });

  it("shows skeletons while products are loading", () => {
    // given
    useListProducts.mockReturnValue({ products: [], isLoading: true });

    // when
    const { container } = renderHome();

    // then
    expect(container.querySelectorAll(".skeleton")).toHaveLength(8);
  });
});
