import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { CartContext } from "./cart-context";
import { CartProvider } from "./cart-context-provider";

const CART_STORAGE_KEY = "itx-store-cart";

const CartConsumer = () => {
  const { itemCount, addToCart } = useContext(CartContext);
  return (
    <>
      <span data-testid="item-count">{itemCount}</span>
      <button onClick={() => addToCart({ id: "1" })}>Add to cart</button>
    </>
  );
};

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with an empty cart when localStorage has no data", () => {
    // given ~ localStorage is empty
    // when
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );
    // then
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  it("initializes the cart from localStorage", () => {
    // given ~ localStorage has a previously stored cart
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ id: "1" }, { id: "2" }]),
    );
    // when
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );
    // then
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");
  });

  it("adds an item to the cart", async () => {
    // given ~ empty cart
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );
    // when
    await userEvent.setup().click(screen.getByRole("button"));
    // then
    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
  });

  it("increments itemCount with each item added", async () => {
    // given ~ empty cart
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );
    // when
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    // then
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");
  });

  it("persists the cart to localStorage when an item is added", async () => {
    // given ~ empty cart
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );
    // when
    await userEvent.setup().click(screen.getByRole("button"));
    // then
    expect(
      JSON.parse(localStorage.getItem(CART_STORAGE_KEY)),
    ).toEqual([{ id: "1" }]);
  });
});
