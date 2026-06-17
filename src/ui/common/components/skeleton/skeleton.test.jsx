import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("always has the skeleton class", () => {
    // given ~ no props
    // when
    const { container } = render(<Skeleton />);
    // then
    expect(container.firstChild).toHaveClass("skeleton");
  });

  it("includes a custom className alongside the skeleton class", () => {
    // given ~ a custom class name
    // when
    const { container } = render(<Skeleton className="custom-class" />);
    // then
    expect(container.firstChild).toHaveClass("skeleton", "custom-class");
  });

  it("applies the given width as an inline style", () => {
    // given ~ a specific width
    // when
    const { container } = render(<Skeleton width={200} />);
    // then
    expect(container.firstChild).toHaveStyle({ width: "200px" });
  });

  it("applies the given height as an inline style", () => {
    // given ~ a specific height
    // when
    const { container } = render(<Skeleton height={50} />);
    // then
    expect(container.firstChild).toHaveStyle({ height: "50px" });
  });

  it("applies a default borderRadius of 8 when not provided", () => {
    // given ~ no borderRadius prop
    // when
    const { container } = render(<Skeleton />);
    // then
    expect(container.firstChild).toHaveStyle({ borderRadius: "8px" });
  });

  it("applies a custom borderRadius when provided", () => {
    // given ~ a custom borderRadius
    // when
    const { container } = render(<Skeleton borderRadius={16} />);
    // then
    expect(container.firstChild).toHaveStyle({ borderRadius: "16px" });
  });
});
