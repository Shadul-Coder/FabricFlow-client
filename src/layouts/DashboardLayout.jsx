import { Link, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaPlusCircle,
  FaEdit,
  FaClock,
  FaCheckCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaUser,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, signOutuser } = useAuth();
  const { myRole, roleLoading } = useRole();
  const location = useLocation();

  // Define sidebar menus for each role with proper icons
  const sidebarMenus = {
    admin: [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/manage-users",
        name: "Manage Users",
        icon: <FaUsers className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/all-products",
        name: "All Products",
        icon: <FaBoxOpen className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/all-orders",
        name: "All Orders",
        icon: <FaClipboardList className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/profile",
        name: "My Profile",
        icon: <FaUser className="my-1.5 inline-block size-4" />,
      },
    ],
    manager: [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/add-product",
        name: "Add Product",
        icon: <FaPlusCircle className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/manage-products",
        name: "Manage Products",
        icon: <FaEdit className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/pending-orders",
        name: "Pending Orders",
        icon: <FaClock className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/approved-orders",
        name: "Approved Orders",
        icon: <FaCheckCircle className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/profile",
        name: "My Profile",
        icon: <FaUser className="my-1.5 inline-block size-4" />,
      },
    ],
    buyer: [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/my-orders",
        name: "My Orders",
        icon: <FaShoppingBag className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/track-order",
        name: "Track Order",
        icon: <FaMapMarkerAlt className="my-1.5 inline-block size-4" />,
      },
      {
        path: "/dashboard/profile",
        name: "My Profile",
        icon: <FaUser className="my-1.5 inline-block size-4" />,
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await signOutuser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (roleLoading) {
    return <Loading />;
  }

  const currentMenu = sidebarMenus[myRole] || [];
  const currentPage =
    currentMenu.find((item) => item.path === location.pathname)?.name ||
    "Dashboard";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 py-4">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <h1 className="text-lg font-semibold text-(--color-heading)">
              {currentPage}
            </h1>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="z-101 lg:z-99 drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-[73px] is-drawer-open:w-64">
          {/* Sidebar Menu */}
          <ul className="menu w-full grow p-4 space-y-1.5 text-primary">
            {currentMenu.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`active:bg-secondary is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    location.pathname === item.path
                      ? "active bg-primary text-primary-content"
                      : ""
                  }`}
                  data-tip={item.name}
                >
                  {item.icon}
                  <span className="is-drawer-close:hidden">{item.name}</span>
                </Link>
              </li>
            ))}

            {/* Logout Button */}
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary"
                data-tip="Logout"
              >
                <FaSignOutAlt className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
