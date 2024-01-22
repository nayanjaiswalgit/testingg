import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideBar.scss";
import PropTypes from "prop-types";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { routePaths } from "../../constants/SideNavBarRoutes";

import collapseRIcon from "../../assets/icons/Collapse-r.svg";
import collapseLIcon from "../../assets/icons/Collapse-l.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";
import coriolisSign from "../../assets/coriolis-sign.png";
import { logoutUser } from "../../store/actions/authActions";
import { userSelector } from "../../store/selectors/authSelectors";

const SideBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;
  const key = path.split("/")[1];

  const userdata = useSelector(userSelector);

  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(key || "dashboard");
  const handlePathChange = (newKey) => {
    setSelected(newKey || "dashboard");
  };

  useEffect(() => {
    const newKey = path.split("/")[1];
    handlePathChange(newKey);
  }, [key]);

  const handleLogout = () => {
    dispatch(logoutUser(dispatch));
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleMenuItems = (event, path) => {
    setSelected(event.key);
    navigate(path);
  };
  const TriggerForCopplapse = ({ oncollapse }) => (
    <div className={`trigger-container ${oncollapse ? "d-f" : "d-g"}`}>
      <img
        className={`${!oncollapse ? "triggerimg" : "triggerimg-collapse"}`}
        src={oncollapse ? collapseRIcon : collapseLIcon}
      />
      {!oncollapse ? <span>Collapse</span> : ""}
    </div>
  );

  const LogoutFunctions = ({ oncollapse, handleLogout }) => (
    <div className="logout_user_actions">
      <div className="logoutActionsContainer">
        {!oncollapse
          ? userdata && (
              <span className="logout_username">{userdata?.name}</span>
          )
          : ""}
        <div
          className={`logoutAction ${oncollapse ? "d-f p-1" : "d-g "}`}
          onClick={handleLogout}
        >
          <img src={LogoutIcon} />
          {!oncollapse ? <p>Logout</p> : ""}
        </div>
      </div>
    </div>
  );
  const SideBarLogoTitle = ({ onCollapse }) => (
    <div className="sidebar_logo-title">
      <img src={coriolisSign} alt="Coriolis" />
      {!collapsed && <h2>CTHR</h2>}
    </div>
  );

  return (
    <Sider
      trigger={<TriggerForCopplapse oncollapse={collapsed} />}
      className="sider_class"
      collapsible
      width={"275px"}
      // collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        className="sidebar-menu"
        expandIcon={<img src={collapseRIcon} />}
        selectedKeys={selected}
        selectable={false}
      >
        <SideBarLogoTitle />
        <Menu.ItemGroup className="top-sideBarMenu-group">
          {routePaths.map((path) => (
            <MenuItem
              className="menuItem-container"
              title={path.name}
              id={path.key}
              data-testid={path.key}
              key={path.key}
              onClick={(e) => handleMenuItems(e, path.to)}
              style={{}}
            >
              <div
                className={`sideBarMenu-item ${
                  collapsed ? "sideBarMenu-collapsed" : ""
                }`}
              >
                <div className="sideBarMenu-icon">{path.icon}</div>
                {!collapsed ? (
                  <div className="sideBarMenu-name">
                    <label>{path.name}</label>
                  </div>
                ) : null}
              </div>
            </MenuItem>
          ))}
        </Menu.ItemGroup>

        <LogoutFunctions oncollapse={collapsed} handleLogout={handleLogout} />
      </Menu>
    </Sider>
  );
};

SideBar.propTypes = {};

export default SideBar;
