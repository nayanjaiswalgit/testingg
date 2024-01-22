import { Descriptions } from "antd";
import React from "react";
import "./CandidateDetailsTab.scss";

// DetailsTabScreen component receives 'data' prop
const CandidateDetailsTab = ({ data }) => {
  // Helper function to format date
  const formattedDate = (date) => new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {/* Display Status information */}
      <Descriptions layout="vertical" column={2}>
        <Descriptions.Item label="Status" className="drawer-items-label">
          <div className="drawer-items-value">{data?.status}</div>
        </Descriptions.Item>
      </Descriptions>

      {/* Display Application date and Location information */}
      <Descriptions layout="vertical" column={2}>
        <Descriptions.Item
          label="Application date"
          className="drawer-items-label"
        >
          <div className="drawer-items-value">
            {formattedDate(data?.application_date)}
          </div>
        </Descriptions.Item>

        <Descriptions.Item label="Location" className="drawer-items-label">
          <div className="drawer-items-value">{data?.current_location}</div>
        </Descriptions.Item>
      </Descriptions>

      {/* Display Experience and Notice Period information */}
      <Descriptions layout="vertical" column={2}>
        <Descriptions.Item
          label="Experience (in Years)"
          className="drawer-items-label"
        >
          <div className="drawer-items-value">{data?.experience} </div>
        </Descriptions.Item>
        <Descriptions.Item
          label="Notice Period (in Days)"
          className="drawer-items-label"
        >
          <div className="drawer-items-value">{data?.notice_period || 0}</div>
        </Descriptions.Item>
      </Descriptions>

      {/* Display Additional Watchers and Job Description information */}
      <Descriptions layout="vertical" column={2}>
        {data?.additional_watchers.size === 0 && (
          <Descriptions.Item
            label="Additional Watchers"
            className="drawer-items-label"
          >
            <div className="drawer-items-value">
              {data?.additional_watchers?.map((data) => (
                <div key={data?.id}>{data?.first_name}</div>
              ))}
            </div>
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label="Job Description"
          className="drawer-items-label"
        >
          <div className="drawer-items-value">
            {data?.jd?.map((data) => (
              <div key={data?.id}>{data.title}</div>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>

      {/* Display Source, Campus, and Recruiter information */}
      {data?.source
        || data?.campus
        || (data?.recruiter && <div className="">Source</div>)}
      <Descriptions layout="vertical" column={2}>
        {data?.source && (
          <Descriptions.Item label="Source" className="drawer-items-label">
            <div className="drawer-items-value">{data?.source}</div>
          </Descriptions.Item>
        )}

        {data?.campus && (
          <Descriptions.Item label="Campus" className="drawer-items-label">
            <div className="drawer-items-value">{data?.campus}</div>
          </Descriptions.Item>
        )}

        {data?.recruiter && (
          <Descriptions.Item label="Recruiter" className="drawer-items-label">
            <div className="drawer-items-value">{data?.recruiter.name}</div>
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Display Private Info section */}
      <div className="items-name">Private Info</div>
      <Descriptions layout="vertical" column={2}>
        {/* Display Expected CTC information */}
        <Descriptions.Item label="Expected CTC" className="drawer-items-label">
          <div className="drawer-items-value">
            {data?.current_ctc || 0} LPA{" "}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Expected CTC" className="drawer-items-label">
          <div className="drawer-items-value">
            {data?.expected_ctc || 0} LPA
          </div>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default CandidateDetailsTab;
