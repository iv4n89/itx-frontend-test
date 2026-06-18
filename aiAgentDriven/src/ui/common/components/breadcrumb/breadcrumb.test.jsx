import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { BreadCrumb } from "./breadcrumb";

const items = [
  { label: "Inicio", to: "/" },
  { label: "Detalle producto", to: null },
];

describe("BreadCrumb", () => {
  it("renders all navigation items", () => {
    // given / when
    render(<MemoryRouter><BreadCrumb items={items} /></MemoryRouter>);

    // then
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Detalle producto")).toBeInTheDocument();
  });

  it("renders the first item as a link", () => {
    // given / when
    render(<MemoryRouter><BreadCrumb items={items} /></MemoryRouter>);

    // then
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
  });

  it("renders the last item as plain text, not a link", () => {
    // given / when
    render(<MemoryRouter><BreadCrumb items={items} /></MemoryRouter>);

    // then
    expect(screen.queryByRole("link", { name: "Detalle producto" })).toBeNull();
    expect(screen.getByText("Detalle producto")).toBeInTheDocument();
  });

  it("shows a separator between items", () => {
    // given / when
    render(<MemoryRouter><BreadCrumb items={items} /></MemoryRouter>);

    // then
    expect(screen.getByText(">")).toBeInTheDocument();
  });
});
