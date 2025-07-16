import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddCourtForm = ({ editingCourt, setEditingCourt }) => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Prefill form fields when editing
  useEffect(() => {
    if (editingCourt) {
      setValue("name", editingCourt.name);
      setValue("type", editingCourt.type);
      setValue("image", editingCourt.image);
      setValue("price", editingCourt.price);
      setValue("slots", editingCourt.slots.join(", "));
      setPreviewUrl(editingCourt.image);
    } else {
      reset();
      setPreviewUrl("");
    }
  }, [editingCourt, setValue, reset]);

  // Add mutation
  const addCourt = useMutation({
    mutationFn: (data) => axiosPublic.post("create/courts", data),
    onSuccess: () => {
      toast.success("✅ Court added!");
      queryClient.invalidateQueries(["courts"]);
      reset();
      setPreviewUrl("");
    },
    onError: () => toast.error("❌ Failed to add court"),
  });

  // Update mutation
  const updateCourt = useMutation({
    mutationFn: ({ id, data }) =>
      axiosPublic.patch(`update/courts/${id}`, data),
    onSuccess: () => {
      toast.success("✅ Court updated!");
      queryClient.invalidateQueries(["courts"]);
      reset();
      setEditingCourt(null);
      setPreviewUrl("");
    },
    onError: () => toast.error("❌ Failed to update court"),
  });

  const onSubmit = (data) => {
    const courtData = {
      name: data.name,
      type: data.type,
      image: data.image,
      price: parseFloat(data.price),
      slots: data.slots.split(",").map((s) => s.trim()),
      updatedAt: new Date().toISOString(),
    };

    if (editingCourt) {
      updateCourt.mutate({ id: editingCourt._id, data: courtData });
    } else {
      courtData.createdAt = new Date().toISOString();
      addCourt.mutate(courtData);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const imgbbURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(imgbbURL, formData);
      const url = res.data.data.url;
      setPreviewUrl(url);
      setValue("image", url);
      toast.success("✅ Image uploaded!");
    } catch {
      toast.error("❌ Image upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1f1a40] p-6 rounded-lg border border-white/10 space-y-4 max-w-xl mx-auto text-white"
    >
      <h3 className="text-xl font-semibold mb-2 text-elite-primary">
        {editingCourt ? "✏️ Update Court" : "➕ Add New Court"}
      </h3>

      {/* Court Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Court Image <span className="text-red-500">*</span>
        </label>

        <div className="relative w-full rounded-lg border-2 border-dashed border-elite-primary p-4 bg-white/5 hover:bg-white/10 transition duration-300">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleImageUpload}
          />

          {!previewUrl ? (
            <div className="flex flex-col items-center justify-center text-center text-white/70">
              <svg
                className="w-12 h-12 mb-2 text-elite-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-4-4m4 4l4-4M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
              <p className="text-sm">Click or drag an image here to upload</p>
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="Court Preview"
              className="w-full h-48 object-cover rounded-md border border-white/10 shadow-md"
            />
          )}
        </div>
      </div>

      {/* Hidden image URL input */}
      <input
        type="text"
        {...register("image", { required: "Image is required" })}
        className="hidden"
      />
      {errors.image && (
        <p className="text-red-400 text-sm">{errors.image.message}</p>
      )}

      <input
        type="text"
        placeholder="Court Name"
        {...register("name", { required: "Court name is required" })}
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />
      {errors.name && (
        <p className="text-red-400 text-sm">{errors.name.message}</p>
      )}

      <input
        type="text"
        placeholder="Court Type"
        {...register("type", { required: "Court type is required" })}
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />
      {errors.type && (
        <p className="text-red-400 text-sm">{errors.type.message}</p>
      )}

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        {...register("price", {
          required: "Price is required",
          valueAsNumber: true,
        })}
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />
      {errors.price && (
        <p className="text-red-400 text-sm">{errors.price.message}</p>
      )}

      <input
        type="text"
        placeholder='Slots (e.g. "08:00-09:00,09:00-10:00")'
        {...register("slots", { required: "Slots are required" })}
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />
      {errors.slots && (
        <p className="text-red-400 text-sm">{errors.slots.message}</p>
      )}

      <button
        type="submit"
        disabled={addCourt.isPending || updateCourt.isPending}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium w-full"
      >
        {editingCourt
          ? updateCourt.isPending
            ? "Updating..."
            : "Update Court"
          : addCourt.isPending
          ? "Adding..."
          : "Add Court"}
      </button>
    </form>
  );
};

export default AddCourtForm;
