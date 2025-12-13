// Update src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { myStatus, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user is suspended
  if (myStatus === "suspended") {
    // Show suspension message
    Swal.fire({
      icon: "error",
      title: "Account Suspended",
      text: "Your account has been suspended. Please contact admin.",
      confirmButtonText: "OK",
    });
    return <Navigate to="/" replace />;
  }

  // Check if user is pending (except for dashboard/profile page)
  if (
    myStatus === "pending" &&
    !location.pathname.includes("/dashboard/profile")
  ) {
    Swal.fire({
      icon: "warning",
      title: "Account Pending",
      text: "Your account is pending approval. You can only access your profile.",
      confirmButtonText: "OK",
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
