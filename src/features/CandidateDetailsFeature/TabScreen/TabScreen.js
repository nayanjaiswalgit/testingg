import HiringPipelineTabScreen from "./HiringPipelineTabScreen/HiringPipelineTabScreen";
import "./TabScreen.scss";
import CandidateDetailsTab from "./CandidateDetailsTab/CandidateDetailsTab";

const tabScreen = {
  1: CandidateDetailsTab,
  2: HiringPipelineTabScreen,
};

const TabScreen = ({ selectedItem, data }) => {
  const SelectedTabScreen = tabScreen[selectedItem];

  return (
    <div className="candidate-tab-screen">
      <SelectedTabScreen data={data} />
    </div>
  );
};

export default TabScreen;
