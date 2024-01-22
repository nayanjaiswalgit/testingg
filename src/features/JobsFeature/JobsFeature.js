import { useState } from "react";
import "./JobsFeature.scss";
import TabScreen from "./TabScreen/TabScreen";

function JobsFeature() {
  const [selectedItem, setSelectedItem] = useState("1");

  const onItemClickHandle = (id) => {
    setSelectedItem(id);
  };
  return (
    <>
      <div className="JobsTabs-container">
        <div
          className={`tabItem ${selectedItem === "1" ? "active" : ""}`}
          onClick={() => {
            onItemClickHandle("1");
          }}
        >
          <span>Job Descriptions </span>
          <span className="job-info-span">10</span>
        </div>
        <div
          className={`tabItem ${selectedItem === "2" ? "active" : ""}`}
          onClick={() => {
            onItemClickHandle("2");
          }}
        >
          <span>Job Openings</span>
          <span className="job-info-span">20</span>
        </div>
      </div>
      <TabScreen selectedItem={selectedItem} />
    </>
  );
}

export default JobsFeature;
