import React, { useState } from "react";

import "./CandidateDetailsFeature.scss";
import { useSelector } from "react-redux";
import TabScreen from "./TabScreen/TabScreen";

import DetailsPageHeader from "../../components/CandidateDetailsHeader/CandidateDetailsHeader";
import NDrawer from "../../components/Drawer/NDrawer";
import { CANDIDATE_LIST_ID } from "../../constants";
import { drawerPayloadSelector } from "../../store/selectors/modalDrawerSelector";

const CandidateDetailsFeature = () => {
  const data = useSelector((state) => drawerPayloadSelector(state, CANDIDATE_LIST_ID));
  const [selectedItem, setSelectedItem] = useState("1");
  const onItemClickHandle = (id) => {
    setSelectedItem(id);
  };

  return (
    <NDrawer id={CANDIDATE_LIST_ID} extra={<DetailsPageHeader data={data} />}>
      <div className="candidate-detail-tab">
        <div className="courseTabs-container">
          <div
            className={`tabItem ${selectedItem === "1" ? "active" : ""}`}
            onClick={() => {
              onItemClickHandle("1");
            }}
          >
            Detail
          </div>
          <div
            className={`tabItem ${selectedItem === "2" ? "active" : ""}`}
            onClick={() => {
              onItemClickHandle("2");
            }}
          >
            Hiring Pipeline
          </div>
        </div>
        <TabScreen selectedItem={selectedItem} data={data} />
      </div>
    </NDrawer>
  );
};

export default CandidateDetailsFeature;
