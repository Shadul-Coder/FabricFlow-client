import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute"; // We'll create this next

// Import page components (create placeholder components for now)
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
// import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
// import AllProducts from "../pages/Dashboard/Admin/AllProducts";
// import AllOrders from "../pages/Dashboard/Admin/AllOrders";
// import AddProduct from "../pages/Dashboard/Manager/AddProduct";
// import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
// import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
// import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
// import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
// import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
// import Profile from "../pages/Dashboard/Profile";

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
          // // Admin Routes
          // {
          //   path: "manage-users",
          //   element: <RoleBasedRoute allowedRoles={["admin"]} />,
          //   children: [{ index: true, Component: ManageUsers }],
          // },
          // {
          //   path: "all-products",
          //   element: <RoleBasedRoute allowedRoles={["admin"]} />,
          //   children: [{ index: true, Component: AllProducts }],
          // },
          // {
          //   path: "all-orders",
          //   element: <RoleBasedRoute allowedRoles={["admin"]} />,
          //   children: [{ index: true, Component: AllOrders }],
          // },
          // // Manager Routes
          // {
          //   path: "add-product",
          //   element: <RoleBasedRoute allowedRoles={["manager"]} />,
          //   children: [{ index: true, Component: AddProduct }],
          // },
          // {
          //   path: "manage-products",
          //   element: <RoleBasedRoute allowedRoles={["manager"]} />,
          //   children: [{ index: true, Component: ManageProducts }],
          // },
          // {
          //   path: "pending-orders",
          //   element: <RoleBasedRoute allowedRoles={["manager"]} />,
          //   children: [{ index: true, Component: PendingOrders }],
          // },
          // {
          //   path: "approved-orders",
          //   element: <RoleBasedRoute allowedRoles={["manager"]} />,
          //   children: [{ index: true, Component: ApprovedOrders }],
          // },
          // // Buyer Routes
          // {
          //   path: "my-orders",
          //   element: <RoleBasedRoute allowedRoles={["buyer"]} />,
          //   children: [{ index: true, Component: MyOrders }],
          // },
          // {
          //   path: "track-order",
          //   element: <RoleBasedRoute allowedRoles={["buyer"]} />,
          //   children: [{ index: true, Component: TrackOrder }],
          // },
          // {
          //   path: "track-order/:orderId",
          //   element: <RoleBasedRoute allowedRoles={["buyer"]} />,
          //   children: [{ index: true, Component: TrackOrder }],
          // },
          // // Shared Routes
          // {
          //   path: "profile",
          //   element: (
          //     <RoleBasedRoute allowedRoles={["admin", "manager", "buyer"]} />
          //   ),
          //   children: [{ index: true, Component: Profile }],
          // },
        ],
      },
    ],
  },
]);

export default router;
