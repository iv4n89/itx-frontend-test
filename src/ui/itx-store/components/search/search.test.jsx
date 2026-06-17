import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./search";

describe("Search", () => {
  it("renders an input with the current search term", () => {
    // given ~ a search term already typed
    // when
    render(<Search searchTerm="apple" setSearchTerm={() => {}} />);
    // then
    expect(screen.getByRole("textbox")).toHaveValue("apple");
  });

  it("has the placeholder text", () => {
    // given ~ empty search
    // when
    render(<Search searchTerm="" setSearchTerm={() => {}} />);
    // then
    expect(screen.getByPlaceholderText("Buscar por marca o modelo")).toBeInTheDocument();
  });

  it("calls setSearchTerm with the new value when the input changes", () => {
    // given ~ a spy on setSearchTerm
    const setSearchTerm = vi.fn();
    render(<Search searchTerm="" setSearchTerm={setSearchTerm} />);

    // when
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "samsung" } });

    // then
    expect(setSearchTerm).toHaveBeenCalledWith("samsung");
  });
});
