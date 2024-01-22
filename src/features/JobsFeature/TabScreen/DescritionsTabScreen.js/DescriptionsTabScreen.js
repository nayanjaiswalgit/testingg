import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllJobDescriptions } from "../../../../store/actions/genericTableActon";
import { JOB_DESCRIPTIONS } from "../../../../store/actiontypes";
import TableComp from "../../../../components/Table/Table";
import { getItemList } from "../../../../store/selectors/genericTableSelector";
import { JD_LIST_ID } from "../../../../constants";
import {
  getTableLimit,
  getTableOffset,
} from "../../../../store/selectors/tablepropsSelector";
import {
  updateLimit,
  updateOffset,
} from "../../../../store/actions/tablepropsAction";
import Pagination from "../../../../components/Pagination/Pagination";
import AddJobDescription from "../../../InputForm/AddJobDescription";
import SubHeaderWithSearchAndButtons from "../../../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";

const DescriptionsTabScreen = () => {
  const tableData = useSelector((state) => getItemList(state, JOB_DESCRIPTIONS));
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => getTableLimit(state, JD_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, JD_LIST_ID));

  const changeDefaultValue = (value) => {
    dispatch(updateLimit({ id: JD_LIST_ID, limit: value[0].label, offset: 0 }));
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: JD_LIST_ID, offset: value }));
  };

  useEffect(() => {
    dispatch(
      getAllJobDescriptions({ limit: defaultValue, offset: offSetValue }),
    );
  }, [defaultValue, offSetValue]);

  const colums = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Watchers",
      dataIndex: "default_watchers",
      key: "watchers",
      render: (default_watchers) => default_watchers.map((user) => user.name),
    },
  ];

  const id = JD_LIST_ID;

  return (
    <>
      <SubHeaderWithSearchAndButtons id={id} />
      <div className="table-sb-pagination ">
        <TableComp
          dataSource={tableData.results}
          columns={colums}
          loading={false}
        ></TableComp>
        <AddJobDescription />
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

export default DescriptionsTabScreen;
