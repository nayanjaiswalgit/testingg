import React from "react";

const DashBoardPage = () => (
  <div className="dashboard-wrapper">
    <div className="main-container">
      <div className="left-container">
        <div className="job-opening-container">
          <div className="section-header">Job Openings</div>
          <div className="section-content">
            <div className="donut-chart"></div>
            <div className="label"></div>
          </div>
        </div>
        <div className="hiring-pipeline-container">
          <div className="section-header">Hiring Pipeline</div>
          <div className="section-content">
            <div className="bar-chart"></div>
            <div className="label"></div>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="interview-container">
          <div className="section-header">Interview</div>
          <div className="section-content"></div>
        </div>
        <div className="recruiter-container">
          <div className="section-header">Recruiter Performance</div>
          <div className="section-content"></div>
        </div>
      </div>
    </div>
  </div>
);

export default DashBoardPage;
