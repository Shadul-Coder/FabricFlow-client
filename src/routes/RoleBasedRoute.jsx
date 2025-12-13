import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { myRole, roleLoading } = useRole();
  const { user } = useAuth();

  if (roleLoading) {
    return <Loading />;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user's role is in allowedRoles array
  if (!allowedRoles.includes(myRole)) {
    // Redirect to dashboard home if not authorized
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleBasedRoute;
