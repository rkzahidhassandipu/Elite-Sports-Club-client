import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../../../Component/Loading/Loading";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const BookingApproval = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  // Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-pending-bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookings?status=pending"); // ✅ filtering here
      return res.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.put(`/bookings/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Booking approved successfully.", "success");
      queryClient.invalidateQueries(["admin-pending-bookings"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to approve booking.", "error");
    },
  });

  // Reject mutation (DELETE)
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Booking has been rejected.", "info");
      queryClient.invalidateQueries(["admin-pending-bookings"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to reject booking.", "error");
    },
  });

  const handleApprove = (id) => {

    navigate(`/dashboard/payment-page/${id}`)
    // Swal.fire({
    //   title: "Approve Booking?",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, approve",
    //   cancelButtonText: "Cancel",
    // }).then((res) => {
    //   if (res.isConfirmed) approveMutation.mutate(id);
    // });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Booking?",
      text: "This will permanently delete the booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) rejectMutation.mutate(id);
    });
  };

  if (isLoading) return <Loading />;
  if (!bookings.length)
    return <p className="text-gray-300 mt-2">No pending bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        Booking Approval Requests
      </h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#2b245d] text-white p-4 rounded shadow border border-white/10"
          >
            <h3 className="text-lg font-semibold">{booking.courtName}</h3>
            <p>
              <span className="text-purple-300">User Email:</span>{" "}
              {booking.userEmail}
            </p>
            <p>
              <span className="text-purple-300">Date:</span> {booking.date}
            </p>
            <p className="flex flex-wrap gap-1">
              <span className="text-purple-300">Slots:</span>
              {booking.slots.map((slot, i) => (
                <span key={i} className="bg-white/20 px-2 py-1 rounded text-sm">
                  {slot}
                </span>
              ))}
            </p>
            <p>
              <span className="text-purple-300">Total Price:</span> RM
              {booking.totalPrice}
            </p>
            <p>
              <span className="text-purple-300">Created:</span>{" "}
              {format(new Date(booking.createdAt), "dd MMM yyyy, h:mm a")}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleApprove(booking._id)}
                className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(booking._id)}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingApproval;
