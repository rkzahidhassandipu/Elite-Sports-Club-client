import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const announcement = {
        title: data.title,
        message: data.message,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/announcements", announcement);

      if (res.data.insertedId) {
        toast.success("✅ Announcement posted!");
        reset();
      } else {
        toast.error("❌ Failed to post announcement.");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      toast.error("Server error while posting announcement.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#14112d] p-6 rounded shadow mt-10 text-white">
      <h2 className="text-2xl font-semibold mb-4">Make Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            {...register("message", { required: true })}
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
            placeholder="Enter message"
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-elite-primary hover:bg-elite-hover1 rounded text-white font-semibold"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
