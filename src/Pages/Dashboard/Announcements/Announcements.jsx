import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Announcements = () => {
  const axiosPublic = useAxiosPublic();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axiosPublic.get("announcements");
        setAnnouncements(res.data.announcements || []);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [axiosPublic]);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-white">
      <Helmet>
        <title>Announcements | Elite Sports Club</title>
        <meta name="description" content="Stay updated with the latest announcements from Elite Sports Club." />
      </Helmet>

      <h2 className="text-2xl md:text-3xl font-semibold mb-6">📢 Announcements</h2>

      {loading ? (
        <p className="text-white">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-white">No announcements available.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {announcements.map((item) => (
            <li
              key={item._id}
              className="bg-white/10 border border-white/20 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-white/90 mb-2">{item.message}</p>
              <p className="text-xs text-gray-300">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
