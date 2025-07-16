import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Component/Loading/Loading";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Get all courts
  const { data: courts = [], isLoading: courtsLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courts");
      return res.data;
    },
  });

  // Get all users
  const { data: allUsers = [], isLoading: usersLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("users");
      return res.data;
    },
  });

  if (courtsLoading || usersLoading) return <Loading />;

  // Count by role
  const roleCounts = allUsers.reduce(
    (acc, user) => {
      if (user.userRole === "user") acc.users++;
      else if (user.userRole === "member") acc.members++;
      return acc;
    },
    { users: 0, members: 0 }
  );

  // Pie chart data
  const pieData = [
    { name: 'Users', value: roleCounts.users },
    { name: 'Members', value: roleCounts.members },
    { name: 'Courts', value: courts.length },
  ];

  return (
    <div className="p-6 text-white max-w-6xl mx-auto space-y-10">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-elite-hover1 drop-shadow">
        👑 Admin Dashboard Overview
      </h2>

      {/* Admin Info Card */}
      <div className="bg-gradient-to-r from-[#1f1a40] to-[#2c245d] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/GxM0wzY/default-user.png"}
          alt="Admin"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-elite-primary shadow-lg"
        />
        <div className="text-center md:text-left space-y-1">
          <h3 className="text-2xl font-semibold text-elite-primary">{user?.displayName || "Admin"}</h3>
          <p className="text-gray-300">{user?.email}</p>
        </div>
      </div>

      {/* System Summary & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#292151] p-5 rounded-xl text-center shadow-md border border-white/10 hover:scale-[1.02] transition">
            <h4 className="text-3xl font-bold text-emerald-400">{courts.length}</h4>
            <p className="text-sm text-gray-300 mt-1">Total Courts</p>
          </div>
          <div className="bg-[#292151] p-5 rounded-xl text-center shadow-md border border-white/10 hover:scale-[1.02] transition">
            <h4 className="text-3xl font-bold text-blue-400">{roleCounts.users}</h4>
            <p className="text-sm text-gray-300 mt-1">Total Users</p>
          </div>
          <div className="bg-[#292151] p-5 rounded-xl text-center shadow-md border border-white/10 hover:scale-[1.02] transition">
            <h4 className="text-3xl font-bold text-yellow-400">{roleCounts.members}</h4>
            <p className="text-sm text-gray-300 mt-1">Total Members</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#1f1a40] p-6 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center text-elite-primary">
            📊 User Breakdown
          </h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
