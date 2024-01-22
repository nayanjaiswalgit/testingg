/* eslint-disable linebreak-style */
import "./GMeetEventModal.scss";
import closeIcon from "../../assets/closeicon.svg";
import DateIcon from "../../assets/GMeetDateModal.svg";
import TimeIcon from "../../assets/GMeetTimeModal.svg";
import MeetIcon from "../../assets/icons/GmeetIcon.svg";
import CopyLinkIcon from "../../assets/copyGMeet.svg";
import ParticipantIcon from "../../assets/GMeetParticipant.svg";
import ParticipantDp from "../../assets/ParticipantDp.svg";
import OpenLinkIcon from "../../assets/GMOpenLink.svg";

const GMeetEventModal = () => {
  const jobTitle = "SDE Python";
  const InterviewInfo = "2nd Round - Nayan Jaiswal";
  const InterviewJDTitle = "Fresher - DU College";
  const InterviewDate = "TuesDay December 30, 2023";
  const InterviewTime = "2:00 - 3:00pm";

  const participantsObj = [
    {
      dp: ParticipantDp,
      name: "Roger Herwitz",
    },
    {
      dp: ParticipantDp,
      name: "Hampus Öberg",
    },
    {
      dp: ParticipantDp,
      name: "Öjvind Blomqvist",
    },
    {
      dp: ParticipantDp,
      name: "Carl Malm",
    },
    {
      dp: ParticipantDp,
      name: "Emil Jansson",
    },
  ];
  const handleCopyClip = (meetlink) => {
    navigator.clipboard.writeText(meetlink);
  };

  return (
    <div className="GMeetEventModal-wrapper">
      <div className="header">
        <div className="GMLink">
          <img src={OpenLinkIcon} alt="gm_link" />
        </div>
        <div className="Close Menu">
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
      <div className="job-Title">
        <span>JobTitle : {jobTitle}</span>
      </div>

      <div className="InterviewInfoBox">
        <div className="priorityBox">
          <div className="priority" />
        </div>
        <div className="InterviewInfo">
          <h2>{InterviewInfo}</h2>
          <h2>({InterviewJDTitle})</h2>
          <div className="DT-wrapper">
            <div className="DTBox">
              <img src={DateIcon} alt="Date" />
              <span>{InterviewDate}</span>
            </div>
            <div className="DTBox">
              <img src={TimeIcon} alt="Time" />
              <span>{InterviewTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="meetLink-wrapper">
        <div className="meetIcon">
          <img src={MeetIcon} alt="meet" />
        </div>
        <div className="btn-wrapper">
          <div
            className="meetBtn"
            onClick={() => {
              window.open("https://meet.google.com/ivr-duym-jdp", "_blank");
            }}
            target="_blank"
          >
            Join with Google Meet
          </div>
          <img
            src={CopyLinkIcon}
            alt="copy"
            onClick={() => handleCopyClip("https://meet.google.com/ivr-duym-jdp")
            }
          />
        </div>
      </div>

      <div className="MeetParticipants-wrapper">
        <div className="particapantIconBox">
          <img src={ParticipantIcon} alt="participants" />
        </div>
        <div className="ParticipantsList">
          <h2>{participantsObj.length} People</h2>
          {participantsObj.map((item, key) => (
            <div key={key} className="participant">
              <img src={item.dp} alt="dp" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GMeetEventModal.propTypes = {};

export default GMeetEventModal;
