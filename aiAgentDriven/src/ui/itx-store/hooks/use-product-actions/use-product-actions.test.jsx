import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { useProductActions } from "./use-product-actions";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

import { addToCart as addToCartApi } from "@/core/itx-store/itx-store-repository";

function wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

const singleColor = [{ code: 1, name: "Black" }];
const multiColors = [{ code: 1, name: "Black" }, { code: 2, name: "White" }];
const singleStorage = [{ code: 10, name: "128GB" }];
const multiStorages = [{ code: 10, name: "128GB" }, { code: 20, name: "256GB" }];

describe("useProductActions", () => {
  it("auto-selects color when only one option is available", async () => {
    // given
    const product = { id: "1", options: { colors: singleColor, storages: multiStorages } };

    // when
    const { result } = renderHook(() => useProductActions(product), { wrapper });
    await waitFor(() => expect(result.current.selectedColor).toBe(1));

    // then
    expect(result.current.selectedColor).toBe(1);
  });

  it("auto-selects storage when only one option is available", async () => {
    // given
    const product = { id: "1", options: { colors: multiColors, storages: singleStorage } };

    // when
    const { result } = renderHook(() => useProductActions(product), { wrapper });
    await waitFor(() => expect(result.current.selectedStorage).toBe(10));

    // then
    expect(result.current.selectedStorage).toBe(10);
  });

  it("does not auto-select color when multiple options exist", async () => {
    // given
    const product = { id: "1", options: { colors: multiColors, storages: multiStorages } };

    // when
    const { result } = renderHook(() => useProductActions(product), { wrapper });
    await waitFor(() => expect(result.current.selectedColor).toBeNull());

    // then
    expect(result.current.selectedColor).toBeNull();
  });

  it("does not auto-select storage when multiple options exist", async () => {
    // given
    const product = { id: "1", options: { colors: multiColors, storages: multiStorages } };

    // when
    const { result } = renderHook(() => useProductActions(product), { wrapper });
    await waitFor(() => expect(result.current.selectedStorage).toBeNull());

    // then
    expect(result.current.selectedStorage).toBeNull();
  });

  it("handleColorSelect updates the selected color", async () => {
    // given
    const product = { id: "1", options: { colors: multiColors, storages: multiStorages } };
    const { result } = renderHook(() => useProductActions(product), { wrapper });

    // when
    act(() => result.current.handleColorSelect(2));

    // then
    expect(result.current.selectedColor).toBe(2);
  });

  it("handleStorageSelect updates the selected storage", async () => {
    // given
    const product = { id: "1", options: { colors: multiColors, storages: multiStorages } };
    const { result } = renderHook(() => useProductActions(product), { wrapper });

    // when
    act(() => result.current.handleStorageSelect(20));

    // then
    expect(result.current.selectedStorage).toBe(20);
  });

  it("handleAddToCart calls addToCart with the product id, selected color and storage", async () => {
    // given
    addToCartApi.mockResolvedValue({ count: 1 });
    const product = { id: "ABC123", options: { colors: singleColor, storages: singleStorage } };
    const { result } = renderHook(() => useProductActions(product), { wrapper });
    await waitFor(() => expect(result.current.selectedColor).toBe(1));

    // when
    await act(async () => result.current.handleAddToCart());

    // then
    expect(addToCartApi).toHaveBeenCalledWith({ id: "ABC123", colorCode: 1, storageCode: 10 });
  });
});
