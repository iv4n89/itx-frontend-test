import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemImage } from "./item-image";

describe("ItemImage", () => {
  it("renders the image with the correct src", () => {
    // given / when
    render(<ItemImage imgUrl="https://example.com/phone.jpg" alt="Apple iPhone 14" />);

    // then
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/phone.jpg");
  });

  it("renders the image with the correct alt text", () => {
    // given / when
    render(<ItemImage imgUrl="https://example.com/phone.jpg" alt="Apple iPhone 14" />);

    // then
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Apple iPhone 14");
  });
});
