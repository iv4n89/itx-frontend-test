import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./use-search";

const products = [
  { brand: "Apple", model: "iPhone 15" },
  { brand: "Samsung", model: "Galaxy S24" },
  { brand: "Apple", model: "MacBook Pro" },
];

describe("useSearch", () => {
  it("returns all items when searchTerm is empty", () => {
    // given ~ a list of products and no search term
    const { result } = renderHook(() => useSearch(products));

    // when ~ (initial state, searchTerm is "")

    // then
    expect(result.current.filteredData).toHaveLength(3);
  });

  it("filters items by brand", () => {
    // given ~ a list of products
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setSearchTerm("Samsung"));

    // then
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].brand).toBe("Samsung");
  });

  it("filters items by model", () => {
    // given ~ a list of products
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setSearchTerm("MacBook"));

    // then
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].model).toBe("MacBook Pro");
  });

  it("filter is case-insensitive", () => {
    // given ~ a list of products
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setSearchTerm("apple"));

    // then
    expect(result.current.filteredData).toHaveLength(2);
  });

  it("returns empty array when no items match the search term", () => {
    // given ~ a list of products
    const { result } = renderHook(() => useSearch(products));

    // when
    act(() => result.current.setSearchTerm("Nokia"));

    // then
    expect(result.current.filteredData).toHaveLength(0);
  });

  it("returns empty array when data is undefined and a search term is set", () => {
    // given ~ data not yet loaded
    const { result } = renderHook(() => useSearch(undefined));

    // when
    act(() => result.current.setSearchTerm("apple"));

    // then
    expect(result.current.filteredData).toEqual([]);
  });
});
