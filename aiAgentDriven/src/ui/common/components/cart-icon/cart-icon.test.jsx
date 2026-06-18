import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartIcon } from "./cart-icon";

describe("CartIcon", () => {
  it("displays the count passed as prop", () => {
    // given
    const count = 7;

    // when
    render(<CartIcon count={count} />);

    // then
    expect(screen.getByText(/7/)).toBeInTheDocument();
  });

  it("displays zero when count is 0", () => {
    // given / when
    render(<CartIcon count={0} />);

    // then
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});
