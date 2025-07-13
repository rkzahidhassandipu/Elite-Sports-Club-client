// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink, Link } from "react-router";
import {
  FaUser,
  FaClipboardList,
  FaBullhorn,
  FaCheckCircle,
  FaDollarSign,
  FaHistory,
  FaUsers,
  FaCogs,
  FaPlusCircle,
  FaTags,
  FaSearch,
} from "react-icons/fa";
import useUserRole from "../../../hooks/useUserRole";

const Sidebar = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) return null;

  const navItem = (to, label, icon) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition ${
          isActive ? "bg-blue-600" : "hover:bg-white/10"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  return (
    <aside className="w-64 bg-[#1f1a40] p-4 h-screen fixed top-0 left-0 text-white border-r border-white/10 overflow-y-auto">
      <Link to="/">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      </Link>
      <nav className="flex flex-col gap-2">
        {navItem("/dashboard/profile", "Profile", <FaUser />)}
        {role === "user" && (
          <>
            
            {navItem(
              "/dashboard/pending-bookings",
              "Pending Bookings",
              <FaClipboardList />
            )}
            {navItem(
              "/dashboard/announcements",
              "Announcements",
              <FaBullhorn />
            )}
          </>
        )}

        {role === "member" && (
          <>
            
            {navItem(
              "/dashboard/pending-bookings",
              "Pending Bookings",
              <FaClipboardList />
            )}
            {navItem(
              "/dashboard/approved-bookings",
              "Approved Bookings",
              <FaCheckCircle />
            )}
            {navItem(
              "/dashboard/confirmed-bookings",
              "Confirmed Bookings",
              <FaCheckCircle />
            )}
            {/* {navItem(
              "/dashboard/payment-page",
              "Payment Page",
              <FaDollarSign />
            )} */}
            {navItem(
              "/dashboard/payment-history",
              "Payment History",
              <FaHistory />
            )}
            {navItem(
              "/dashboard/announcements",
              "Announcements",
              <FaBullhorn />
            )}
          </>
        )}

        {/* ✅ Admin Only */}
        {role === "admin" && (
          <>
            <hr className="border-white/10 my-2" />
            {navItem(
              "/dashboard/admin/manage-booking-approval",
              "Manage Booking Approval",
              <FaClipboardList />
            )}
            {navItem(
              "/dashboard/admin/manage-members",
              "Manage Members",
              <FaUsers />
            )}
            {navItem("/dashboard/admin/all-users", "All Users", <FaUsers />)}
            {navItem("/dashboard/admin/manage-courts", "Manage Courts", <FaCogs />)}
            {navItem(
              "/dashboard/admin/manage-bookings",
              "Manage Bookings",
              <FaClipboardList />
            )}
            {navItem("/dashboard/admin/manage-coupons", "Manage Coupons", <FaTags />)}
            {navItem(
              "/dashboard/admin/make-announcement",
              "Make Announcement",
              <FaPlusCircle />
            )}
          </>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;
