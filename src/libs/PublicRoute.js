import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => (localStorage.getItem("token") === null ? (
    <Navigate to="/login" />
) : (
    <Outlet />
));

export default PublicRoute;
