import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { Layout } from "./layout";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

function renderLayout(childContent = <div>page content</div>) {
  const router = createMemoryRouter([
    {
      element: <Layout />,
      children: [{ index: true, element: childContent }],
    },
  ]);

  return render(
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

describe("Layout", () => {
  it("renders the header", () => {
    // given / when
    renderLayout();

    // then
    expect(screen.getByRole("link", { name: "ITX Store" })).toBeInTheDocument();
  });

  it("renders the child route content", () => {
    // given / when
    renderLayout(<div>page content</div>);

    // then
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
