import React from "react";
import PropTypes from "prop-types";
import "./ActionMenu.scss";
import DeleteIcon from "../../assets/DeleteIcon.svg";

const ActionMenu = ({ MenuActionsObj }) => (
    <div className="actionMenuWrapper">
      {MenuActionsObj.map((action, key) => (
          <div key={key} className="actionBox" onClick={action.onClick}>
            <div className="actionIcon">
              {action.icon ? (
                <img src={action.icon} alt={action.label} />
              ) : (
                <></>
              )}
            </div>
            <h5 className="ActionText">{action.label}</h5>
          </div>
      ))}
    </div>
);

ActionMenu.propTypes = {};

export default ActionMenu;
