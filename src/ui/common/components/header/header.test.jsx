import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Header } from "./header";

const renderHeader = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("renders the logo", () => {
    // given ~ default render
    // when
    renderHeader();
    // then
    expect(screen.getByAltText("ITX logo")).toBeInTheDocument();
  });

  it("renders a link to the home page", () => {
    // given ~ default render
    // when
    renderHeader();
    // then
    expect(screen.getByRole("link", { name: /ITX logo/ })).toHaveAttribute("href", "/");
  });

  it("renders the cart icon", () => {
    // given ~ default render
    // when
    renderHeader();
    // then
    expect(screen.getByAltText("Cart icon")).toBeInTheDocument();
  });
});
