import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ViewSwitcher.scss";
import { useLocation } from "react-router-dom";
import ViewSListViewActive from "../../assets/icons/ViewSListViewActive.svg";
import ViewSListView from "../../assets/icons/ViewSListView.svg";
import ViewSCalView from "../../assets/icons/ViewSCalView.svg";
import ViewSCalViewActive from "../../assets/icons/ViewSCalViewActive.svg";

const ViewSwitcher = ({ currViewChange }) => {
  const location = useLocation();
  const path = location.pathname;
  const [active_view, setActive_view] = useState("list");
  useEffect(() => {
    const key = path.split("/");
    const activeView = key[2] ? key[2] : key[1];
    if (activeView === "interview") {
      currViewChange("list");
      setActive_view("list");
    } else {
      setActive_view("cal");
      currViewChange("cal");
    }
  }, []);
  const handleClickList = () => {
    currViewChange("list");
    setActive_view("list");
  };
  const handleClickCal = () => {
    setActive_view("cal");
    currViewChange("cal");
  };
  return (
    <div className="ViewSwitcher-Container">
      <div
        className={`View-Box  ${active_view === "list" ? "activeView" : ""}`}
        onClick={handleClickList}
      >
        <img
          src={active_view !== "list" ? ViewSListView : ViewSListViewActive}
          alt="ListView-Btn"
        />
      </div>
      <div
        className={`View-Box  ${active_view === "cal" ? "activeView" : ""}`}
        onClick={handleClickCal}
      >
        <img
          src={active_view !== "cal" ? ViewSCalView : ViewSCalViewActive}
          alt="CalView-Btn"
        />
      </div>
    </div>
  );
};

ViewSwitcher.propTypes = {};

export default ViewSwitcher;
