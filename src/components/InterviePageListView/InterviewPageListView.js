import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "./InterviewPageList.scss";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  CloseCircleOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getAllInterviews } from "../../store/actions/genericTableActon";
import { INTERVIEW_FEEDBACK, INTERVIEWS } from "../../store/actiontypes";
import { getItemList } from "../../store/selectors/genericTableSelector";

// components

import Pagination from "../Pagination/Pagination";
import TableComp from "../Table/Table";
import {
  updateLimit,
  updateOffset,
} from "../../store/actions/tablepropsAction";
import { INTERVIEW_LIST_ID } from "../../constants";
import {
  getTableLimit,
  getTableOffset,
} from "../../store/selectors/tablepropsSelector";
import { ThreeDotMenu } from "../ThreeDotMenu/ThreeDotMenu";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal";
import { openModal } from "../../store/actions/modalDrawerActions";
import { modalPayloadSelector } from "../../store/selectors/modalDrawerSelector";

const items = (data) => {
  const dispatch = useDispatch();
  return [
    {
      label: "View feedback",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => dispatch(openModal(INTERVIEW_FEEDBACK, data)),
    },
    {
      label: "Shortlist interview round 2",
      key: "2",
      icon: <UserOutlined />,
    },

    {
      label: "Reject",
      key: "3",
      icon: <CloseCircleOutlined />,
      danger: true,
      // disabled: true,
    },
  ];
};

const InterviewPageListView = (props) => {
  const tableData = useSelector((state) => getItemList(state, INTERVIEWS));
  const ivid = useSelector((state) => modalPayloadSelector(state, INTERVIEW_FEEDBACK));

  const defaultValue = useSelector((state) => getTableLimit(state, INTERVIEW_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, INTERVIEW_LIST_ID));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInterviews({ limit: defaultValue, offset: offSetValue }));
  }, [defaultValue, offSetValue]);

  const changeDefaultValue = (value) => {
    dispatch(
      updateLimit({ id: INTERVIEW_LIST_ID, limit: value[0].label, offset: 0 }),
    );
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: INTERVIEW_LIST_ID, offset: value }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "candidate",
      key: "candidate",
      render: (candidate) => `${candidate.name}`,
    },
    {
      title: "Job Titles",
      dataIndex: "job_id",
      key: "job_id",
      render: (job_id) => job_id.job_title,
    },
    {
      title: "Round",
      dataIndex: "interview_round",
      key: "interview_round",
    },
    {
      title: "Interviewer",
      dataIndex: "interviewers",
      key: "interviewer",
      render: (interview) => interview.map((interviewer) => `${interviewer.name}`).join(", "),
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },

    {
      title: " ",
      key: "action",
      render: (data) => <ThreeDotMenu items={items(data)} />,
    },
  ];

  return (
    <>
      <div className="table-sb-pagination ">
        <TableComp
          dataSource={tableData.results}
          columns={columns}
          loading={false}
        />
        {ivid && <FeedbackModal />}
        <Pagination
          defaultValue={defaultValue}
          onClickHandlerDefaultValue={changeDefaultValue}
          offSetValue={offSetValue}
          onClickHandlerOffSetValue={changeOffsetValue}
          userList={tableData}
        />
      </div>
    </>
  );
};

InterviewPageListView.propTypes = {};

export default InterviewPageListView;
