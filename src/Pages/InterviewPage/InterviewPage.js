// import { useEffect } from "react";
// scss
import "./InterviewPage.scss";

// components
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import ViewSwitcher from "../../components/ViewSwitcher/ViewSwitcher";
import { ScheduleInterviewButton } from "../../components/Button/Button";

// state
import CreateInterviewForm from "./CreateInterviewForm";
import { openModal } from "../../store/actions/modalDrawerActions";
import { INTERVIEW_LIST_ID } from "../../constants";

const InterviewPage = () => {
  const navigate = useNavigate();
  const [currView, setCurrView] = useState("list");

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(openModal(INTERVIEW_LIST_ID));
  };

  const currViewChange = (newView) => {
    setCurrView(newView);

    if (newView === "list") {
      navigate("/interview");
    } else {
      navigate("/interview/calview");
    }
  };
  return (
    <div className="InterviewPage-Container">
      <div className="InterviewPage-subheader">
        <SearchBar />
        <ViewSwitcher currViewChange={currViewChange} />
        <ScheduleInterviewButton onClickHandler={onClickHandler} />
      </div>
      <CreateInterviewForm />
      <Outlet />
    </div>
  );
};

InterviewPage.propTypes = {};

export default InterviewPage;
