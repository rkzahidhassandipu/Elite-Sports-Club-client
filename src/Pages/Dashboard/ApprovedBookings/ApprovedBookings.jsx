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

  // Fetch approved bookings
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

  // Cancel booking
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking has been cancelled.", "info");
      queryClient.invalidateQueries(["approved-bookings", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel booking.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((res) => {
      if (res.isConfirmed) cancelBookingMutation.mutate(id);
    });
  };

  const handlePayment = (bookingId) => {
    navigate(`/dashboard/payment-page/${bookingId}`);
  };

  if (isLoading) return <Loading />;

  if (!bookings.length)
    return (
      <p className="text-gray-300 text-center text-lg mt-4">
        No approved bookings found.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Approved Bookings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#1f1b45] text-white p-6 rounded-xl shadow border border-white/10 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              {booking.courtName || "Court"}
            </h3>

            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-purple-300">Date:</span>{" "}
                {booking.date}
              </p>
              <p className="flex flex-wrap gap-2">
                <span className="font-medium text-purple-300">Slots:</span>
                {booking.slots.map((slot, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm"
                  >
                    {slot}
                  </span>
                ))}
              </p>
              <p>
                <span className="font-medium text-purple-300">
                  Price/Slot:
                </span>{" "}
                RM {booking.pricePerSlot}
              </p>
              <p>
                <span className="font-medium text-purple-300">
                  Total Price:
                </span>{" "}
                <span className="text-yellow-400 font-semibold">
                  RM {booking.totalPrice}
                </span>
              </p>
              <p>
                <span className="font-medium text-purple-300">Booked At:</span>{" "}
                {format(new Date(booking.createdAt), "dd MMM yyyy, h:mm a")}
              </p>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={() => handlePayment(booking._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Pay Now
              </button>
              <button
                onClick={() => handleCancel(booking._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
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
