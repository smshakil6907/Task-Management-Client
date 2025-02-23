import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Card({ setInputdev }) {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", description: "" });

  // Fetch tasks from MongoDB
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to delete a task
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
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (task) => {
    setEditTask(task);
    setEditedData({ title: task.title, description: task.description });
  };

  // Handle Update Task
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/task/${editTask._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setTasks(
          tasks.map((task) =>
            task._id === editTask._id ? { ...task, ...editedData } : task
          )
        );
        setEditTask(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{task.title}</h3>
              <p className="text-gray-300 my-2">{task.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button className="p-2 rounded bg-blue-500">
                {task.category}
              </button>
              <div className="text-white p-2 w-3/6 text-xl flex justify-around">
                <button>
                  <CiHeart />
                </button>
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
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

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 px-4">
          <div className="bg-gray-900 p-6 rounded-md w-full max-w-md sm:max-w-lg">
            <h2 className="text-white text-2xl mb-4 text-center">Edit Task</h2>

            {/* Title Input */}
            <input
              type="text"
              value={editedData.title}
              onChange={(e) =>
                setEditedData({ ...editedData, title: e.target.value })
              }
              className="w-full px-3 py-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
              placeholder="Title (max 50 chars)"
              maxLength="50"
              required
            />

            {/* Description Input */}
            <textarea
              value={editedData.description}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
              className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none resize-none"
              placeholder="Description (max 200 chars)"
              maxLength="200"
              rows="4"
            ></textarea>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setEditTask(null)}
                className="px-4 py-2 bg-gray-500 rounded text-white transition hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 rounded text-white transition hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
