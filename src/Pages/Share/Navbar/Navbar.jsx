import { Link, NavLink, useNavigate } from "react-router"; // ✅ Corrected import
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { IoIosSettings } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

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
    try {
      await axiosPublic.get("/logout");
      await logOut();
      navigate("/");
      setDropdownOpen(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
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
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-elite-secondary via-elite-primary to-elite-brand bg-opacity-80 shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-elite-brand to-elite-primary px-3 text-sm font-bold text-white flex items-center justify-center rounded-md">
              ESC
            </div>
            <span className="text-xl font-semibold text-white hidden sm:inline">
              Elite Sports Club
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-white">
          {navLinks}
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
                    <p className="font-semibold">
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

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-elite-primary text-white space-y-4 transition-all duration-300 flex flex-col">
          {navLinks}
          {user ? (
            <>
              <Link
                to="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gradient-to-r w-1/4 from-elite-secondary to-elite-hover1 px-4 py-2 rounded hover:from-elite-hover2 hover:to-elite-hover1"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
