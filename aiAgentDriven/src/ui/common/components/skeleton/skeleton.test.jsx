import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders with the base skeleton class", () => {
    // given / when
    const { container } = render(<Skeleton />);

    // then
    expect(container.firstChild).toHaveClass("skeleton");
  });

  it("applies an extra class alongside the base class", () => {
    // given
    const className = "product-image";

    // when
    const { container } = render(<Skeleton className={className} />);

    // then
    expect(container.firstChild).toHaveClass("skeleton", "product-image");
  });
});
