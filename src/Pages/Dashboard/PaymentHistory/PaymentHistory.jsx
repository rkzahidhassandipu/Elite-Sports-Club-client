import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Component/Loading/Loading";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [view, setView] = useState("card");

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("paymentView");
    if (savedView === "card" || savedView === "table") {
      setView(savedView);
    }
  }, []);

  // Save view preference on toggle
  const handleToggleView = () => {
    const newView = view === "card" ? "table" : "card";
    setView(newView);
    localStorage.setItem("paymentView", newView);
  };

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
      <Helmet>
        <title>Payment History | Dashboard</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Payment History</h2>
        <button
          type="button"
          onClick={handleToggleView}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Switch to {view === "card" ? "Table" : "Card"} View
        </button>
      </div>

      {/* CARD VIEW */}
      {view === "card" ? (
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
                <span className="font-semibold text-purple-400">Transaction ID:</span>{" "}
                <span className="text-xs bg-green-600/20 px-2 py-1 rounded text-green-400 font-mono">
                  {payment.transactionId}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-purple-400">Amount Paid:</span>{" "}
                <span className="text-yellow-400 font-bold">RM {payment.totalPrice}</span>
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
      ) : (
        // TABLE VIEW
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-[#1f1b45] text-white border border-white/10">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Payer Name</th>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Amount Paid</th>
                <th className="px-4 py-2 text-left">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-t border-white/10">
                  <td className="px-4 py-2">{payment.name}</td>
                  <td className="px-4 py-2 text-xs">{payment.bookingId}</td>
                  <td className="px-4 py-2 text-xs text-green-400 font-mono">
                    {payment.transactionId}
                  </td>
                  <td className="px-4 py-2 font-bold text-yellow-400">
                    RM {payment.totalPrice}
                  </td>
                  <td className="px-4 py-2">
                    {format(new Date(payment.paidAt), "dd MMM yyyy, h:mm a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
