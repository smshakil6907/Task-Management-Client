import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Card({ setInputdev }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from MongoDB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/task/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Remove deleted task from state
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{task.title}</h3>
              <p className="text-gray-300 my-2">{task.description}</p>
              <p>Date: {task.timestamp}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`p-2 rounded ${
                  task.category === "Done"
                    ? "bg-green-600 text-gray-800"
                    : "bg-red-400"
                }`}
              >
                {task.category}
              </button>
              <div className="text-white p-2 w-3/6 text-xl flex justify-around">
                <button>
                  <CiHeart />
                </button>
                <button>
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No tasks available</p>
      )}

      {/* Add Task Button */}
      <button
        onClick={() => setInputdev("fixed")}
        className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:bg-slate-900 cursor-pointer"
      >
        <IoIosAddCircle className="text-5xl" />
        <h2 className="text-2xl mt-4">Add Task</h2>
      </button>
    </div>
  );
}
