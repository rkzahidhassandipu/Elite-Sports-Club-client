import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CheckoutForm = () => {
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const { id } = useParams();

  const { isPending, data: booking = {} } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings/${id}`);
      return res.data.booking; // ✅ return only the booking object
    },
    enabled: !!id, // optional safety check
  });

  const { totalPrice } = booking;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
      console.log("payment", paymentMethod);
    }

    // ✅ Send totalPrice instead of undefined amount
    const res = await axiosPublic.post("payments/create-payment-intent", {
      totalPrice,
      id,
    });

    console.log(res.data); // Should contain clientSecret
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement></CardElement>
        <button type="submit" disabled={!stripe}>
          Pay ${totalPrice}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
