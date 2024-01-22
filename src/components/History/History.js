import "./History.scss";
import React from "react";

const History = ({ data }) => {
  const date = new Date(data.changed_on);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const fixedTime = date.toLocaleString("en-US", options);

  return (
    <div className="history-container">
      <div className="history-change-info">{data.change_info}</div>
      <div className="history-change-detail">
        <p>{data.changed_by} </p> <p>{fixedTime}</p>
      </div>
    </div>
  );
};

export default History;
