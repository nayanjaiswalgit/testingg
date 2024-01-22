import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./EventSidePanel.scss";
import { useDispatch, useSelector } from "react-redux";
import CalEvent from "../CalEvent/CalEvent";

// Redux
// Import Redux dependencies, actions, selectors, and constants
import { INTERVIEWS } from "../../store/actiontypes";

import { getItemList } from "../../store/selectors/genericTableSelector";
import { getAllInterviews } from "../../store/actions/genericTableActon";
import { getSelectedDate } from "../../store/selectors/interviewSelector";

const EventSidePanel = (props) => {
  // Redux

  // Initialize Redux dispatch hook
  const dispatch = useDispatch();

  // Get the selectedDate from Redux state
  const selectedDate = useSelector(getSelectedDate);

  // Get  interviews based on Selected Date
  const onThatDay = useSelector((state) => getItemList(state, INTERVIEWS));

  // useEffect: Fetch interviews when selectedDate changes
  useEffect(() => {
    // Dispatch action to get interviews for the selected month and year

    dispatch(getAllInterviews({ ...selectedDate }));
  }, [selectedDate]);

  // Log the selectedDate,
  console.log("onThatDay", onThatDay);

  return (
    <div className="EventSidePanel-Wrapper">
      <div className="sidePanel-Header">
        <h4>Today's Events</h4>
        <span>14th Nov 2023</span>
      </div>

      <div className="EventList-Container">
        {onThatDay?.count > 0 ? (
          onThatDay.results.map((data, idx) => <CalEvent data={data} key={idx} />)
        ) : (
          <span>No Interviews For this Date</span>
        )}
      </div>
    </div>
  );
};

EventSidePanel.propTypes = {};

export default EventSidePanel;
