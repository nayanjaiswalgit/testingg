// eslint-disable-next-line no-unused-vars
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import constants from "../constants";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ApplicationPage from "../Pages/ApplicationPage/ApplicationPage";
import CampusPage from "../Pages/CampusPage/CampusPage";
import ClientPage from "../Pages/ClientPage/ClientPage";

import InterviewPage from "../Pages/InterviewPage/InterviewPage";
import JobsPage from "../Pages/JobsPage/JobsPage";
import TeamPage from "../Pages/TeamPage/TeamPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import { getUserRoutes } from "./userRoute";
import Layouts from "../components/Layouts/Layouts";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";
import InterviewerProfilePage from "../Pages/InterviewerProfilePage/InterviewerProfilePage";
import InterviewPageListView from "../components/InterviePageListView/InterviewPageListView";
import InterviewCalView from "../components/IPageCalView/InterviewCalView";

const appRoutes = (groups) => createHashRouter(
  createRoutesFromElements(
      <>
        <Route exact path={constants.LOGIN_PAGE_URL} element={<LoginPage />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Layouts groups={groups} />}>
            {/* {getUserRoutes(groups)} */}
            <Route exact path="/" element={<DashBoardPage />} />
            <Route exact path="/application" element={<ApplicationPage />} />
            <Route exact path="/campus" element={<CampusPage />} />
            <Route exact path="/client" element={<ClientPage />} />
            <Route exact path="/interview" element={<InterviewPage />}>
              <Route
                exact
                path="/interview/"
                element={<InterviewPageListView />}
              />
              <Route
                exact
                path="/interview/calview"
                element={<InterviewCalView />}
              />
            </Route>
            <Route
              exact
              path="/interviewerprofile/:id"
              element={<InterviewerProfilePage />}
            />
            <Route exact path="/job" element={<JobsPage />} />
            <Route exact path="/team" element={<TeamPage />} />
            <Route exact path="/profile/:id" element={<ProfilePage />} />
            <Route exact path="/team" element={<TeamPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<PublicRoute />} />
      </>,
  ),
);

export default appRoutes;
