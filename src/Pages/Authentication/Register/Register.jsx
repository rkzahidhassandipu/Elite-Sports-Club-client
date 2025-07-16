import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, userProfileUpdated, createUserWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [previewUrl, setPreviewUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // 🔵 Handle image upload
  const handlePreview = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imgbbURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(imgbbURL, formData);
      setPreviewUrl(res.data.data.url);
      toast.success("Profile image uploaded!");
    } catch {
      toast.error("Image upload failed. Try again.");
    }
  };

  // ✅ Submit handler
  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);

      await userProfileUpdated({
        displayName: data.name,
        photoURL: previewUrl || "",
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        userRole: "user",
        createdAt: new Date(),
      };

      await axiosPublic.post("users", userInfo);

      toast.success("Account created successfully!");
      reset();
      setPreviewUrl("");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else {
        toast.error("Registration failed. Try again.");
      }
    }
  };

  // ✅ Show validation errors one-by-one
  const onError = (formErrors) => {
    const fieldOrder = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "profileImage",
    ];

    for (const field of fieldOrder) {
      if (formErrors[field]) {
        toast.error(formErrors[field].message);
        break; // ✅ Stop after showing the first error
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const userCredential = await createUserWithGoogle(); // Auth success
      const user = userCredential?.user;

      if (!user?.email) {
        toast.error("Google sign-in failed: No email found");
        return;
      }

      // Check if user already exists
      const { data: existingUser } = await axiosPublic.get(`exists/users?email=${user.email}`);


      if (!existingUser?._id) {
        // User does not exist, save to DB
        const newUser = {
          name: user.displayName || "Unknown",
          email: user.email,
          role: "user",
          createdAt: new Date(),
        };

        await axiosPublic.post("empty/users", newUser);
      }

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error(
        err.response?.data?.error || err.message || "Google sign-in failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-xl px-8 py-10 text-white space-y-5 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-center">
          Join Elite Sports Club
        </h2>
        <p className="text-center text-sm text-purple-200">
          Create your account
        </p>

        {/* Profile Image Upload */}
        <div>
          <label className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700">
            <FaUserAlt />
            <span>Upload Profile Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImage", {
                required: "Profile image is required",
              })}
              onChange={handlePreview}
            />
          </label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-3 h-20 w-20 object-cover rounded-full mx-auto border border-purple-300"
            />
          )}
        </div>

        {/* Name */}
        <input
          type="text"
          {...register("name", { required: "Full name is required" })}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600"
        />

        {/* Email */}
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 pr-10"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 pr-10"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-white"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:from-purple-600 hover:to-blue-500 transition"
        >
          Create Account
        </button>

        {/* OR divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-sm text-white">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* Google Sign-in */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full border border-white/30 py-2 rounded-md hover:bg-white/10 transition"
        >
          Continue with Google
        </button>

        <p className="text-center mt-4 text-white text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
