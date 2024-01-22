import { HashRouter } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/react";
import { userList, userListPreviousElseNextNull } from "../../tests/fixtures";
import { store } from "../../tests/store/mockStore";
import testRender from "../../tests/utils/testRender";
import Pagination from "./Pagination";

describe("Pagination", () => {
  test("it should render Pagination with click on nextPage, prevPage", async () => {
    const props = {
      defaultValue: 0, // limit value
      onClickHandlerDefaultValue: jest.fn(),
      totalCount: 4,
      offSetValue: 2, // offset value
      onClickHandlerOffSetValue: jest.fn(),
      userList,
    };
    const { baseElement } = testRender(
      <HashRouter>
        <Pagination {...props} />
      </HashRouter>,
      { store },
    );
    const nextPage = screen.getByTestId("nextPage");
    fireEvent.click(nextPage);
    const prevPage = screen.getByTestId("prevPage");
    fireEvent.click(prevPage);
    expect(baseElement).toMatchSnapshot();
  });
  test("it should render Pagination with props changed with userListPreviousElseNextNull", async () => {
    const props = {
      defaultValue: 3, // limit value
      onClickHandlerDefaultValue: jest.fn(),
      totalCount: 4,
      offSetValue: 2, // offset value
      onClickHandlerOffSetValue: jest.fn(),
      userList: userListPreviousElseNextNull,
    };
    const { baseElement } = testRender(
      <HashRouter>
        <Pagination {...props} />
      </HashRouter>,
      { store },
    );
    const nextPage = screen.getByTestId("nextPage");
    fireEvent.click(nextPage);
    const prevPage = screen.getByTestId("prevPage");
    fireEvent.click(prevPage);
    expect(baseElement).toMatchSnapshot();
  });
  test("it should render Pagination with total value, offeset value 0 and click on previous as null", async () => {
    const userListPreviousNull = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: "47e56d0c-b3c6-4a47-be2c-f664733ec8fc",
          last_login: null,
          created_at: "2023-07-31T09:06:28.965761Z",
          updated_at: "2023-08-02T03:50:27.448345Z",
          emp_id: "CTE-0336",
          user_name: "Candidate 1",
          email: "jhon.doe@coriolis.co.in",
          isArchive: false,
          allocated_Project: "CORP",
          mentor_id: 1,
          manager_id: 1,
          gitlab_workspace: "gurukul_workspace_jhon.doe",
          gitlab_username: "jhon.doe",
          role: 0,
        },
      ],
    };
    const props = {
      defaultValue: 0, // limit value
      onClickHandlerDefaultValue: jest.fn(),
      totalCount: 0,
      offSetValue: 0, // offset value
      onClickHandlerOffSetValue: jest.fn(),
      userList: userListPreviousNull,
    };
    const { baseElement } = testRender(
      <HashRouter>
        <Pagination {...props} />
      </HashRouter>,
      { store },
    );
    const prevPage = screen.getByTestId("prevPage");
    fireEvent.click(prevPage);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toMatchSnapshot();
  });
});
