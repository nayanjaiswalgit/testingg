import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Spinner.scss";

const Spinner = ({ small, text, color }) => {
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: small ? 16 : 20, color: color || "" }}
      spin
    />
  );

  return (
    <div className="spinner" data-testid="spinner-load">
      <Spin indicator={antIcon} data-testid="anticon-loading" />
      {!small && (
        <div
          className="loading-font"
          style={{ color: color || "rgb(0, 110, 255)" }}
        >
          {text || "Loading"}
        </div>
      )}
    </div>
  );
};

export default Spinner;
