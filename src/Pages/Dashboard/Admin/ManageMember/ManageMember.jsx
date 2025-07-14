import React, { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../Component/Loading/Loading";

const ManageMember = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    data: members = [],
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["members", search],
    // enabled: !!search,
    queryFn: async () => {
      const res = await axiosPublic.get(`members?name=${search}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Member has been deleted.", "success");
      queryClient.invalidateQueries(["approved-members"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete member.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Member?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((res) => {
      if (res.isConfirmed) deleteMutation.mutate(id);
    });
  };

  // if (isLoading || isPending) return <Loading />;

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">👥 Manage Members</h2>

      <input
        type="text"
        placeholder="Search member by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded bg-white/10 border border-white/20 text-white"
      />

      {members.length === 0 ? (
        <p className="text-gray-400">No members found.</p>
      ) : (
        <ul className="space-y-4">
          {members.map((member) => (
            <li
              key={member._id}
              className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded"
            >
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-300">{member.email}</p>
              </div>
              <button
                onClick={() => handleDelete(member._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageMember;
