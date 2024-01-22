import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { JOB_OPENINGS } from "../../../../store/actiontypes";
import { getAllJobOpenings } from "../../../../store/actions/genericTableActon";
import { getItemList } from "../../../../store/selectors/genericTableSelector";
import TableComp from "../../../../components/Table/Table";

import { JO_LIST_ID } from "../../../../constants";
import Pagination from "../../../../components/Pagination/Pagination";
import {
  updateLimit,
  updateOffset,
} from "../../../../store/actions/tablepropsAction";
import {
  getTableLimit,
  getTableOffset,
} from "../../../../store/selectors/tablepropsSelector";
import InputModal from "../../../../components/Modal/Modal";
import SubHeaderWithSearchAndButtons from "../../../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";
import AddJobOpening from "../../../InputForm/AddJobOpening";

const OpeningsTabScreen = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => getItemList(state, JOB_OPENINGS));
  const defaultValue = useSelector((state) => getTableLimit(state, JO_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, JO_LIST_ID));

  const changeDefaultValue = (value) => {
    dispatch(updateLimit({ id: JO_LIST_ID, limit: value[0].label, offset: 0 }));
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: JO_LIST_ID, offset: value }));
  };

  useEffect(() => {
    dispatch(getAllJobOpenings({ limit: defaultValue, offset: offSetValue }));
  }, []);
  console.log(tableData);

  const colums = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Team",
      dataIndex: "hiring_team",
      key: "team",
      render: (hiring_team) => hiring_team.name,
    },
    {
      title: "Hiring Manger ",
      dataIndex: "interviewers",
      key: "hiringmanger",
      render: (interviewers) => interviewers.map((user) => user.name),
    },
  ];
  const id = JO_LIST_ID;

  return (
    <div className="h-full">
      <SubHeaderWithSearchAndButtons id={id} />
      <div className="table-sb-pagination">
        <TableComp
          dataSource={tableData.results}
          columns={colums}
          loading={false}
        ></TableComp>
        <AddJobOpening />
        <Pagination
          defaultValue={defaultValue}
          onClickHandlerDefaultValue={changeDefaultValue}
          offSetValue={offSetValue}
          onClickHandlerOffSetValue={changeOffsetValue}
          userList={tableData}
        />
      </div>
    </div>
  );
};

export default OpeningsTabScreen;
