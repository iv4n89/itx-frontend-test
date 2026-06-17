import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDocumentTitle } from "./use-document-title";

describe("useDocumentTitle", () => {
  it("sets document.title on mount", () => {
    // given ~ a page title
    // when
    renderHook(() => useDocumentTitle("Product list"));
    // then
    expect(document.title).toBe("Product list");
  });

  it("updates document.title when the title changes", () => {
    // given ~ hook rendered with an initial title
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Initial title" },
    });
    // when
    rerender({ title: "Updated title" });
    // then
    expect(document.title).toBe("Updated title");
  });
});
