import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { AuthContext } from "../Provider/AuthProvider";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen p-2 gap-4">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`lg:w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between 
        bg-gray-900 text-white fixed lg:relative top-0 left-0 h-full transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 border border-gray-500 rounded-xl p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
