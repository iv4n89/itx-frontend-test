import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { CartProvider } from "./cart-context-provider";
import { useCart } from "./use-cart";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

describe("useCart", () => {
  it("returns cartCount and addToCart from the context", () => {
    // given
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

    // when
    const { result } = renderHook(() => useCart(), { wrapper });

    // then
    expect(typeof result.current.cartCount).toBe("number");
    expect(typeof result.current.addToCart).toBe("function");
  });
});
