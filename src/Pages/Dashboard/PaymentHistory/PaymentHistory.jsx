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
    return <p className="text-gray-300 mt-2">No payment history found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Payment History</h2>
      <div className="grid gap-4">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-[#2b245d] text-white p-4 rounded shadow border border-white/10"
          >
            <p>
              <span className="text-purple-300">Payer Name:</span>{" "}
              {payment.name}
            </p>
            <p>
              <span className="text-purple-300">Booking ID:</span>{" "}
              {payment.bookingId}
            </p>
            <p>
              <span className="text-purple-300">Transaction ID:</span>{" "}
              {payment.transactionId}
            </p>
            <p>
              <span className="text-purple-300">Amount Paid:</span> RM
              {payment.totalPrice}
            </p>
            <p>
              <span className="text-purple-300">Paid At:</span>{" "}
              {format(new Date(payment.paidAt), "dd MMM yyyy, h:mm a")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
