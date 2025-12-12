import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "/logo.png";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { LuCircleUser } from "react-icons/lu";

const Navbar = () => {
  const { theme, setTheme, user, signOutuser } = useAuth();
  const themeButton1 = useRef(null);
  const themeButton2 = useRef(null);

  useEffect(() => {
    // Check if refs are initialized before accessing
    if (theme === "dark") {
      if (themeButton1.current) {
        themeButton1.current.checked = true;
      }
      if (themeButton2.current) {
        themeButton2.current.checked = true;
      }
    }
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  };

  const handleSignOut = async () => {
    try {
      await signOutuser();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const menuItems = (
    <>
      <Link
        to="/"
        className="font-medium text-(--color-heading) hover:text-(--color-primary) transition-colors"
      >
        Home
      </Link>
      <Link
        to="/all-products"
        className="font-medium text-(--color-heading) hover:text-(--color-primary) transition-colors"
      >
        All Products
      </Link>
      <Link
        to="/about"
        className="font-medium text-(--color-heading) hover:text-(--color-primary) transition-colors"
      >
        About Us
      </Link>
      <Link
        to="/contact"
        className="font-medium text-(--color-heading) hover:text-(--color-primary) transition-colors"
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="backdrop-blur-md bg-base-100/80 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-[95%] sm:w-[97%]">
        <div className="flex justify-between items-center py-4">
          {/* Logo on Left */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img src={logo} alt="FabricFlow Logo" className="h-[55px]" />
              <h1 className="text-2xl font-bold text-(--color-heading) hidden sm:block">
                FabricFlow
              </h1>
            </Link>
          </div>

          {/* Desktop Right Side - Menu Items and User Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Links on Right */}
            <div className="flex items-center gap-8">{menuItems}</div>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
              >
                {/* User Photo or Icon */}
                {user ? (
                  <div className="h-12 w-12 rounded-full border-2 border-primary overflow-hidden bg-base-300">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-full w-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary text-primary-content text-lg font-semibold">
                        {user.displayName?.charAt(0) ||
                          user.email?.charAt(0) ||
                          "U"}
                      </div>
                    )}
                  </div>
                ) : (
                  <LuCircleUser className="text-[40px] text-primary" />
                )}
                <IoIosArrowDown className="text-lg text-(--color-heading)" />
              </div>
              <div
                tabIndex="-1"
                className="dropdown-content menu mt-1.5 border border-gray-200 rounded-2xl bg-base-100 p-4 z-50 w-64 shadow-lg"
              >
                {user ? (
                  // Logged In State
                  <>
                    <div className="pb-3 flex items-center gap-3 border-b border-gray-200">
                      <div className="h-12 w-12 rounded-full border border-primary overflow-hidden bg-base-300">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="h-full w-full object-cover"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary text-primary-content">
                            {user.displayName?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </div>
                        )}
                      </div>
                      <div className="max-w-[155px] overflow-hidden">
                        <h3 className="text-(--color-heading) font-semibold truncate">
                          {user.displayName || "User"}
                        </h3>
                        <h4 className="text-gray-500 text-sm truncate">
                          {user.email}
                        </h4>
                      </div>
                    </div>

                    <div className="my-2">
                      <Link
                        to="/dashboard"
                        className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-base-300 flex items-center gap-3 font-medium cursor-pointer text-(--color-heading)"
                      >
                        <MdOutlineDashboard className="text-lg" />
                        <span>Dashboard</span>
                      </Link>
                    </div>

                    {/* Theme Toggle Inside Dropdown */}
                    <div className="flex justify-between items-center px-3 py-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-(--color-heading)">
                        Theme
                      </span>
                      <label className="inline-flex items-center relative cursor-pointer">
                        <input
                          onChange={handleTheme}
                          className="peer hidden"
                          ref={themeButton1}
                          type="checkbox"
                        />
                        <div className="relative w-15 h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-6 after:h-6 peer-checked:after:bg-zinc-900 after:rounded-full after:top-[3px] after:left-1 active:after:w-7 peer-checked:after:left-[57px] peer-checked:after:-translate-x-full shadow-sm duration-300 after:duration-300 after:shadow-md">
                          <style>
                            {`label input:not(:checked) + div::after {background: linear-gradient(to right, #ae8844, #d0c2a5);}`}
                          </style>
                        </div>
                        <svg
                          height="0"
                          width="100"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-2.5"
                        >
                          <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                        </svg>
                        <svg
                          height="512"
                          width="512"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-2.5"
                        >
                          <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                        </svg>
                      </label>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="mt-2 btn btn-ghost text-(--color-heading) border border-base-300 hover:bg-base-300 font-medium flex items-center justify-center gap-2"
                    >
                      <MdLogout className="text-lg" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  // Not Logged In State
                  <>
                    <div className="text-center mb-4">
                      <LuCircleUser className="text-[60px] text-primary mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-(--color-heading)">
                        Welcome Guest
                      </h3>
                      <p className="text-sm text-gray-500">
                        Please login to access your account
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mb-4">
                      <Link
                        to="/login"
                        className="btn btn-ghost text-(--color-heading) border border-base-300 hover:bg-base-300 font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-primary bg-(--color-primary) border-(--color-primary) hover:bg-opacity-90 text-white"
                      >
                        Register
                      </Link>
                    </div>

                    {/* Theme Toggle Inside Dropdown */}
                    <div className="flex justify-between items-center px-3 py-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-(--color-heading)">
                        Theme
                      </span>
                      <label className="inline-flex items-center relative cursor-pointer">
                        <input
                          onChange={handleTheme}
                          className="peer hidden"
                          ref={themeButton1}
                          type="checkbox"
                        />
                        <div className="relative w-15 h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-6 after:h-6 peer-checked:after:bg-zinc-900 after:rounded-full after:top-[3px] after:left-1 active:after:w-7 peer-checked:after:left-[57px] peer-checked:after:-translate-x-full shadow-sm duration-300 after:duration-300 after:shadow-md">
                          <style>
                            {`label input:not(:checked) + div::after {background: linear-gradient(to right, #ae8844, #d0c2a5);}`}
                          </style>
                        </div>
                        <svg
                          height="0"
                          width="100"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-2.5"
                        >
                          <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                        </svg>
                        <svg
                          height="512"
                          width="512"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-2.5"
                        >
                          <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                        </svg>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* User Photo or Icon for Mobile */}
            {user ? (
              <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden bg-base-300">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary text-primary-content font-semibold">
                    {user.displayName?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </div>
                )}
              </div>
            ) : (
              <LuCircleUser className="text-[40px] text-primary" />
            )}

            <div className="drawer-content">
              <label htmlFor="drawer" className="cursor-pointer">
                <CgMenuRightAlt className="text-[27px] text-(--color-heading)" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <div className="drawer drawer-end">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label
              htmlFor="drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="bg-base-100 min-h-full w-72 p-6">
              {/* User Info */}
              {user ? (
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-base-300">
                  <div className="h-14 w-14 rounded-full border-2 border-primary overflow-hidden bg-base-300">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-full w-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary text-primary-content text-xl font-semibold">
                        {user.displayName?.charAt(0) ||
                          user.email?.charAt(0) ||
                          "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-(--color-heading)">
                      {user.displayName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate max-w-[150px]">
                      {user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center mb-8 pb-4 border-b border-base-300">
                  <LuCircleUser className="text-[60px] text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-(--color-heading)">
                    Welcome Guest
                  </h3>
                </div>
              )}

              {/* Mobile Menu Items */}
              <div className="flex flex-col gap-4 mb-8">
                {menuItems}
                {user && (
                  <Link
                    to="/dashboard"
                    className="font-medium text-(--color-heading) hover:text-(--color-primary) transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="border-t border-base-300 pt-6">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost w-full text-(--color-heading) border border-base-300"
                  >
                    <MdLogout className="text-lg" />
                    Sign Out
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="btn btn-ghost w-full text-(--color-heading) border border-base-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-full bg-(--color-primary) border-(--color-primary)"
                    >
                      Register
                    </Link>
                  </div>
                )}

                {/* Theme Toggle - Mobile (Only in Drawer) */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-base-300">
                  <span className="text-sm font-medium text-(--color-heading)">
                    Theme
                  </span>
                  <label className="inline-flex items-center relative cursor-pointer">
                    <input
                      onChange={handleTheme}
                      className="peer hidden"
                      ref={themeButton2}
                      type="checkbox"
                    />
                    <div className="relative w-15 h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-6 after:h-6 peer-checked:after:bg-zinc-900 after:rounded-full after:top-[3px] after:left-1 active:after:w-7 peer-checked:after:left-[57px] peer-checked:after:-translate-x-full shadow-sm duration-300 after:duration-300 after:shadow-md">
                      <style>
                        {`label input:not(:checked) + div::after {background: linear-gradient(to right, #ae8844, #d0c2a5);}`}
                      </style>
                    </div>
                    <svg
                      height="0"
                      width="100"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-2.5"
                    >
                      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                    </svg>
                    <svg
                      height="512"
                      width="512"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-2.5"
                    >
                      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
