import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemImage } from "./item-image";

describe("ItemImage", () => {
  it("renders an image with the given src", () => {
    // given ~ an image url
    // when
    render(<ItemImage src="https://example.com/phone.jpg" alt="phone" />);
    // then
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/phone.jpg");
  });

  it("renders an image with the given alt text", () => {
    // given ~ an alt text
    // when
    render(<ItemImage src="" alt="Apple iPhone 15" />);
    // then
    expect(screen.getByAltText("Apple iPhone 15")).toBeInTheDocument();
  });
});
