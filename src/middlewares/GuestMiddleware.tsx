import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { pages } from "../App";

const GuestMiddleware = () => {
    const { isAuth } = useAuth();
    return !isAuth ? <Outlet /> : <Navigate to={pages.Profile.url} />
}
 
export default GuestMiddleware;