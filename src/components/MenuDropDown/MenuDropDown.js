import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MenuDropDown.scss";
import Select from "react-dropdown-select";

function MenuDropDown(props) {
  const {
    options,
    defaultSelected,
    onClickHandle,
    dropdownPosition = "auto",
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  // Toggle the dropdown open/closed
  const toggleDropdown = (toggleState) => {
    setIsOpen(toggleState);
  };

  // Handle item click
  const handleItemClick = (value) => {
    if (isOpen) {
      setIsOpen(false);
      onClickHandle(value);
    }
  };

  // Update selected value when defaultSelected prop changes
  useEffect(() => {
    setSelectedValue(defaultSelected);
  }, [defaultSelected]);

  return (
    <div data-testid="menu-dropdown">
      <Select
        {...props}
        values={[{ ...selectedValue }]}
        onDropdownOpen={() => toggleDropdown(true)}
        onDropdownClose={() => toggleDropdown(false)}
        className="menu-dropdown"
        options={options}
        onChange={(value) => handleItemClick(value)}
        dropdownPosition={dropdownPosition}
        backspaceDelete={false}
        searchable={false}
      />
    </div>
  );
}

MenuDropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSelected: PropTypes.any.isRequired,
  onClickHandle: PropTypes.func.isRequired,
};

export default MenuDropDown;
