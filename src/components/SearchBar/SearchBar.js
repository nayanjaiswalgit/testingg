/* eslint-disable quotes */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.scss";
import { searchText } from "../../store/selectors/tablepropsSelector";
import { updateSearchText } from "../../store/actions/tablepropsAction";

/* eslint-disable no-unused-vars */

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const searchTextVal = useSelector(searchText);
  const [IconActive, setIconActive] = useState(true);
  const [value, setValue] = useState(searchTextVal);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(updateSearchText(value));
    }
  };

  const handleInputChange = (e) => {
    const newSearchText = e.target.value;
    if (newSearchText === "") {
      dispatch(updateSearchText(newSearchText));
      return;
    }
    setValue(newSearchText);
  };
  return (
    <div data-testid="searchBar-container" className="searchBar-container">
      <div className="searchBar-input">
        <input
          type="text"
          placeholder="Search or filter results"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ fontSize: "14px", color: "#000", marginLeft: "15px" }}
        />

        {!IconActive && (
          <div
            data-testid={"cancelSearchButton"}
            className="cancelSearchButton"
            onClick={() => setIconActive((prevState) => !prevState)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}

        <div data-testid="searchBar-search" className="searchBar-search">
          <button
            data-testid="searchButton"
            className="searchButton"
            onClick={() => {
              onSearch(value);
              setIconActive((prevState) => !prevState);
            }}
          >
            {IconActive && (
              <FontAwesomeIcon icon={faSearch} style={{ fontWeight: "bold" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
