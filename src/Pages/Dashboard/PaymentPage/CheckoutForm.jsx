import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ⏳ Fetch booking by ID
  const { isPending, data: booking = {} } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`bookings/${id}`);
      return res.data.booking;
    },
    enabled: !!id,
  });

  const { totalPrice } = booking || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !totalPrice) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    setError(null);

    try {
      // 1. Create Payment Intent
      const res = await axiosPublic.post("payments/create-payment-intent", {
        totalPrice,
        id,
      });

      const clientSecret = res.data.clientSecret;

      // 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: booking?.userEmail || "Anonymous",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;
        setPaymentSuccess(true);

        // 3. Save payment info
        await axiosPublic.post("/payments/save", {
          name: user?.displayName || "Anonymous",
          bookingId: booking._id,
          userEmail: booking.userEmail, // assuming booking has this
          transactionId,
          totalPrice: booking.totalPrice,
          courtType: booking.courtType, // optional
        });

        // 4. Confirm booking
        try {
          const confirmRes = await axiosPublic.patch(
            `/bookings/confirm/${id}`,
            {
              transactionId,
            }
          );

          if (confirmRes.data.success) {
            alert("✅ Booking confirmed and payment successful!");
          } else {
            alert("⚠️ Payment done, but status update failed.");
          }
        } catch (err) {
          console.error("❌ Error confirming booking:", err);
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  if (isPending) return <p className="text-white">Loading booking...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary shadow max-w-lg mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Pay RM {totalPrice}</h2>

      <CardElement className="mb-4 border p-3 rounded" />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing || paymentSuccess}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {paymentSuccess
          ? "Payment Successful"
          : processing
          ? "Processing..."
          : `Pay RM ${totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
