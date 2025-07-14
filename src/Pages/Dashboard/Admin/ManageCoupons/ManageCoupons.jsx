import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosPublic";

const ManageCoupons = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchCoupons = async () => {
    try {
      const res = await axiosSecure.get("/coupons");
      if (Array.isArray(res.data)) {
        setCoupons(res.data);
      } else {
        setCoupons([]);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      code: data.code,
      name: data.name,
      discount: parseFloat(data.discount),
    };

    try {
      if (editId) {
        const res = await axiosSecure.patch(`coupons/${editId}`, payload);
        if (res.data.modifiedCount > 0) {
          toast.success("✅ Coupon updated!");
          fetchCoupons();
          reset();
          setEditId(null);
        } else {
          toast.error("❌ Failed to update.");
        }
      } else {
        const res = await axiosSecure.post("coupons", payload);
        if (res.data.insertedId) {
          toast.success("✅ Coupon added!");
          fetchCoupons();
          reset();
        } else {
          toast.error("❌ Failed to add coupon.");
        }
      }
    } catch (error) {
      console.error("Coupon submit error:", error);
    }
  };

  const handleEdit = (coupon) => {
    setEditId(coupon._id);
    setValue("code", coupon.code);
    setValue("name", coupon.name);
    setValue("discount", coupon.discount);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`coupons/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("🗑️ Coupon deleted.");
          fetchCoupons();
        }
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-white space-y-8">
      <h2 className="text-2xl font-bold text-center">
        {editId ? "✏️ Edit Coupon" : "➕ Add New Coupon"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-[#1f1a40] p-6 rounded-lg border border-white/10"
      >
        <input
          type="text"
          {...register("code", { required: true })}
          placeholder="Coupon Code (e.g. SAVE10)"
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Coupon Name (e.g. Summer Sale)"
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          step="0.01"
          {...register("discount", { required: true })}
          placeholder="Discount (%)"
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-green-600 hover:bg-green-700 font-medium"
        >
          {editId ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <div className="space-y-4">
        {coupons.length === 0 ? (
          <p className="text-center text-gray-400">No coupons available.</p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-[#14112d] p-4 rounded border border-white/10 shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{coupon.name}</h3>
                  <p className="text-sm text-gray-300">
                    Code: {coupon.code} <br />
                    Discount: {coupon.discount}%
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageCoupons;
