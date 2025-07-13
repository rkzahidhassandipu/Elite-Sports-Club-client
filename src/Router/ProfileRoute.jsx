// src/routes/ProfileRoute.jsx
import React from "react";
import useUserRole from "../hooks/useUserRole";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import Profile from "../Component/Profile/Profile"; // or MemberProfile

const ProfileRoute = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (role === "admin") return <AdminProfile />;
  return <Profile />; // could conditionally check for member if needed
};

export default ProfileRoute;
