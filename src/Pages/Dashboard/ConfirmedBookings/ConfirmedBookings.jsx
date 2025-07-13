import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Component/Loading/Loading";
import { format } from "date-fns";

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch confirmed bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["confirmed-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/booking/confirmed?email=${user?.email}&status=confirmed`
      );
      return res.data.bookings;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  if (!bookings.length)
    return <p className="text-gray-300 mt-2">No confirmed bookings found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        Confirmed Bookings
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
              <span className="text-purple-300">Transaction ID:</span>{" "}
              {booking.transactionId || "N/A"}
            </p>
            <p>
              <span className="text-purple-300">Paid At:</span>{" "}
              {booking.paidAt
                ? format(new Date(booking.paidAt), "dd MMM yyyy, h:mm a")
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedBookings;
