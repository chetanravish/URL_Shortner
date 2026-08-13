import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";

import { logOutUser } from "../api/user_api.js";
import { logout } from "../store/slice/authSlice.js";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await logOutUser();

      dispatch(logout());

      navigate({
        to: "/",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
            URL Shortener
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">

                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user?.name || "User"}
                  </span>

                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Login / Sign up
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;