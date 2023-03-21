import { it, describe, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { SearchBar } from "../../components/SearchBar";

describe("SearchBar", () => {
  const { debug } = render(<SearchBar />);
  const input = screen.getByRole("combobox");
  it("should render", () => {
    expect(input).toBeDefined();
    expect(input).toHaveProperty("placeholder", "Search");
  });

  it("should not show options initially", () => {
    const list = screen.queryByRole("listbox");
    expect(list).toBeNull();
  });

  it("should show the correct amount of options when we start typing", () => {
    fireEvent.change(input, { target: { value: "ba" } });
    const list = screen.getByRole("listbox");
    const listItems = within(list).queryAllByRole("option");
    expect(listItems).not.toHaveLength(0);
    expect(listItems).toHaveLength(2);
  });

  it("should show no options when we provide an input that doesn't match", () => {
    fireEvent.change(input, { target: { value: "x" } });
    const list = screen.getByRole("listbox");
    const listItems = within(list).queryAllByRole("option");
    expect(listItems).toHaveLength(0);
  });
});
