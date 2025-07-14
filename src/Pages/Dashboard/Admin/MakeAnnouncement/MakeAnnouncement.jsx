import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageAnnouncements = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await axiosSecure.get("announcements");
      if (res.data?.success && Array.isArray(res.data.announcements)) {
        setAnnouncements(res.data.announcements);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editId) {
        const updated = {
          title: data.title,
          message: data.message,
          updatedAt: new Date(),
        };

        const res = await axiosSecure.patch(`announcements/${editId}`, updated);

        if (res.data.modifiedCount > 0) {
          toast.success("✅ Announcement updated!");
          reset();
          setEditId(null);
          fetchAnnouncements();
        } else {
          toast.error("❌ Failed to update.");
        }
      } else {
        const newAnnouncement = {
          title: data.title,
          message: data.message,
          createdAt: new Date(),
        };

        const res = await axiosSecure.post("announcements", newAnnouncement);

        if (res.data.insertedId) {
          toast.success("✅ Announcement posted!");
          reset();
          fetchAnnouncements();
        } else {
          toast.error("❌ Failed to post.");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEdit = (announcement) => {
    setEditId(announcement._id);
    setValue("title", announcement.title);
    setValue("message", announcement.message);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`announcements/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("🗑️ Announcement deleted.");
          fetchAnnouncements();
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-white space-y-8">
      <h2 className="text-2xl font-bold text-center">
        {editId ? "✏️ Edit Announcement" : "📢 Make Announcement"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-[#1f1a40] p-6 rounded-lg border border-white/10"
      >
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <textarea
          {...register("message", { required: true })}
          placeholder="Message"
          rows={4}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 rounded bg-green-600 hover:bg-green-700 font-medium"
        >
          {editId ? "Update Announcement" : "Post Announcement"}
        </button>
      </form>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">No announcements yet.</p>
        ) : (
          announcements.map((item) => (
            <div
              key={item._id}
              className="bg-[#14112d] p-4 rounded border border-white/10 shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-right">
                {item.updatedAt
                  ? `Updated: ${new Date(item.updatedAt).toLocaleString()}`
                  : `Posted: ${new Date(item.createdAt).toLocaleString()}`}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
