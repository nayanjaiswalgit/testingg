import { Navigate } from "react-router-dom";
import ApplicationPage from "../Pages/ApplicationPage/ApplicationPage";
import CampusPage from "../Pages/CampusPage/CampusPage";
import ClientPage from "../Pages/ClientPage/ClientPage";
import InterviewPage from "../Pages/InterviewPage/InterviewPage";
import JobsPage from "../Pages/JobsPage/JobsPage";
import TeamPage from "../Pages/TeamPage/TeamPage";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";

export const commonRoute = [
  {
    path: "/",
    element: <DashBoardPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
];

export const portalAdminRoute = [
  {
    path: "/",
    element: <h1>IN PROGRESS ...</h1>,
  },
  {
    path: "/application",
    element: <ApplicationPage />,
  },
  {
    path: "/campus",
    element: <CampusPage />,
  },
  {
    path: "/client",
    element: <ClientPage />,
  },
  {
    path: "/job",
    element: <JobsPage />,
  },
  {
    path: "/team",
    element: <TeamPage />,
  },
];
export const HRRoute = [
  {
    path: "/",
    element: <h1>IN PROGRESS ...</h1>,
  },
  {
    path: "/application",
    element: <ApplicationPage />,
  },
  {
    path: "/campus",
    element: <CampusPage />,
  },
  {
    path: "/client",
    element: <ClientPage />,
  },
  {
    path: "/job",
    element: <JobsPage />,
  },
  {
    path: "/team",
    element: <TeamPage />,
  },
  {
    path: "/interview",
    element: <InterviewPage />,
  },
];
export const InterviewerRoute = [
  {
    path: "/",
    element: <h1>IN PROGRESS ...</h1>,
  },
  {
    path: "/application",
    element: <ApplicationPage />,
  },
  {
    path: "/campus",
    element: <CampusPage />,
  },
  {
    path: "/client",
    element: <ClientPage />,
  },
  {
    path: "/job",
    element: <JobsPage />,
  },
  {
    path: "/team",
    element: <TeamPage />,
  },
];
