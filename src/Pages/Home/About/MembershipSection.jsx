import React from "react";

const MembershipSection = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-16 px-6"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/kGGmqWT3/muktasim-azlan-rj-Wf-NR-AC5g-unsplash.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-800/60 to-purple-900/60"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Become a member of The Raintree Club
        </h2>
        <p className="text-lg mb-6">
          The Raintree Club is one of the Premier Family Clubs in the country
          with the finest sports, recreation and social facilities.
        </p>
        <a
          href="/courts"
          className="inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Explore Booking
        </a>
      </div>
    </section>
  );
};

export default MembershipSection;
