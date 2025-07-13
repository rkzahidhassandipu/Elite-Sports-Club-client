import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Loading from "../../../Component/Loading/Loading";
import Swal from "sweetalert2";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // 🔵 Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pending-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔴 Cancel mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries(["pending-bookings", user?.email]);
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingMutation.mutate(id); // ✅ Runs mutation only after confirmation
      }
    });
  };

  // 🌀 Loading state
  if (isLoading) return <Loading />;
  if (!bookings.length)
    return <p className="text-gray-300 mt-2">You have no pending bookings.</p>;

  return (
    <div className="w-full mt-4">
      <h2 className="text-2xl font-bold text-white mb-4">Pending Bookings</h2>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-[#2b245d] text-white p-4 rounded-md shadow-md border border-white/10"
        >
          <h3 className="text-lg font-semibold mb-2">
            {booking.courtName || "Court"}
          </h3>
          <p>
            <span className="text-purple-300">Date:</span>{" "}
            {booking.date || "N/A"}
          </p>
          <p className="flex">
            <span className="text-purple-300 ">Time Slots:</span>{" "}
            <div className="flex flex-wrap gap-1 ml-2">
              {booking.slots?.length > 0 ? (
                booking.slots.map((slot, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 px-2 py-1 rounded text-sm"
                  >
                    {slot}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
          </p>
          <p>
            <span className="text-purple-300">Price/Slot:</span> RM
            {booking.pricePerSlot}
          </p>
          <p>
            <span className="text-purple-300">Total:</span> RM
            {booking.totalPrice}
          </p>
          <p>
            <span className="text-purple-300">Booked At:</span>{" "}
            {booking.createdAt
              ? format(new Date(booking.createdAt), "dd MMM yyyy, h:mm a")
              : "N/A"}
          </p>
          <button
            onClick={() => handleCancel(booking._id)}
            className="mt-3 px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingBookings;
