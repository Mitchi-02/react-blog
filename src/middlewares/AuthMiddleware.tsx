import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { pages } from "../App";

const AuthMiddleware = () => {
    const { isAuth } = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={pages.Login.url} />
}
 
export default AuthMiddleware;