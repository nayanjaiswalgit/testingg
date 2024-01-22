import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./ActionButton.scss"; // Import your SCSS file

const ActionButton = () => {
  const [selected, setSelected] = useState(false);

  const handleButtonClick = () => {
    setSelected(!selected);
  };

  return (
    <button
      className={`action-button-normal ${
        selected ? "action-button-selected" : ""
      }`}
      onClick={handleButtonClick}
    >
      <span className="action-button-text">Action</span>

      <span>
        <FontAwesomeIcon icon={faChevronDown} className="action-button-icon" />
      </span>
    </button>
  );
};

export default ActionButton;
