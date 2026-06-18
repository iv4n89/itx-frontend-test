import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDocumentTitle } from "./use-document-title";

describe("useDocumentTitle", () => {
  it("updates document.title when the hook runs", () => {
    // given
    const title = "Product List";

    // when
    renderHook(() => useDocumentTitle(title));

    // then
    expect(document.title).toBe("Product List");
  });

  it("updates document.title when the title changes", () => {
    // given
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Initial" },
    });

    // when
    rerender({ title: "Updated" });

    // then
    expect(document.title).toBe("Updated");
  });
});
