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
    expect(container.querySelector("nav")).toHaveClass(
      "header__breadcrumbs--hidden",
    );
  });

  it("is visible when the path is a product page", () => {
    // given ~ the user is on a product detail page
    // when
    const { container } = renderAt("/product/123");
    // then
    expect(container.querySelector("nav")).not.toHaveClass(
      "header__breadcrumbs--hidden",
    );
  });

  it("shows 'Inicio' text when the path is /", () => {
    // given ~ the user is on the home page
    // when
    renderAt("/");
    // then
    expect(screen.getByText(/Inicio/)).toBeInTheDocument();
  });

  it("shows 'Detalle de producto' text when the path starts with /product/", () => {
    // given ~ the user is on a product detail page
    // when
    renderAt("/product/abc123");
    // then
    expect(screen.getByText(/Detalle de producto/)).toBeInTheDocument();
  });

  it("renders a link to the home page", () => {
    // given ~ any path
    // when
    renderAt("/product/123");
    // then
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
