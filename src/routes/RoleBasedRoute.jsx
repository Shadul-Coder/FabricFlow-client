import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { myRole, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  // Check if user's role is in allowedRoles array
  if (!allowedRoles.includes(myRole)) {
    // Redirect to dashboard home if not authorized
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleBasedRoute;
