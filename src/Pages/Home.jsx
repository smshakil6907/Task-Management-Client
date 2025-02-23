import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { AuthContext } from "../Provider/AuthProvider";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex h-screen p-2 gap-4">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between">
        <Sidebar></Sidebar>
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
