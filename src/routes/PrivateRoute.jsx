import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  if (user) {
    return children;
  }
};

export default PrivateRoute;
