import React from "react";
import PropTypes from "prop-types";

import "./JobsPage.scss";
import JobsFeature from "../../features/JobsFeature/JobsFeature";
import SubHeaderWithSearchAndButtons from "../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";

const JobsPage = (props) => (
    <div className="h-full w-full">
      <JobsFeature />
    </div>
);

JobsPage.propTypes = {};

export default JobsPage;
