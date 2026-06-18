import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./use-search";

const products = [
  { id: "1", brand: "Apple", model: "iPhone 14", price: "999", imgUrl: "" },
  { id: "2", brand: "Samsung", model: "Galaxy S22", price: "799", imgUrl: "" },
];

describe("useSearch", () => {
  it("returns all products when query is empty", () => {
    // given / when
    const { result } = renderHook(() => useSearch(products));

    // then
    expect(result.current.filteredProducts).toHaveLength(2);
  });

  it("filters products when query changes", () => {
    // given
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setQuery("apple"));

    // then
    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].brand).toBe("Apple");
  });

  it("restores all products when query is cleared", () => {
    // given
    const { result } = renderHook(() => useSearch(products));
    act(() => result.current.setQuery("apple"));

    // when
    act(() => result.current.setQuery(""));

    // then
    expect(result.current.filteredProducts).toHaveLength(2);
  });

  it("exposes the current query value", () => {
    // given
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setQuery("samsung"));

    // then
    expect(result.current.query).toBe("samsung");
  });
});
