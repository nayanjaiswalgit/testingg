// Button.jsx
import React, { useState } from "react";

import "./Button.scss";
import "./FilterButton.scss";

import { Button, Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileICon from "../../assets/ProfileIcon.svg";
import { AddIcon } from "../../assets/icon";
import { tableSelector } from "../../store/selectors/tablepropsSelector";
import { setButtonState } from "../../store/actions/tablepropsAction";

export const AddButton = ({ handleClick }) => (
    <Button
      type="Default"
      size="default"
      className="add-button"
      icon={<AddIcon />}
      onClick={handleClick}
    >
      <span className="add-button-text"> Add</span>
    </Button>
);

export const MoreFilterButton = () => {
  const dispatch = useDispatch();
  const table_data = useSelector(tableSelector);

  const handleMenuClick = (e) => {
    dispatch(setButtonState(e.key, !table_data[e.key]));
  };

  const menu_data = [
    "codetest",
    "testscheduled",
    "testcompleted",
    "shortlistround2",
    "round2",
    "shortlistround3",
    "round3",
    "hrround",
    "shortlistoffer",
    "offeraccepted",
    "joined",
    "onhold",
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menu_data.map((data) => (
        <Menu.Item
          className={table_data[data] ? "filter-button-selected" : ""}
          key={data}
          style={{ width: "200px" }}
        >
          {table_data[data] && (
            <span className="filter-button-icon">
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "white", paddingRight: "10px" }}
              />
            </span>
          )}
          <span className="filter-button-text">
            {data.charAt(0).toUpperCase() + data.substring(1)}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const selected = menu_data.some((key) => table_data[key]);

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button
        className={`filter-button-normal ${selected ? "filter-button-selected" : ""}`}
      >
        <span className="filter-button-text">More Filters</span>
        <span className="filter-button-icon">
          <FontAwesomeIcon
            icon={faChevronDown}
            style={selected ? { color: "white" } : { color: "26435C" }}
          />
        </span>
      </button>
    </Dropdown>
  );
};

export const InterviewerButton = ({ InterviewersName, navigatePath }) => {
  const navigate = useNavigate();
  const handleProfileBtnClick = () => {
    navigate(navigatePath);
  };
  return (
    <button className="InterviewerButton" onClick={handleProfileBtnClick}>
      <img src={ProfileICon} />
      <span>{InterviewersName}</span>
    </button>
  );
};

export const ScheduleInterviewButton = ({ onClickHandler }) => {
  const handleSInterviewBtnClick = () => {
    onClickHandler();
  };
  return (
    <button
      className="ScheduleInterviewButon"
      onClick={handleSInterviewBtnClick}
    >
      Schedule
    </button>
  );
};

export const ViewFeedbackBtn = ({ interviewId }) => {
  const handleViewFeedback = () => {
    console.log(interviewId);
  };
  return (
    <button className="viewFeedbackBtn" onClick={handleViewFeedback}>
      <span>View Feedback</span>
    </button>
  );
};
