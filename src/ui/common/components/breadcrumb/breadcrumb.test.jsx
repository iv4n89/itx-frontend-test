import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { BreadCrumb } from "./breadcrumb";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <BreadCrumb />
    </MemoryRouter>,
  );

describe("BreadCrumb", () => {
  it("is hidden when the path is /", () => {
    // given ~ the user is on the home page
    // when
    const { container } = renderAt("/");
    // then
    expect(container.querySelector("nav")).toHaveClass("header__breadcrumbs--hidden");
  });

  it("is visible when the path is a product page", () => {
    // given ~ the user is on a product detail page
    // when
    const { container } = renderAt("/product/123");
    // then
    expect(container.querySelector("nav")).not.toHaveClass("header__breadcrumbs--hidden");
  });

  it("always shows an 'Inicio' link", () => {
    // given ~ the user is on the home page
    // when
    renderAt("/");
    // then
    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
  });

  it("shows a 'Detalles producto' link on a product page", () => {
    // given ~ the user is on a product detail page
    // when
    renderAt("/product/abc123");
    // then
    expect(screen.getByRole("link", { name: "Detalles producto" })).toBeInTheDocument();
  });

  it("the 'Inicio' link always points to /", () => {
    // given ~ the user is on a product detail page
    // when
    renderAt("/product/abc123");
    // then
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
  });

  it("the 'Detalles producto' link points to the current product", () => {
    // given ~ the user is on a specific product page
    // when
    renderAt("/product/abc123");
    // then
    expect(screen.getByRole("link", { name: "Detalles producto" })).toHaveAttribute(
      "href",
      "/product/abc123",
    );
  });

  it("shows a separator between breadcrumb items on a product page", () => {
    // given ~ the user is on a product detail page
    // when
    renderAt("/product/abc123");
    // then
    expect(screen.getByText(">")).toBeInTheDocument();
  });
});
