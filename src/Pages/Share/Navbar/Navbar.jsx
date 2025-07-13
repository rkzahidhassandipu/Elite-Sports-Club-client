import { Link, NavLink, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { IoIosSettings } from "react-icons/io";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate("/")
    setDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-elite-secondary via-elite-primary to-elite-brand bg-opacity-80 shadow-md">
      <div className="w-4/5 mx-auto px-4 py-5 flex items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-elite-brand to-elite-primary px-3 text-sm font-bold text-white flex items-center justify-center rounded-md">
              ESC
            </div>
            <span className="text-xl font-semibold text-white">
              Elite Sports Club
            </span>
          </div>
        </Link>

        {/* Right Side Items */}
        <div className="flex items-center gap-6 ml-auto text-white relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold" : "hover:text-blue-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courts"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold" : "hover:text-blue-400"
            }
          >
            Courts
          </NavLink>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-gradient-to-r from-elite-primary to-elite-hover1 text-white rounded shadow-lg z-50 p-4 space-y-3">
                  <div className="text-sm">
                    <p className="font-semibold text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-blue-200">{user.email}</p>
                  </div>
                  <hr className="border-white/30" />
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-2 hover:text-blue-300"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <IoIosSettings /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 text-red-300 hover:text-red-500"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-blue-400 text-sm">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-gradient-to-r from-elite-secondary to-elite-hover1 hover:from-elite-hover1 hover:to-elite-hover2 text-white px-5 py-2 rounded-md text-sm transition-all duration-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
