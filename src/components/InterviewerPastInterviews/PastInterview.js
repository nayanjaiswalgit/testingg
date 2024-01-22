import React from "react";
import "./PastInterview.scss";
import { InterviewerButton, ViewFeedbackBtn } from "../Button/Button";

const PastInterview = ({ pastInterviews }) => {
  const InterviewTitle = "Python Full Stack";
  const InterviewRound = 1;
  const CandidateName = "Vishal Sharma";
  const CandComment = " Good knowledge of the DSA and  OS";
  const InterviewDate = "22 March 2023";
  const InterviewTime = "11:00 am - 12:00 pm";
  const PastInterviewers = [
    {
      InterviewerName: "Ankit Upadhyay",
      navigatePath: "interviewerprofile/3",
    },
    {
      InterviewerName: "Amit Vishkarma",
      navigatePath: "interviewerprofile/4",
    },
    {
      InterviewerName: "Amit Vishkarma",
      navigatePath: "interviewerprofile/4",
    },
  ];

  const PastInterviewCard = ({ interview }) => (
      <div className="PastInterviewCard">
        <div className="InterviewDetails_CommnetBox">
          <h3>
            {interview.InterviewTitle} -{" "}
            <span>Round {interview.InterviewRound}</span>
          </h3>
          <p>
            <span>Candidate : </span> {interview.CandidateName}
          </p>
          <p>
            <span>Other Interviewers : </span>
            {interview.PastInterviewers.map((obj, key) => (
                <InterviewerButton
                  key={key}
                  InterviewersName={obj.InterviewerName}
                  navigatePath={obj.navigatePath}
                />
            ))}
          </p>
          <p>
            <span>Comment : </span> {interview.CandComment}
          </p>
        </div>
        <div className="interviewTime_Feedback">
          <div className="interviewDateTimeBox">
            <p>{interview.InterviewDate}</p>
            <p>{interview.InterviewTime}</p>
          </div>
          <ViewFeedbackBtn interviewId={1} />
        </div>
      </div>
  );

  return (
    <div className="PastInterviewsWrapper">
      {pastInterviews.map((obj) => <PastInterviewCard key={obj.id} interview={obj} />)}
    </div>
  );
};

export default PastInterview;
