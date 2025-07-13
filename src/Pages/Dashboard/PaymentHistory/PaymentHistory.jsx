import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Component/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments?email=${user?.email}`);
      return res.data.payments;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  if (!payments.length)
    return (
      <p className="text-gray-300 mt-4 text-center text-lg">
        No payment history found.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Payment History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-[#1f1b45] p-6 rounded-xl text-white shadow-md border border-white/10 transition hover:shadow-lg"
          >
            <div className="mb-2">
              <span className="font-semibold text-purple-400">Payer Name:</span>{" "}
              {payment.name}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-purple-400">Booking ID:</span>{" "}
              <span className="text-xs bg-white/10 px-2 py-1 rounded">
                {payment.bookingId}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-purple-400">
                Transaction ID:
              </span>{" "}
              <span className="text-xs bg-green-600/20 px-2 py-1 rounded text-green-400 font-mono">
                {payment.transactionId}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-purple-400">Amount Paid:</span>{" "}
              <span className="text-yellow-400 font-bold">
                RM {payment.totalPrice}
              </span>
            </div>
            <div>
              <span className="font-semibold text-purple-400">Paid At:</span>{" "}
              <span className="text-sm">
                {format(new Date(payment.paidAt), "dd MMM yyyy, h:mm a")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
