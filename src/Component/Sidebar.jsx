import React, { useContext } from "react";
import { FaBook, FaCheckDouble } from "react-icons/fa";
import { MdLabelImportantOutline } from "react-icons/md";
import { TbNotebookOff } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

export default function Sidebar() {
  const { user, logOut } = useContext(AuthContext);
  const data = [
    {
      title: "All Task",
      icon: <FaBook />,
      link: "allTask",
    },
    {
      title: "To Do",
      icon: <MdLabelImportantOutline />,
      link: "importentTask",
    },
    {
      title: "In Progress",
      icon: <FaCheckDouble />,
      link: "completedTask",
    },
    {
      title: "Done",
      icon: <TbNotebookOff />,
      link: "incompletedTask",
    },
  ];
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-semibold">Task Management</h1>
        <h2 className="text-gray-400 mb-1 mt-4">{user.email}</h2>
        <hr />
      </div>
      <div>
        {data.map((item) => (
          <NavLink
            to={item.link}
            className="my-2 flex items-center hover:bg-gray-500 p-2 rounded cursor-pointer gap-3"
          >
            {item.icon} {item.title}
          </NavLink>
        ))}
      </div>
      <div>
        <button onClick={logOut} className="w-full rounded p-3 bg-gray-500">
          Log Out
        </button>
      </div>
    </div>
  );
}
