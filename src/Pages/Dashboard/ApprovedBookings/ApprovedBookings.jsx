import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Component/Loading/Loading";
import { format } from "date-fns";

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Fetch approved bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["approved-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/bookings?email=${user?.email}&status=approved`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔴 Cancel booking
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Booking cancelled successfully.", "info");
      queryClient.invalidateQueries(["approved-bookings", user?.email]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to cancel booking.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) cancelBookingMutation.mutate(id);
    });
  };

  const handlePayment = (booking) => {
    navigate(`/dashboard/payment-page`, { state: { booking } });
  };

  if (isLoading) return <Loading />;

  if (!bookings.length)
    return <p className="text-gray-300 mt-2">No approved bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        Approved Bookings
      </h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#2b245d] text-white p-4 rounded shadow border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-2">
              {booking.courtName || "Court"}
            </h3>
            <p>
              <span className="text-purple-300">Date:</span> {booking.date}
            </p>
            <p className="flex flex-wrap gap-1">
              <span className="text-purple-300">Slots:</span>
              {booking.slots?.map((slot, i) => (
                <span
                  key={i}
                  className="bg-white/20 px-2 py-1 rounded text-sm"
                >
                  {slot}
                </span>
              ))}
            </p>
            <p>
              <span className="text-purple-300">Price/Slot:</span> RM
              {booking.pricePerSlot}
            </p>
            <p>
              <span className="text-purple-300">Total Price:</span> RM
              {booking.totalPrice}
            </p>
            <p>
              <span className="text-purple-300">Booked At:</span>{" "}
              {format(new Date(booking.createdAt), "dd MMM yyyy, h:mm a")}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handlePayment(booking)}
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
              >
                Pay Now
              </button>
              <button
                onClick={() => handleCancel(booking._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedBookings;
