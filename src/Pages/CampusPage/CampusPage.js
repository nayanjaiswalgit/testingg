import React from "react";
import PropTypes from "prop-types";
import "./CampusPage.scss";
import { CAMPUS } from "../../store/actiontypes";
import SubHeaderWithSearchAndButtons from "../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";
import TableComp from "../../components/Table/Table";
import InputModal from "../../components/Modal/Modal";

const CampusPage = (props) => {
  const id = CAMPUS;
  return (
    <div className="w-full">
      {" "}
      <SubHeaderWithSearchAndButtons id={id} />
      <TableComp></TableComp>
      <InputModal id={id}></InputModal>
    </div>
  );
};

CampusPage.propTypes = {};

export default CampusPage;
