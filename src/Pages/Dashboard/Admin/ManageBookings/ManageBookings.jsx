import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../../../Component/Loading/Loading";

const ManageBookings = () => {
  const axiosPublic = useAxiosPublic();
  const [bookings, setBookings] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      const res = await axiosPublic.get("admin/confirmed/bookings");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-6xl mx-auto text-white space-y-8">
  {/* Page Title */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-white">📋 Confirmed Bookings</h2>
    <p className="text-sm text-gray-400 mt-1">All confirmed bookings with completed payment</p>
  </div>

  {/* Search Input */}
  <div className="flex justify-end">
    <input
      type="text"
      placeholder="Search by name..."
      className="w-full max-w-sm px-4 py-2 rounded-lg bg-[#2b2b48] text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-elite-primary"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>

  {/* Table Display */}
  {filteredBookings.length === 0 ? (
    <div className="text-center text-gray-400 mt-10 text-lg font-medium">
      No confirmed bookings found.
    </div>
  ) : (
    <div className="overflow-x-auto rounded-lg shadow border border-white/10">
      <table className="w-full table-auto text-sm bg-[#1f1a40] rounded-lg">
        <thead className="bg-[#2e2e52] text-white uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Court Name</th>
            <th className="px-6 py-3 text-left">User Email</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {filteredBookings.map((booking) => (
            <tr
              key={booking._id}
              className="hover:bg-white/10 transition duration-150"
            >
              <td className="px-6 py-4 font-medium">{booking.name}</td>
              <td className="px-6 py-4 text-gray-300">{booking.userEmail}</td>
              <td className="px-6 py-4">{booking.date}</td>
              <td className="px-6 py-4">
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                  {booking.status}
                </span>
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

export default ManageBookings;
