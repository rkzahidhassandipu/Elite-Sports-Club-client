import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
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
  const [coupon, setCoupon] = useState("");
  const [discountInfo, setDiscountInfo] = useState(null);

  // Get booking by ID
  const { isPending, data: booking = {} } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`bookings/${id}`);
      return res.data.booking;
    },
    enabled: !!id,
  });

  const originalPrice = booking.totalPrice || 0;
  const discountAmount =
    discountInfo?.type === "percentage"
      ? (originalPrice * discountInfo.discount) / 100
      : discountInfo?.discount || 0;
  const discountedPrice = Math.max(originalPrice - discountAmount, 0);

  // Validate coupon
  const handleApplyCoupon = async () => {
    try {
      const res = await axiosPublic.get(`/coupons/validate?code=${coupon}`);
      setDiscountInfo(res.data);
      toast.success(`Coupon "${res.data.code}" applied!`);
    } catch (err) {
      setDiscountInfo(null);
      toast.error("Invalid or expired coupon code");
    }
  };

  // Stripe Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !discountedPrice) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    setError(null);

    try {
      // Create payment intent
      const res = await axiosPublic.post("payments/create-payment-intent", {
        totalPrice: discountedPrice,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || booking.userEmail || "Anonymous",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;
        setPaymentSuccess(true);

        // Save payment to DB
        await axiosPublic.post("/payments/save", {
          name: user?.displayName || "Anonymous",
          bookingId: booking._id,
          userEmail: booking.userEmail,
          transactionId,
          totalPrice: discountedPrice,
          courtType: booking.courtType || "Court",
          couponCode: discountInfo?.code || null,
          discountAmount: discountAmount || 0,
        });

        // Update booking status to confirmed
        await axiosPublic.patch(`/bookings/confirm/${id}`, {
          transactionId,
        });

        toast.success("✅ Payment successful and booking confirmed!");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      toast.error("❌ Payment failed. Try again.");
    }

    setProcessing(false);
  };

  if (isPending) return <p className="text-white">Loading booking...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary shadow max-w-lg mx-auto mt-10 border border-blue-800"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">
        Pay RM {discountedPrice.toFixed(2)}
      </h2>

      <div className="space-y-4 text-sm text-white">
        {/* Coupon Input */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Apply
          </button>
        </div>

        {/* Discount Message */}
        {discountInfo && (
          <p className="text-green-300 text-sm">
            Coupon "{discountInfo.code}" applied. You saved RM {discountAmount.toFixed(2)}!
          </p>
        )}

        {/* Booking Info */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            value={booking.userEmail || "N/A"}
            readOnly
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Court Type</label>
          <input
            type="text"
            value={booking.name || "N/A"}
            readOnly
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="text"
            value={booking.date || "N/A"}
            readOnly
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Slots</label>
          <div className="flex flex-wrap gap-2">
            {booking.slots?.map((slot, idx) => (
              <span
                key={idx}
                className="bg-white/10 border border-white/20 px-3 py-1 rounded text-xs"
              >
                {slot}
              </span>
            )) || <span>N/A</span>}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Total Price</label>
          <input
            type="text"
            value={`RM ${discountedPrice.toFixed(2)}`}
            readOnly
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>
      </div>

      {/* Stripe Payment Card Input */}
      <div className="mt-6">
        <CardElement className="mb-4 border p-3 rounded bg-white text-black" />
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
            : `Pay RM ${discountedPrice.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
