import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, Component: DashboardHome },
          {
            path: "manage-users",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
