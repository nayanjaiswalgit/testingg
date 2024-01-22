import React from "react";
import History from "../../../../components/History/History";
import ProgressSteps from "../../../../components/ProgressSteps/ProgressSteps";
import Comments from "../../../../components/Comments/Comments";

import "./HiringPipelineTabScreen.scss";
import { Avatar, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const HiringPipelineTabScreen = ({ data }) => (
    <div className="hptabscreen-main-container">
      <div className="hptabscreen-left-container">
        <div className="hptabscreen-history-container">
          <div className="hptabscreen-heading">History</div>
          <div className="hptabscreen-history-contain">
            {data.short_history.slice(0, 3).map((data, index) => (
              <History key={index} data={data} />
            ))}
          </div>
        </div>
        {data.comments.length > 0 && (
          <div className="hptabscreen-Comments-container">
            <div className="hptabscreen-heading">Comments</div>
            <div className="hptabscreen-comments-contain">
              {data.comments.slice(0, 2).map((data, index) => (
                <Comments key={index} data={data} />
              ))}
            </div>
            <div className="post-comment">
              <div>
                {" "}
                <Avatar
                  style={{ backgroundColor: "#F74C4C " }}
                  icon={<UserOutlined />}
                />
              </div>
              <Input placeholder="Add a Comment..." bordered={false} />
              <Button
                type="primary"
                shape="circle"
                className="post-comment-button"
              >
                {" "}
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="hptabscreen-right-container">
        <ProgressSteps status={data.status} />
      </div>
    </div>
);
export default HiringPipelineTabScreen;
