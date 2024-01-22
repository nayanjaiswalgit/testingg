import React from "react";
import PropTypes from "prop-types";
import "./InterviewCalView.scss";
import CalViewComponent from "../CalViewComponent/CalViewComponent";
import EventSidePanel from "../EventSidePanel/EventSidePanel";

const InterviewCalView = (props) => (
    <div className="CV-container">
      <CalViewComponent />
      <EventSidePanel />
    </div>
);

InterviewCalView.propTypes = {};

export default InterviewCalView;
