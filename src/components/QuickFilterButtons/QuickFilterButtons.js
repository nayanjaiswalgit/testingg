import React from "react";
import FilterButton from "../Button/FilterButton";
import { MoreFilterButton } from "../Button/Button";
import "./QuickFilterButtons.scss";

const QuickFilterButtons = ({ filterButtons }) => (
  <div className="quick-filter-container">
    <div className="applied-filter">
      {filterButtons.map((buttonData) => (
        <FilterButton buttonKey={buttonData.status} text={buttonData.text} />
      ))}
      <MoreFilterButton />
    </div>
  </div>
);

export default QuickFilterButtons;
