import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const CourtCard = ({ court, handleBookNow }) => {
  return (
    <div
      className="relative bg-white/5 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/10"
      data-aos="zoom-in-up"
    >
      <span className="absolute top-3 right-3 bg-elite-hover1 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
        {court.type}
      </span>
      <img
        src={court.image}
        alt={`${court.type} Court`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-300">
          <FaCalendarAlt className="inline mr-1" />
          Price per session: <span className="font-semibold">${court.price}</span>
        </p>
        <p className="text-sm text-gray-300">
          <FaClock className="inline mr-1" />
          Total Slots: {court.slots.length} | Hours: {court.slots.length}
        </p>

        <button
          onClick={() => handleBookNow(court)}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CourtCard;
