import React from "react";
import "./MainHeader.scss";
import { Breadcrumb, Dropdown } from "antd";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HeaderTextMap } from "../../constants";
import { userSelector } from "../../store/selectors/authSelectors";

const MainHeader = () => {
  const location = useLocation();
  const path = location.pathname;
  const key = path.split("/");
  const HeaderText = HeaderTextMap[key[1]] || "Dashboard";
  const userdata = useSelector(userSelector);
  const items = [
    {
      key: "1",
      label: "profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="header-container">
      <div className="page-tittle">
        <span className="breadcrumb ">
          <Breadcrumb
            className="page-tittle-name"
            separator=">"
            items={[
              {
                title: HeaderText,
              },
              {
                title: "",
              },
            ]}
          />
        </span>
      </div>
      <div className="right-container">
        <div className="notification-icon-container">
          {/* <Space size="large">
            <Badge count={9} color="#B60000">
              <Avatar
                className="alert-box"
                shape="square"
                size="large"
                icon={
                  <FontAwesomeIcon
                    icon={faBell}
                    style={{ color: "#1A2B3C", fontSize: "1.2rem" }}
                  />
                }
              />
            </Badge>
          </Space> */}
        </div>
        <div className="profile-photo-container">
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <img
              src={userdata?.picture}
              className="profile-photo"
              alt="google-avatar"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
