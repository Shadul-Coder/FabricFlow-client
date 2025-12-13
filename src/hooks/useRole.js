import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useSecure from "./useSecure";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const secure = useSecure();
  const [myRole, setMyRole] = useState("buyer");
  const [myStatus, setMyStatus] = useState("pending");
  const [roleLoading, setRoleLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setRoleLoading(true);
        const response = await secure.get(`/users/${user.email}`);

        if (response.data) {
          setMyRole(response.data.role || "buyer");
          setMyStatus(response.data.status || "pending");
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError(error);
        setMyRole("buyer");
        setMyStatus("pending");
      } finally {
        setRoleLoading(false);
      }
    };

    if (!authLoading && user?.email) {
      fetchRole();
    } else if (!authLoading) {
      setRoleLoading(false);
    }
  }, [secure, user, authLoading]);

  return {
    myRole,
    myStatus,
    roleLoading,
    error,
    loading: authLoading || roleLoading,
    role: myRole,
    status: myStatus,
  };
};

export default useRole;
