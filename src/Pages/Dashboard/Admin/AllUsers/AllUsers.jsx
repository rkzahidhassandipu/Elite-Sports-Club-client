import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../../../Component/Loading/Loading";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("users");
      return res.data;
    },
  });

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white space-y-6">
      <h2 className="text-3xl font-bold text-center">👥 All Users</h2>

      {/* Search Bar */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white w-full max-w-xs"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/10 text-left text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-white/5">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.name || "N/A"}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.userRole || "user"}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center p-4 text-gray-300">No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
