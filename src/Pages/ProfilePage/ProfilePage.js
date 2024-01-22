import React from "react";
import PropTypes from "prop-types";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";

const ProfilePage = (props) => {
  const { id } = useParams();
  return <div>ProfilePage</div>;
};

ProfilePage.propTypes = {};

export default ProfilePage;
