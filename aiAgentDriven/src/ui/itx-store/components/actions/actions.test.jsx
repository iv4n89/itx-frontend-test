import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Actions } from "./actions";

const colors = [
  { code: 1, name: "Black" },
  { code: 2, name: "White" },
];
const storages = [
  { code: 10, name: "128GB" },
  { code: 20, name: "256GB" },
];

describe("Actions", () => {
  it("renders a button for each color", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={null} selectedStorage={null}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
  });

  it("renders a button for each storage", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={null} selectedStorage={null}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("128GB")).toBeInTheDocument();
    expect(screen.getByText("256GB")).toBeInTheDocument();
  });

  it("marks the selected color button as active", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={2} selectedStorage={null}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("White")).toHaveClass("actions__option--selected");
    expect(screen.getByText("Black")).not.toHaveClass("actions__option--selected");
  });

  it("marks the selected storage button as active", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={null} selectedStorage={20}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("256GB")).toHaveClass("actions__option--selected");
    expect(screen.getByText("128GB")).not.toHaveClass("actions__option--selected");
  });

  it("calls onColorSelect with the code when a color is clicked", async () => {
    // given
    const onColorSelect = vi.fn();
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={null} selectedStorage={null}
        onColorSelect={onColorSelect} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // when
    await userEvent.click(screen.getByText("Black"));

    // then
    expect(onColorSelect).toHaveBeenCalledWith(1);
  });

  it("calls onAddToCart when the add button is clicked", async () => {
    // given
    const onAddToCart = vi.fn();
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={1} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={onAddToCart}
      />
    );

    // when
    await userEvent.click(screen.getByText("Añadir al carrito"));

    // then
    expect(onAddToCart).toHaveBeenCalled();
  });

  it("disables the add button when no color is selected", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={null} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Añadir al carrito")).toBeDisabled();
  });

  it("disables the add button when no storage is selected", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={1} selectedStorage={null}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Añadir al carrito")).toBeDisabled();
  });

  it("enables the add button when both color and storage are selected", () => {
    // given / when
    render(
      <Actions
        colors={colors} storages={storages}
        selectedColor={1} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Añadir al carrito")).toBeEnabled();
  });
});
