import "./TabScreen.scss";

import DescriptionsTabScreen from "./DescritionsTabScreen.js/DescriptionsTabScreen";
import OpeningsTabScreen from "./OpeningsTabScreen/OpeningsTabScreen";

const tabScreen = {
  1: <DescriptionsTabScreen />,
  2: <OpeningsTabScreen />,
};

const TabScreen = ({ selectedItem }) => <div className="job-tab-screen">{tabScreen[selectedItem]}</div>;

export default TabScreen;
