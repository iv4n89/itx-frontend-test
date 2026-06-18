import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { Header } from "./header";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

function renderHeader(initialPath = "/") {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Header />
      </MemoryRouter>
    </CartProvider>
  );
}

describe("Header", () => {
  it("renders the title as a link to the home page", () => {
    // given / when
    renderHeader();

    // then
    expect(screen.getByRole("link", { name: "ITX Store" })).toHaveAttribute("href", "/");
  });

  it("shows the current cart count", () => {
    // given
    localStorage.setItem("cart-count", "4");

    // when
    renderHeader();

    // then
    expect(screen.getByText(/4/)).toBeInTheDocument();
    localStorage.clear();
  });

  it("shows the home breadcrumb on the root path", () => {
    // given / when
    renderHeader("/");

    // then
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  it("shows the detail breadcrumb on a product path", () => {
    // given / when
    renderHeader("/product/123");

    // then
    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByText("Detalle producto")).toBeInTheDocument();
  });
});
