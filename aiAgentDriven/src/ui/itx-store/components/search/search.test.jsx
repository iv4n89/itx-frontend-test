import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./search";

describe("Search", () => {
  it("renders an input element", () => {
    // given / when
    render(<Search value="" onSearch={() => {}} />);

    // then
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    // given / when
    render(<Search value="apple" onSearch={() => {}} />);

    // then
    expect(screen.getByRole("textbox")).toHaveValue("apple");
  });

  it("calls onSearch with the new value on every change", () => {
    // given
    const onSearch = vi.fn();
    render(<Search value="" onSearch={onSearch} />);

    // when
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "samsung" } });

    // then
    expect(onSearch).toHaveBeenCalledWith("samsung");
  });
});
