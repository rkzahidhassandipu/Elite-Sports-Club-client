import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../../../Component/Loading/Loading";
import AddCourtForm from "./AddCourtForm";

const ManageCourts = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [editingCourt, setEditingCourt] = useState(null);

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosPublic.get("courts");
      return res.data;
    },
  });

  const addCourtMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("create/courts", data),
    onSuccess: () => {
      Swal.fire("✅ Added", "Court created successfully", "success");
      queryClient.invalidateQueries(["courts"]);
    },
  });

  const updateCourtMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.patch(`update/courts/${id}`, data),
    onSuccess: () => {
      Swal.fire("✅ Updated", "Court updated successfully", "success");
      queryClient.invalidateQueries(["courts"]);
    },
  });

  const deleteCourtMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`courts/${id}`),
    onSuccess: () => {
      Swal.fire("🗑️ Deleted", "Court removed", "info");
      queryClient.invalidateQueries(["courts"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the court.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) deleteCourtMutation.mutate(id);
    });
  };

  const handleSubmit = (data) => {
    if (editingCourt) {
      updateCourtMutation.mutate({ id: editingCourt._id, data });
    } else {
      addCourtMutation.mutate(data);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className=" text-white w-4/5 mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">🏟️ Manage Courts</h2>

      <AddCourtForm
        onSubmit={handleSubmit}
        editingCourt={editingCourt}
        setEditingCourt={setEditingCourt}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-[#1f1a40] rounded-lg border border-white/10 p-4"
          >
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h4 className="text-xl font-semibold">{court.name}</h4>
            <p className="text-sm text-gray-400 mb-3">Type: {court.type}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingCourt(court)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(court._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourts;
