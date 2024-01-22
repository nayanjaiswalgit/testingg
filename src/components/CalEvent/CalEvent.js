import "./CalEvent.scss";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CalEventExtLinkIcon from "../../assets/external-link-cal_event.svg";
import CalEventEdit from "../../assets/CalEventEdit.svg";
import MeetTimeIcon from "../../assets/MeetTimeIcon.svg";
import { IRoundMap } from "../../constants";
import { getDateString, getInterviewEndTime } from "../../utils";
import LinkHoverGMeet from "../InterviewLinkHoverGMeet/LinkHoverGMeet";
import AvatarListComponent from "../AvatarList/AvatarListComponent";

const CalEvent = ({ data }) => {
  const candidateName = data.candidate.name;
  const interviewName = data.interviewers[0].name;
  const interviewDate = new Date(data.date);
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const meetLinkRef = useRef();
  const meetAvatarRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!meetLinkRef.current.contains(e.target)) {
        setIsLinkClicked(false);
      }
      if (!meetAvatarRef.current.contains(e.target)) {
        setIsAvatarClicked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLikHoverClick = () => {
    setIsLinkClicked(!isLinkClicked);
  };
  const handleAvatarClick = () => {
    setIsAvatarClicked(!isAvatarClicked);
  };

  return (
    <div className="CalEventContainer">
      <div className="CalEvent-Title_link_Box">
        <div className="CalEvent-Title">
          <p>Interview : {IRoundMap[data.interview_round]}</p>
        </div>
        <div className="CalEvent-linksBox">
          <div className="CalEvent-meetlink" ref={meetLinkRef}>
            <div onClick={handleLikHoverClick}>
              <img src={CalEventExtLinkIcon} />
              {isLinkClicked && (
                <div className="linkHover-Wrapper">
                  <LinkHoverGMeet
                    data={data}
                    getDateString={getDateString}
                    getInterviewEndTime={getInterviewEndTime}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="CalEvent-meetlink"
            onClick={() => console.log("EventEditClicked")}
          >
            <img src={CalEventEdit} />
          </div>
        </div>
      </div>
      <div className="CalEvent-TimeAndAvatarBox">
        <div className="CalEvent-MeetTimingContainer">
          <div className="CalEvent-Timing">
            <img src={MeetTimeIcon} />
            <p>
              {getDateString(interviewDate)} -{" "}
              {getInterviewEndTime(interviewDate)}
            </p>
          </div>
        </div>
        <div
          className="CalEvent-AvatarBox"
          ref={meetAvatarRef}
          onClick={handleAvatarClick}
        >
          {isAvatarClicked && (
            <div className="profileList-wrapper">
              <AvatarListComponent
                personArray={[data.candidate]}
                colorClass={"candColor"}
              />
              <AvatarListComponent
                personArray={data.interviewers}
                colorClass={"interviewerColor"}
              />
            </div>
          )}
          <div className="CalEventAvatar">
            <span>{candidateName[0]}</span>
          </div>
          <div className="CalEventAvatar allowOverlap">
            <span>{interviewName[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CalEvent.propTypes = {};

export default CalEvent;
