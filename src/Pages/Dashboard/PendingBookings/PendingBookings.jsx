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
      const res = await axiosPublic.get(`bookings?email=${user?.email}`);
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
        cancelBookingMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  if (!bookings.length)
    return (
      <p className="text-gray-300 mt-4 text-center">
        You have no pending bookings.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Pending Bookings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#2b245d] text-white p-5 rounded-xl shadow border border-white/10 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-400">
              {booking.courtName || "Court"}
            </h3>

            <div className="space-y-1 text-sm">
              <p>
                <span className="text-purple-300">Date:</span> {booking.date}
              </p>
              <p className="flex gap-2 items-center flex-wrap">
                <span className="text-purple-300">Slots:</span>
                {booking.slots?.length > 0 ? (
                  booking.slots.map((slot, i) => (
                    <span
                      key={i}
                      className="bg-white/10 px-3 py-1 rounded-full text-xs"
                    >
                      {slot}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </p>
              <p>
                <span className="text-purple-300">Price/Slot:</span> RM{" "}
                {booking.pricePerSlot}
              </p>
              <p>
                <span className="text-purple-300">Total Price:</span>{" "}
                <span className="text-yellow-400 font-medium">
                  RM {booking.totalPrice}
                </span>
              </p>
              <p>
                <span className="text-purple-300">Booked At:</span>{" "}
                {booking.createdAt
                  ? format(new Date(booking.createdAt), "dd MMM yyyy, h:mm a")
                  : "N/A"}
              </p>
            </div>

            <button
              onClick={() => handleCancel(booking._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium w-full transition"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingBookings;
