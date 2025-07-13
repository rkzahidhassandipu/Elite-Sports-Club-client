import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Component/Loading/Loading";
import { format } from "date-fns";

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch confirmed bookings
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
    return (
      <p className="text-gray-300 text-center text-lg mt-4">
        No confirmed bookings found.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Confirmed Bookings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#1f1b45] p-6 rounded-xl text-white shadow-md border border-white/10 transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              {booking.courtName || "Court"}
            </h3>

            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-purple-300">Date:</span>{" "}
                {booking.date}
              </p>
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-purple-300">Slots:</span>
                {booking.slots?.map((slot, i) => (
                  <span
                    key={i}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm text-white"
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
                <span className="font-medium text-purple-300">
                  Transaction ID:
                </span>{" "}
                <span className="bg-green-700/30 px-2 py-1 rounded text-green-400 text-xs font-mono">
                  {booking.transactionId || "N/A"}
                </span>
              </p>
              <p>
                <span className="font-medium text-purple-300">Paid At:</span>{" "}
                {booking.paidAt
                  ? format(new Date(booking.paidAt), "dd MMM yyyy, h:mm a")
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedBookings;
