import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Component/Loading/Loading";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Get courts count
  const { data: courtsData = {}, isLoading: courtsLoading } = useQuery({
    queryKey: ["courts-count"],
    queryFn: async () => {
      const res = await axiosPublic.get("courts");
      return res.data;
    },
  });

  // Get users + members count
  const { data: usersData = {}, isLoading: usersLoading } = useQuery({
    queryKey: ["users-count"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/count");
      return res.data;
    },
  });

  if (courtsLoading || usersLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 text-white max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">👑 Admin Profile</h2>

      <div className="bg-[#1f1a40] p-6 rounded-lg border border-white/10 shadow">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/GxM0wzY/default-user.png"}
            alt="Admin"
            className="w-16 h-16 rounded-full border border-white/20"
          />
          <div>
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div className="bg-elite-brand/10 p-4 rounded">
            <h4 className="text-xl font-bold text-elite-primary">
              {courtsData.length || 0}
            </h4>
            <p className="text-sm text-gray-300">Total Courts</p>
          </div>

          <div className="bg-elite-brand/10 p-4 rounded">
            <h4 className="text-xl font-bold text-elite-primary">
              {usersData.total || 0}
            </h4>
            <p className="text-sm text-gray-300">Total Users</p>
          </div>

          <div className="bg-elite-brand/10 p-4 rounded col-span-2">
            <h4 className="text-xl font-bold text-elite-primary">
              {usersData.members || 0}
            </h4>
            <p className="text-sm text-gray-300">Total Members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
