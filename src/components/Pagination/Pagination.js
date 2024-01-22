import React from "react";
import "./Pagination.scss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuDropDown from "../MenuDropDown/MenuDropDown";

const Pagination = ({
  defaultValue,
  onClickHandlerDefaultValue,
  offSetValue,
  onClickHandlerOffSetValue,
  userList,
}) => {
  // Get the total count of items from the user list
  const totalCount = userList?.count;

  // Function to handle the next page button click
  const nextPage = () => {
    // Extract offset from the 'next' link using regex
    const offsetMatch = userList?.next?.match(/offset=(\d+)/);
    // If offset is found, convert it to an integer and trigger the callback
    const nextOffset = offsetMatch ? parseInt(offsetMatch[1], 10) : undefined;
    nextOffset !== undefined && onClickHandlerOffSetValue(nextOffset);
  };

  // Function to handle the previous page button click
  const prevPage = () => {
    // Extract offset from the 'previous' link using regex
    const offsetMatch = userList?.previous?.match(/offset=(\d+)/);
    // If offset is found, convert it to an integer and trigger the callback
    const prevOffset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
    onClickHandlerOffSetValue(prevOffset);
  };

  // Options for the items per page dropdown
  const option = [
    { label: 5, value: 0 },
    { label: 10, value: 1 },
    { label: 15, value: 2 },
    { label: 20, value: 3 },
    { label: 25, value: 4 },
    { label: 50, value: 5 },
    { label: 100, value: 6 },
  ];

  // Function to get the default value for the dropdown based on the selected value
  const getDefaultValue = () => option.find((o) => o.label === defaultValue);

  return (
    <div className="pagination-container">
      {/* Display the label for the items per page dropdown */}
      <p className="pageDetail">Items per page</p>
      {/* Items per page dropdown component */}
      <MenuDropDown
        options={option}
        defaultSelected={() => getDefaultValue()}
        onClickHandle={onClickHandlerDefaultValue}
      />
      {/* Display the current range of items being shown */}
      <p className="paraInfo1">{totalCount ? offSetValue : 0}</p>
      <p className="paraInfo">-</p>
      <p className="paraInfo">
        {/* Display the end range, ensuring it doesn't exceed the total count */}
        {Math.min(offSetValue + defaultValue, totalCount)}
      </p>
      <p className="paraInfo">of</p>
      {/* Display the total count of items */}
      <p className="paraInfo2">{totalCount}</p>
      {/* Button for navigating to the previous page */}
      <button
        onClick={prevPage}
        className="pagination-button-prev"
        data-testid="prevPage"
        disabled={offSetValue === 0} // Disable if already on the first page
      >
        <FontAwesomeIcon
          size="sm"
          icon={faChevronLeft}
          color={offSetValue > 0 ? "#222222" : "#ADACAA"}
        />
      </button>
      {/* Button for navigating to the next page */}
      <button
        onClick={nextPage}
        className="pagination-button-next"
        data-testid="nextPage"
        disabled={offSetValue + defaultValue >= totalCount} // Disable if already on the last page
      >
        <FontAwesomeIcon
          size="sm"
          icon={faChevronRight}
          color={
            offSetValue + defaultValue < totalCount ? "#222222" : "#ADACAA"
          }
        />
      </button>
    </div>
  );
};

export default Pagination;
