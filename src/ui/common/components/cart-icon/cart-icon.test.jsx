import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartIcon } from "./cart-icon";

describe("CartIcon", () => {
  it("always renders the cart image", () => {
    // given ~ no props
    // when
    render(<CartIcon />);
    // then
    expect(screen.getByAltText("Cart icon")).toBeInTheDocument();
  });

  it("shows the item count when itemCount is greater than 0", () => {
    // given ~ cart has 3 items
    // when
    render(<CartIcon itemCount={3} />);
    // then
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not show the item count when itemCount is 0", () => {
    // given ~ empty cart
    // when
    const { container } = render(<CartIcon itemCount={0} />);
    // then
    expect(container.querySelector(".header__cart_number_items")).toBeNull();
  });

  it("does not show the item count when itemCount is not provided", () => {
    // given ~ itemCount prop omitted
    // when
    const { container } = render(<CartIcon />);
    // then
    expect(container.querySelector(".header__cart_number_items")).toBeNull();
  });
});
