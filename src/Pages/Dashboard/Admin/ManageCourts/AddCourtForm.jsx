// AddCourtForm.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddCourtForm = ({ onSubmit, editingCourt, setEditingCourt }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    price: "",
    slots: "",
  });

  // If editing, pre-fill form
  useEffect(() => {
    if (editingCourt) {
      setFormData({
        name: editingCourt.name,
        type: editingCourt.type,
        image: editingCourt.image,
        price: editingCourt.price,
        slots: editingCourt.slots.join(", "),
      });
    }
  }, [editingCourt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, type, image, price, slots } = formData;
    if (!name || !type || !image || !price || !slots) {
      toast.error("❌ All fields are required");
      return;
    }

    const data = {
      name,
      type,
      image,
      price: parseFloat(price),
      slots: slots.split(",").map((s) => s.trim()),
      updatedAt: new Date().toISOString(),
    };

    if (!editingCourt) {
      data.createdAt = new Date().toISOString();
    }

    onSubmit(data); // Pass to parent
    setFormData({ name: "", type: "", image: "", price: "", slots: "" });
    setEditingCourt(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1f1a40] p-6 rounded-lg border border-white/10 space-y-4 max-w-xl mx-auto text-white"
    >
      <h3 className="text-xl font-semibold mb-2 text-elite-primary">
        {editingCourt ? "✏️ Update Court" : "➕ Add New Court"}
      </h3>

      <input
        type="text"
        placeholder="Court Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder="Court Type"
        value={formData.type}
        onChange={(e) =>
          setFormData({ ...formData, type: e.target.value })
        }
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) =>
          setFormData({ ...formData, image: e.target.value })
        }
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder='Slots ("08:00-09:00,09:00-10:00")'
        value={formData.slots}
        onChange={(e) =>
          setFormData({ ...formData, slots: e.target.value })
        }
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium w-full"
      >
        {editingCourt ? "Update Court" : "Add Court"}
      </button>
    </form>
  );
};

export default AddCourtForm;
