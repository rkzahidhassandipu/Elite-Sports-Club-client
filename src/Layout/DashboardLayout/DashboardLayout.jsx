import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../Pages/Share/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary text-white">
      {/* Fixed Sidebar */}
      <div className="flex">
        <div className="w-64 h-screen fixed top-0 left-0 bg-[#1f1b44] border-r border-white/10 z-50">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="ml-64 flex-1 px-6 overflow-y-auto h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
