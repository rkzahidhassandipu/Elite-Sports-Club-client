import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { login, createUserWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await createUserWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gradient-to-br from-purple-800/40 to-indigo-700/30 backdrop-blur-md rounded-xl p-8 shadow-2xl space-y-5 border border-purple-700"
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-sm text-purple-200">Sign in to your account</p>

        <div>
          <label className="text-sm text-purple-300">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-purple-300">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition font-semibold"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-purple-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 underline">
            Sign up
          </Link>
        </div>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-transparent px-2 text-purple-400">OR</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2 border border-gray-500 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="bg-gray-900/80 p-4 rounded-md text-sm mt-4 border border-gray-700">
          <p className="font-semibold text-purple-300">Demo Accounts:</p>
          <p>
            <span className="text-purple-100">Admin:</span> admin@elite.com / admin123
          </p>
          <p>
            <span className="text-purple-100">Member:</span> member@elite.com / member123
          </p>
          <p>
            <span className="text-purple-100">User:</span> user@elite.com / user123
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
