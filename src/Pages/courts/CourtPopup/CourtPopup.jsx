import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const CourtPopup = ({ isOpen, onClose, court }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [selectedSlots, setSelectedSlots] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm();

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const onSubmit = async (data) => {
  if (!selectedSlots.length) {
    toast.error("Please select at least one time slot");
    return;
  }

  const bookingData = {
    courtId: court._id,
    courtName: `${court.type} Court`,
    slots: selectedSlots,
    date: data.date,
    pricePerSlot: court.price,
    userEmail: user?.email,
  };

  try {
    const res = await axiosPublic.post("bookings", bookingData);
    if (res.data) {
      toast.success("Booking successful!");
      reset();
      setSelectedSlots([]);
      onClose();
    } else {
      toast.error("Booking failed, try again.");
    }
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error(error.response.data?.error || "Some slots already booked");
    } else {
      toast.error("Booking failed");
    }
    console.error("Booking error:", error);
  }
};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gradient-to-br from-elite-secondary/50 via-elite-brand/50 to-elite-primary/50 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="relative bg-gradient-to-br from-[#100c2a] via-elite-brand to-[#201b62] p-6 rounded-lg shadow-xl text-white w-full max-w-lg">
              <button
                className="absolute top-4 right-4 text-white hover:text-red-400"
                onClick={onClose}
              >
                <FaTimes />
              </button>

              <Dialog.Title className="text-2xl font-bold mb-4">
                Book {court?.type} Court
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Court</label>
                  <input
                    type="text"
                    value={`${court?.type} Court`}
                    readOnly
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Price per Slot</label>
                  <input
                    type="text"
                    value={`$${court?.price}`}
                    readOnly
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Choose Date</label>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Select Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                    {court?.slots?.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSlotToggle(slot)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          selectedSlots.includes(slot)
                            ? "bg-elite-hover1 text-white border border-white"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Total Price</label>
                  <input
                    type="text"
                    value={`$${court.price * selectedSlots.length}`}
                    readOnly
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-2 rounded bg-elite-primary hover:bg-elite-hover1 text-white font-semibold transition duration-300 disabled:opacity-50"
                >
                  Submit Booking Request
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CourtPopup;
