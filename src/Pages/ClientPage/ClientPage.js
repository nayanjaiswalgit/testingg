import React, { useEffect } from "react";
import "./ClientPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../../store/selectors/genericTableSelector";
import { getAllClients } from "../../store/actions/genericTableActon";
import { CLIENTS } from "../../store/actiontypes";
import SubHeaderWithSearchAndButtons from "../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";
import TableComp from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import ClientForm from "./ClientForm";
import { CLIENT_LIST_ID } from "../../constants";
import {
  getTableLimit,
  getTableOffset,
} from "../../store/selectors/tablepropsSelector";
import {
  updateLimit,
  updateOffset,
} from "../../store/actions/tablepropsAction";

const ClientPage = () => {
  const tableData = useSelector((state) => getItemList(state, CLIENTS));

  const dispatch = useDispatch();

  const defaultValue = useSelector((state) => getTableLimit(state, CLIENT_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, CLIENT_LIST_ID));

  const changeDefaultValue = (value) => {
    dispatch(
      updateLimit({ id: CLIENT_LIST_ID, limit: value[0].label, offset: 0 }),
    );
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: CLIENT_LIST_ID, offset: value }));
  };

  useEffect(() => {
    dispatch(getAllClients({ limit: defaultValue, offset: offSetValue }));
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
      title: "Account Manager",
      dataIndex: "account_manager",
      key: "account_manger",
      render: (accountManger) => accountManger.name,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <div className="h-full w-full">
      <SubHeaderWithSearchAndButtons id={CLIENT_LIST_ID} />

      <ClientForm />
      <div className="table-sb-pagination">
        <TableComp
          dataSource={tableData.results}
          columns={columns}
          loading={false}
        />
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

ClientPage.propTypes = {};

export default ClientPage;
