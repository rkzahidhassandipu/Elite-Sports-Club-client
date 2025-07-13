import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-elite-primary via-elite-secondary to-elite-brand text-white">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 100 24v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
