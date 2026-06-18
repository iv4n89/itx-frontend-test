import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CartProvider } from "./cart-context-provider";
import { useCart } from "./use-cart";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

import { addToCart as addToCartApi } from "@/core/itx-store/itx-store-repository";

function CartConsumer() {
  const { cartCount, addToCart } = useCart();
  return (
    <>
      <span data-testid="count">{cartCount}</span>
      <button onClick={() => addToCart("id1", 1, 2)}>add</button>
    </>
  );
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("initializes cartCount to 0 when localStorage is empty", () => {
    // given
    localStorage.clear();

    // when
    render(<CartProvider><CartConsumer /></CartProvider>);

    // then
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("reads cartCount from localStorage on mount", () => {
    // given
    localStorage.setItem("cart-count", "3");

    // when
    render(<CartProvider><CartConsumer /></CartProvider>);

    // then
    expect(screen.getByTestId("count").textContent).toBe("3");
  });

  it("persists cartCount to localStorage when it changes", async () => {
    // given
    addToCartApi.mockResolvedValue({ count: 2 });
    render(<CartProvider><CartConsumer /></CartProvider>);

    // when
    await act(async () => {
      screen.getByRole("button").click();
    });

    // then
    expect(localStorage.getItem("cart-count")).toBe("2");
  });

  it("updates cartCount after addToCart resolves", async () => {
    // given
    addToCartApi.mockResolvedValue({ count: 5 });
    render(<CartProvider><CartConsumer /></CartProvider>);

    // when
    await act(async () => {
      screen.getByRole("button").click();
    });

    // then
    expect(screen.getByTestId("count").textContent).toBe("5");
  });

  it("calls the repository with the correct payload", async () => {
    // given
    addToCartApi.mockResolvedValue({ count: 1 });
    render(<CartProvider><CartConsumer /></CartProvider>);

    // when
    await act(async () => {
      screen.getByRole("button").click();
    });

    // then
    expect(addToCartApi).toHaveBeenCalledWith({ id: "id1", colorCode: 1, storageCode: 2 });
  });
});
