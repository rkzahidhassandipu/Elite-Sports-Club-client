import React, { useEffect, useState } from "react";
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

  if (loading) return <p className="text-white">Loading announcements...</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">📢 Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((item) => (
            <li
              key={item._id}
              className="bg-white/10 border border-white/20 p-4 rounded shadow"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm mt-1">{item.message}</p>
              <p className="text-xs text-gray-300 mt-2">
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
