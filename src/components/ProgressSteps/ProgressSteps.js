import { Steps } from "antd";
import { CheckIcon } from "../../assets/icon";
import "./ProgressSteps.scss";

import React, { useEffect, useState } from "react";

function getApplicationStageNumber(inputString) {
  const stages = {
    Applied: 0,
    "Shortlisted for online test": 1,
    "Online test scheduled": 1,
    "Online test completed": 1,
    "Shortlisted for interview round 1": 2,
    "Interview 1 scheduled": 2,
    "Shortlisted for interview round 2": 2,
    "Interview 2 scheduled": 2,
    "Shortlisted for interview round 3": 2,
    "Interview 3 scheduled": 2,
    "Shortlisted for HR interview": 3,
    "HR interview scheduled": 3,
    "Shortlist to make offer": 4,
    "Offer made": 4,
    "Offer accepted": 4,
    Joined: 4,
    Rejected: 4,
    "On hold": 4,
    "Black Listed": 0,
  };

  return stages[inputString] || 0;
}

const ProgressSteps = (status) => {
  const [current, setCurrent] = useState(0);

  const current_state = getApplicationStageNumber(status.status);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevItem) => (prevItem < current_state + 1 ? prevItem + 1 : prevItem));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (step) => {
    setCurrent(step);
  };

  const { Step } = Steps;

  const stepsData = [
    {
      title: "Application",
      description: "Date : ",
      status: "process",
    },
    {
      title: "Resume Shortlisting",
      description: "Date : ",
    },
    {
      title: "Aptitude Test",
      description: "Date : ",
    },
    {
      title: "Technical Interview",
      description: "Date : ",
    },
    {
      title: "Hr Interview",
      description: "Date : ",
    },
    {
      title: "Offer",
      description: "Date : ",
    },
  ];

  const DoneIcon = () => (
      <div className="step-done-icon-container ">
        <div className="step-done-icon">
          <CheckIcon />
        </div>
      </div>
  );
  const NotDoneIcon = () => (
      <div className="step-not-done-icon">
        <div className="step-not-done-icon-inside"></div>
      </div>
  );

  const ProcessIcon = () => (
      <div className="step-process-done-icon">
        <div className="step-process-done-icon-inside"></div>
      </div>
  );

  return (
    <div>
      {" "}
      <Steps size="small" current={current} direction="vertical">
        {stepsData.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            description={step.description}
            icon={
              index === current ? (
                <ProcessIcon />
              ) : index < current ? (
                <DoneIcon />
              ) : (
                <NotDoneIcon />
              )
            }
            status={index === current ? step.status : null}
            // onClick={() => handleStepClick(index)}
          />
        ))}
      </Steps>
    </div>
  );
};

export default ProgressSteps;
