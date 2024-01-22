import React, { useState } from "react";
import "./LinkHoverGMeet.scss";
import { useNavigate } from "react-router-dom";
import copyToClipIcon from "../../assets/icons/copyToClipboard.svg";
import gMeetIcon from "../../assets/icons/GmeetIcon.svg";
import { getInterviewTimimg } from "../../utils";
import { IRoundTitleMap } from "../../constants";

const LinkHoverGMeet = ({ data }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const interviewTitle = `${
    IRoundTitleMap[data.interview_round]
  } Interview with ${data.candidate.name}`;
  const interviewJobTitle = `${data.job_id.job_title}`;
  const meetlink = data.google_meet_link;
  const InterviewTiming = getInterviewTimimg(data.date);
  console.log(data);

  const handleCopyClip = (meetlink) => {
    setCopied(true);
    navigator.clipboard.writeText(meetlink);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const PersonProfileComponent = ({
    personArray,
    BlockhHeading,
    colorClass,
  }) => {
    const handlePersonClick = (id) => {
      navigate(`/profile/${id}`);
    };

    const getId = (url) => {
      const id = url.split("/").slice(-2, -1);
      return id;
    };
    return (
      <div className="interview-PersonBox">
        <h3 className="Interview-GroupHeading">{BlockhHeading}</h3>
        <div className="Inrerview-PersonEncloser">
          {personArray.map((person, idx) => (
              <div
                key={idx}
                className="PersonBlock"
                onClick={() => {
                  handlePersonClick(getId(person.url));
                }}
              >
                <div className={`PersonAvatar ${colorClass}`}>
                  <span>{person.name[0]}</span>
                </div>
                <div className="PersonNameBox">
                  <span>{person.name}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="LinkHover-Container"
      onClick={() => getInterviewTimimg(data.date)}
    >
      <h4>{interviewTitle}</h4>

      <div className="Link-hoverinterviewDetails">
        <h3 className="InterviewDetails">Job Title : {interviewJobTitle}</h3>
        <h3 className="InterviewTimingDetails">{InterviewTiming}</h3>
      </div>

      <PersonProfileComponent
        personArray={[data.candidate]}
        colorClass={"candColor"}
        BlockhHeading={"Candidate"}
      />
      <PersonProfileComponent
        personArray={data.interviewers}
        colorClass={"interviewerColor"}
        BlockhHeading={"Interviewers"}
      />

      <div className="interview-MeetLinkBox">
        <span>{meetlink}</span>
        <div
          className="copyToClipboard"
          onClick={() => handleCopyClip(meetlink)}
        >
          {copied && <span className="tooltiptext">Copied</span>}
          <img src={copyToClipIcon} alt="" />
        </div>
      </div>

      <div className="JoinMeetbtnEncloser">
        <a href={meetlink} className="JoinMeetBtn" target="_blank">
          <img src={gMeetIcon} alt="" />
          <h5>Join Meet Now</h5>
        </a>
      </div>
    </div>
  );
};

export default LinkHoverGMeet;
