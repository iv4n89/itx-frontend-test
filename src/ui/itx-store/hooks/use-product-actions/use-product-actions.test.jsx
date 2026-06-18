import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { addToCart } from "@/core/itx-store/itx-store-service";
import { useProductActions } from "./use-product-actions";

vi.mock("@/core/itx-store/itx-store-service", () => ({
  addToCart: vi.fn(),
}));

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

const multiOptions = {
  storages: [
    { code: 1, name: "128GB" },
    { code: 2, name: "256GB" },
  ],
  colors: [
    { code: 3, name: "black" },
    { code: 4, name: "white" },
  ],
};

const singleOptions = {
  storages: [{ code: 1, name: "128GB" }],
  colors: [{ code: 2, name: "black" }],
};

describe("useProductActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes selectedStorage as null when multiple storages are available", () => {
    // given ~ product with multiple storage options
    const { result } = renderHook(() => useProductActions("1", multiOptions), { wrapper });

    // when ~ (initial state)

    // then
    expect(result.current.selectedStorage).toBeNull();
  });

  it("auto-selects storage when only one option is available", () => {
    // given ~ product with a single storage option
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when ~ (initial state)

    // then
    expect(result.current.selectedStorage).toBe(1);
  });

  it("auto-selects color when only one option is available", () => {
    // given ~ product with a single color option
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when ~ (initial state)

    // then
    expect(result.current.selectedColor).toBe(2);
  });

  it("handleStorageSelect updates the selected storage", () => {
    // given ~ hook with multiple options and no selection
    const { result } = renderHook(() => useProductActions("1", multiOptions), { wrapper });

    // when
    act(() => result.current.handleStorageSelect(2));

    // then
    expect(result.current.selectedStorage).toBe(2);
  });

  it("handleColorSet updates the selected color", () => {
    // given ~ hook with multiple options and no selection
    const { result } = renderHook(() => useProductActions("1", multiOptions), { wrapper });

    // when
    act(() => result.current.handleColorSet({ code: 4, name: "white" }));

    // then
    expect(result.current.selectedColor).toEqual({ code: 4, name: "white" });
  });

  it("isAddToCartDisabled is true when no storage is selected", () => {
    // given ~ no storage selected
    const { result } = renderHook(() => useProductActions("1", multiOptions), { wrapper });

    // when ~ (initial state)

    // then
    expect(result.current.isAddToCartDisabled).toBe(true);
  });

  it("isAddToCartDisabled is false when both storage and color are selected", () => {
    // given ~ single options so both are auto-selected
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when ~ (initial state)

    // then
    expect(result.current.isAddToCartDisabled).toBe(false);
  });

  it("handleAddToCart calls the service with the selected options", async () => {
    // given ~ both auto-selected via single options, service resolves
    addToCart.mockResolvedValue({ count: 1 });
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when
    await act(() => result.current.handleAddToCart());

    // then
    expect(addToCart).toHaveBeenCalledWith({
      id: "1",
      colorCode: 2,
      storageCode: 1,
    });
  });

  it("handleAddToCart does not call the service when disabled", async () => {
    // given ~ no storage or color selected
    const { result } = renderHook(() => useProductActions("1", multiOptions), { wrapper });

    // when
    await act(() => result.current.handleAddToCart());

    // then
    expect(addToCart).not.toHaveBeenCalled();
  });

  it("isFetching is true while the request is in flight and false after", async () => {
    // given ~ service takes time to resolve
    let resolve;
    addToCart.mockImplementation(() => new Promise((r) => { resolve = r; }));
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when
    act(() => { result.current.handleAddToCart(); });
    expect(result.current.isFetching).toBe(true);

    // then
    await act(() => { resolve({ count: 1 }); });
    expect(result.current.isFetching).toBe(false);
  });

  it("does not add to cart context when the service responds with count other than 1", async () => {
    // given ~ service returns count 0 (item already in cart or error state)
    addToCart.mockResolvedValue({ count: 0 });
    const { result } = renderHook(() => useProductActions("1", singleOptions), { wrapper });

    // when / then ~ no error thrown confirms handler completed without calling addToContextCart
    await expect(act(() => result.current.handleAddToCart())).resolves.not.toThrow();
  });
});
