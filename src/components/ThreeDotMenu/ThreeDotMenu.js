import React from "react";
import { Dropdown, Menu } from "antd";
import "./ThreeDotMenu.scss";
import { MoreOutlined } from "@ant-design/icons";

/**
 * ThreeDotMenu Component
 * @param {Object} props - The component props
 * @param {Array} props.items - The items to be displayed in the menu
 * @returns {JSX.Element|null} - The ThreeDotMenu component JSX
 */
export const ThreeDotMenu = ({ items }) => {
  // Check if 'items' prop is missing or not an array
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.error("ThreeDotMenu: 'items' prop is missing or not an array");
    return null; // or return some default content
  }

  return (
    // Container for the three-dot menu
    <div className="three-dot-menu">
      {/* Ant Design Dropdown component */}
      <Dropdown menu={{ items }} placement="bottomRight">
        {/* Three dots icon */}
        <MoreOutlined style={{ fontSize: "20px" }} />
      </Dropdown>
    </div>
  );
};
