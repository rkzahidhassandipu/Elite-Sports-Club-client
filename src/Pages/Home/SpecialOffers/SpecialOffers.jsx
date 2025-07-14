import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosPublic"; // adjust path if needed

const SpecialOffers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("coupons");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-white">
        Loading special offers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load special offers.
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-16 px-4">
      <div className="text-center mb-12 px-2" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h2>
        <p className="text-base md:text-lg text-white/80">
          Take advantage of our exclusive discount coupons
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {offers.map((offer, idx) => (
          <div
            key={offer._id || idx}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            className="rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-elite-hover1 to-elite-hover2 hover:scale-105 transition-transform duration-300"
          >
            <div className="py-8 text-center">
              <p className="text-2xl font-extrabold">{offer.discount}% OFF</p>
              <p className="mt-2 text-sm tracking-wider uppercase">{offer.code}</p>
            </div>
            <div className="bg-purple-700/40 py-4 text-sm text-center px-2">
              {offer.name || "Special offer available now!"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
