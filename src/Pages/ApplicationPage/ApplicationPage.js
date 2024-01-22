import { useEffect, useState } from "react";
import "./ApplicationPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  MoreOutlined,
  SendOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CANDIDATE_LIST_ID } from "../../constants";
import { getAllCandidates } from "../../store/actions/applicationPageAction";
import {
  allCandSelector,
  candIsLoadingSelector,
} from "../../store/selectors/applicationPageSelector";
import {
  getTableLimit,
  getTableOffset,
  searchText,
  tableSelector,
} from "../../store/selectors/tablepropsSelector";
import TableComp from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import QuickFilterButtons from "../../components/QuickFilterButtons/QuickFilterButtons";
import SubHeaderWithSearchAndButtons from "../../components/SubHeaderWithSearchAndButtons/SubHeaderWithSearchAndButtons";
import CandidateDetailsFeature from "../../features/CandidateDetailsFeature/CandidateDetailsFeature";
import {
  updateLimit,
  updateOffset,
  updateSearchText,
} from "../../store/actions/tablepropsAction";
import { openDrawer } from "../../store/actions/modalDrawerActions";
import ApplicationForm from "./ApplicationForm";

import { ThreeDotMenu } from "../../components/ThreeDotMenu/ThreeDotMenu.js";
import { CustomSortIconAntd } from "../../components/CustomSortIconAntd/CustomSortIconAntd.js";

const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};
const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const items = [
  {
    label: "Edit",
    key: "1",
    icon: <EditOutlined />,
  },
  {
    label: "Shortlisted for online test",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Move to",
    key: "3",
    icon: <SendOutlined />,
    children: [
      {
        key: "3-1",
        label: "Shortlisted for Code Test",
        icon: <FilePdfOutlined />,
      },
      {
        key: "3-2",
        label: "Shortlisted for interview round 1",
        icon: <VideoCameraOutlined />,
      },
    ],
  },
  {
    label: "Delete",
    key: "4",
    icon: <DeleteOutlined />,
    danger: true,
    // disabled: true,
  },
  {
    label: "Reject",
    key: "",
    icon: <CloseCircleOutlined />,
    danger: true,
    // disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const ApplicationPage = () => {
  const dispatch = useDispatch();
  const candidateArray = useSelector(allCandSelector);
  const loading = useSelector(candIsLoadingSelector);
  const table_data = useSelector(tableSelector);
  const searchTextVal = useSelector(searchText);
  const defaultValue = useSelector((state) => getTableLimit(state, CANDIDATE_LIST_ID));
  const offSetValue = useSelector((state) => getTableOffset(state, CANDIDATE_LIST_ID));
  const [customSortActive, setCustomSortActive] = useState(false);

  useEffect(() => {
    dispatch(
      getAllCandidates({
        status: table_data.set_table_data,
        limit: defaultValue,
        offset: offSetValue,
        search: searchTextVal,
      }),
    );
  }, [table_data, defaultValue, offSetValue, searchTextVal, dispatch]);

  const showDrawer = (record) => {
    dispatch(openDrawer(CANDIDATE_LIST_ID, record));
  };

  const changeDefaultValue = (value) => {
    dispatch(
      updateLimit({ id: CANDIDATE_LIST_ID, limit: value[0].label, offset: 0 }),
    );
  };

  const changeOffsetValue = (value) => {
    dispatch(updateOffset({ id: CANDIDATE_LIST_ID, offset: value }));
  };

  const handleSearch = (searchText) => {
    dispatch(updateSearchText(searchText));
  };

  const filterButtons = [
    { text: "Applied", status: "new" },
    { text: "Shortlisted for interview", status: "shortlistround1" },
    { text: "Interview", status: "round1" },
  ];

  const candidateColumns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "name",
      onCell: (record) => ({
        onClick: () => showDrawer(record),
        style: {
          cursor: "pointer",
        },
      }),
    },
    {
      title: "Job Title",
      dataIndex: "jd",
      key: "jd",
      render: (jd) => jd.map((jdItem) => `${jdItem.title}`).join(", "),
      sorter: true,
      sortIcon: CustomSortIconAntd,
    },
    {
      title: "Application Date",
      dataIndex: "application_date",
      key: "application_date",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "exp",
    },

    {
      title: "Recruiter",
      dataIndex: "recruiter",
      key: "recruiter",
      render: (recruiter) => recruiter?.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: " ",
      key: "action",
      render: () => <ThreeDotMenu items={items} />,
    },
  ];

  const id = CANDIDATE_LIST_ID;
  const ApplicationPageContainer = () => (
    <div className="application-page-container">
      <div className="main-container">
        <SubHeaderWithSearchAndButtons id={id} onSearch={handleSearch} />
        <QuickFilterButtons filterButtons={filterButtons} />

        <TableComp
          dataSource={candidateArray.results}
          columns={candidateColumns}
          loading={loading}
        />

        <CandidateDetailsFeature />
      </div>
      <ApplicationForm />
      <Pagination
        defaultValue={defaultValue}
        onClickHandlerDefaultValue={changeDefaultValue}
        offSetValue={offSetValue}
        onClickHandlerOffSetValue={changeOffsetValue}
        userList={candidateArray}
      />
    </div>
  );

  return <ApplicationPageContainer />;
};

export default ApplicationPage;
