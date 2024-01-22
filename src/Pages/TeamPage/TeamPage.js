import React, { useEffect } from "react";
import "./TeamPage.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../../store/selectors/genericTableSelector";
import { TEAMS } from "../../store/actiontypes";
import { getAllTeams } from "../../store/actions/genericTableActon";
import TableComp from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import SubHeaderWithSearchAndButtons from "../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";
import InputModal from "../../components/Modal/Modal";
import { TEAM_LIST_ID } from "../../constants";
import {
  getTableLimit,
  getTableOffset,
} from "../../store/selectors/tablepropsSelector";
import {
  updateLimit,
  updateOffset,
} from "../../store/actions/tablepropsAction";
import TeamForm from "./TeamForm";

const TeamPage = (props) => {
  const id = TEAM_LIST_ID;
  const dispatch = useDispatch();
  const tableData = useSelector((state) => getItemList(state, TEAMS));

  const defaultValue = useSelector((state) => getTableLimit(state, TEAM_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, TEAM_LIST_ID));

  const changeDefaultValue = (value) => {
    dispatch(
      updateLimit({ id: TEAM_LIST_ID, limit: value[0].label, offset: 0 }),
    );
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: TEAM_LIST_ID, offset: value }));
  };
  useEffect(() => {
    dispatch(getAllTeams({ limit: defaultValue, offset: offSetValue }));
  }, [defaultValue, offSetValue]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (client) => client.name,
    },
    {
      title: "Hiring Manager",
      dataIndex: "manager",
      key: "manager",
      render: (accountManager) => accountManager.name,
    },
  ];
  return (
    <div className="h-full w-full">
      <SubHeaderWithSearchAndButtons id={id} />

      <InputModal id={id}>
        <TeamForm />
      </InputModal>
      <div className="table-sb-pagination">
        <TableComp
          dataSource={tableData.results}
          columns={columns}
          loading={false}
        ></TableComp>
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

TeamPage.propTypes = {};

export default TeamPage;
