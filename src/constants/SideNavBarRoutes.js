import applicationIcon from "../assets/icons/application.svg";
import campusIcon from "../assets/icons/campus.svg";
import clientIcon from "../assets/icons/client.svg";
import dashboardIcon from "../assets/icons/Dashboard.svg";
import jobIcon from "../assets/icons/job.svg";
import teamIcon from "../assets/icons/team.svg";
import interviewIcon from "../assets/icons/interview.svg";

export const routePaths = [
  {
    to: "/",
    name: "Dashboard",
    key: "dashboard",
    icon: <img src={dashboardIcon} className="imgClass" />,
  },
  {
    to: "/application",
    name: "Application",
    key: "application",
    icon: <img src={applicationIcon} className="imgClass" />,
  },
  {
    to: "/interview",
    name: "Interview",
    key: "interview",
    icon: <img src={interviewIcon} className="imgClass" />,
  },
  {
    to: "/job",
    name: "Job",
    key: "job",
    icon: <img src={jobIcon} className="imgClass" />,
  },
  {
    to: "/team",
    name: "Team",
    key: "team",
    icon: <img src={teamIcon} className="imgClass" />,
  },
  {
    to: "/client",
    name: "Client",
    key: "client",
    icon: <img src={clientIcon} className="imgClass" />,
  },
  {
    to: "/campus",
    name: "Campus",
    key: "campus",
    icon: <img src={campusIcon} className="imgClass" />,
  },
];
