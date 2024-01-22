import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => (localStorage.getItem("token") === null ? (
    <Navigate to="/login" />
) : (
    <Outlet />
));

export default PrivateRoute;
