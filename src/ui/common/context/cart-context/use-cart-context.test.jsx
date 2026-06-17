import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { CartProvider } from "./cart-context-provider";
import { useCart } from "./use-cart-context";

describe("useCart", () => {
  it("throws when used outside a CartProvider", () => {
    // given ~ no CartProvider in the tree
    vi.spyOn(console, "error").mockImplementation(() => {});
    // when
    const call = () => renderHook(() => useCart());
    // then
    expect(call).toThrow("useCart must be used within a CartProvider");
  });

  it("does not throw when used inside a CartProvider", () => {
    // given ~ CartProvider wraps the hook
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    // when
    const call = () => renderHook(() => useCart(), { wrapper });
    // then
    expect(call).not.toThrow();
  });
});
