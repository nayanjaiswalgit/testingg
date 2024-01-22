import { fireEvent, screen } from "@testing-library/react";
import MenuDropDown from "./MenuDropDown";
import testRender from "../../tests/utils/testRender";
import { store } from "../../tests/store/mockStore";

// Mock onClickHandle function
const mockOnClickHandle = jest.fn();

const mockOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const mockDefaultSelected = { label: "Option 1", value: "option1" };
describe("MenuDropDown", () => {
  test("renders MenuDropDown component", () => {
    testRender(
      <MenuDropDown
        options={mockOptions}
        defaultSelected={mockDefaultSelected}
        onClickHandle={mockOnClickHandle}
      />,
      { store },
    );

    const dropdown = screen.queryByTestId("menu-dropdown");
    expect(dropdown).not.toBeNull();
  });

  test("opens dropdown on click", () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    testRender(
      <MenuDropDown
        options={mockOptions}
        defaultSelected={mockDefaultSelected}
        onClickHandle={mockOnClickHandle}
      />,
      { store },
    );

    const dropdownButton = screen.getByLabelText("Dropdown select");
    fireEvent.click(dropdownButton);
    const dropdown = screen.getByTestId("menu-dropdown");
    expect(dropdown).toBeVisible();
  });

  test("calls onClickHandle when an item is clicked", () => {
    testRender(
      <MenuDropDown
        options={mockOptions}
        defaultSelected={mockDefaultSelected}
        onClickHandle={mockOnClickHandle}
      />,
      { store },
    );

    const dropdownButton = screen.getByLabelText("Dropdown select");
    fireEvent.click(dropdownButton);

    const optionItem = screen.getByText("Option 2");
    fireEvent.click(optionItem);

    // Verify that onClickHandle has been called with the correct value
    expect(mockOnClickHandle).toHaveBeenCalledWith([
      {
        label: "Option 2",
        value: "option2",
      },
    ]);
  });
});
