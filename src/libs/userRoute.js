import { Route } from "react-router-dom";
import { group } from "../constants/groups";
import {
  commonRoute,
  HRRoute,
  InterviewerRoute,
  portalAdminRoute,
} from "../constants/routes";

const GROUP_ROUTE = {
  user: commonRoute,
  PORTAL_ADMIN: portalAdminRoute,
  HR: HRRoute,
  INTERVIEWER: InterviewerRoute,
};
const getUserRoutes = (groups) => {
  // routes addition to the common routes
  const dynamicRoutes = [];
  const groupArr = [];

  // extracting the routes according to the user role
  groups?.forEach((item) => {
    dynamicRoutes.push(...GROUP_ROUTE[group[item.id]]);
    groupArr.push(item.id);
  });

  // a map to check whether the path is already added
  const uniquePathMaps = new Map();

  // overall routes available for a particular user
  // common routes + the specific routes for the user
  const allRoutes = [...commonRoute, ...dynamicRoutes];

  const filteredRoutes = allRoutes
    .map((obj) => {
      // check if path is mapped
      // if not then proceed
      if (!uniquePathMaps.has(obj.path)) {
        // mark as mapped
        uniquePathMaps.set(obj.path, true);

        // check if roles are hr or portaladmin
        if (
          (groupArr.includes(1) || groupArr.includes(2))
          && obj.path === "/"
        ) {
          return { ...obj, element: <h1> IN PROGRESS...</h1> };
        }

        return obj;
      }
      return null;
      // duplicate paths will be null
      // filtering out the not null paths
    })
    .filter((obj) => obj != null);

  return (
    <>
      {/* returning all the routes as per the user role */}
      {filteredRoutes.map((routeobj) => (
        <Route
          exact
          path={routeobj.path}
          element={routeobj.element}
          key={routeobj.path}
        />
      ))}
    </>
  );
};
export default getUserRoutes;
