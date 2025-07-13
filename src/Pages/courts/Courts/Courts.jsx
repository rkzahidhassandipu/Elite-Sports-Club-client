import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CourtCard from "../CourtCard/CourtCard";
import CourtPopup from "../CourtPopup/CourtPopup";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Loading from "../../../Component/Loading/Loading";

const Courts = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosPublic.get("courts");
      return res.data;
    },
  });

  const handleBookNow = (court) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedCourt(court);
      setIsPopupOpen(true);
    }
  };

  if (isLoading) {
    return <Loading />
  }

  const totalPages = Math.ceil(courts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCourts = courts.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#100c2a] via-elite-brand to-[#201b62] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Available Courts</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentCourts.map((court) => (
            <CourtCard key={court._id} court={court} handleBookNow={handleBookNow} />
          ))}
        </div>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-md border border-elite-hover1 transition-all duration-300 ${
                  currentPage === idx + 1
                    ? "bg-elite-hover1 text-white"
                    : "bg-transparent text-white hover:bg-elite-hover2"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popup */}
      {isPopupOpen && selectedCourt && (
        <CourtPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          court={selectedCourt}
        />
      )}
    </section>
  );
};

export default Courts;
