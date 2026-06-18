import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { CartProvider } from "../../context/cart-context/cart-context-provider";
import { Layout } from "./layout";

const renderLayout = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      Component: Layout,
      children: [{ index: true, element: <div>Page content</div> }],
    },
  ]);
  return render(
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>,
  );
};

describe("Layout", () => {
  it("renders the header", () => {
    // given ~ default render
    // when
    renderLayout();
    // then
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders a main element", () => {
    // given ~ default render
    // when
    renderLayout();
    // then
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders child routes via Outlet", () => {
    // given ~ a child route with content
    // when
    renderLayout();
    // then
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
