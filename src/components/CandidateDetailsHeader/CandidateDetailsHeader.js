import React from "react";
import avatarImg from "../../assets/icons/avatar_img.png";
import phoneIcon from "../../assets/icons/phone.svg";
import mailIcon from "../../assets/icons/email.svg";
import editIcon from "../../assets/icons/edit.svg";
import downloadIcon from "../../assets/icons/download.svg";
import "./CandidateDetailsHeader.scss";

const CandidateDetailsHeader = ({ data }) => (
    <div className="cdh-container">
      <div className="cdh-header-box">
        <div className="cdh-avatar-container">
          <img src={avatarImg} alt="Candidate Avatar" width="116px" />
        </div>
        <div className="cdh-details-container">
          <div className="cdh-detail-row">
            <span className="cdh-candidate-name">
              {`${data?.first_name} ${data?.last_name}`}
            </span>
          </div>
          {data?.contact_number && (
            <div className="cdh-detail-row">
              <span className="cdh-label">
                <img src={phoneIcon} alt="Phone Icon" />
              </span>
              <span className="cdh-value">{data?.contact_number}</span>
            </div>
          )}
          <div className="cdh-detail-row">
            <span className="cdh-label">
              <img src={mailIcon} alt="Mail Icon" />
            </span>
            <span className="cdh-value">{data?.email}</span>
          </div>
        </div>
      </div>
      <div className="cdh-actions">
        <a className="cdh-download-resume" href={data?.resume} download>
          <img src={downloadIcon} alt="Download Icon" />
        </a>
        <div className="cdh-edit-profile">
          <img src={editIcon} alt="Edit Icon" />
        </div>
      </div>
    </div>
);

export default CandidateDetailsHeader;
