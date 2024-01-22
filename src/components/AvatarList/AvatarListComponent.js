import React from "react";
import PropTypes from "prop-types";
import "./AvatarListComponent.scss";
import { useNavigate } from "react-router-dom";

export const AvatarListComponent = ({ personArray, colorClass }) => {
  const navigate = useNavigate();
  const handlePersonClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const getId = (url) => {
    const id = url.split("/").slice(-2, -1);
    return id;
  };
  return (
    <div className="interview-PersonListBox">
      <div className="Inrerview-PersonListEncloser">
        {personArray.map((person, idx) => (
            <div
              key={idx}
              className="PersonListBlock"
              onClick={() => {
                handlePersonClick(getId(person.url));
                console.log(getId(person.url));
              }}
            >
              <div className={`PersonListAvatar ${colorClass}`}>
                <span>{person.name[0]}</span>
              </div>
              <div className="PersonListNameBox">
                <span>{person.name}</span>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

AvatarListComponent.propTypes = {};

export default AvatarListComponent;
