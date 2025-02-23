import React, { useState } from "react";
import { ImCross } from "react-icons/im";

export default function InputData({ inputdev, setInputdev }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      alert("Title is required!");
      return;
    }

    if (task.title.length > 50) {
      alert("Title must be 50 characters or less.");
      return;
    }

    if (task.description.length > 200) {
      alert("Description must be 200 characters or less.");
      return;
    }

    const newTask = {
      ...task,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const result = await response.json();
      if (result.insertedId) {
        alert("Task added successfully!");
        setTask({ title: "", description: "", category: "To-Do" });
        setInputdev("hidden");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`${inputdev} fixed top-0 left-0 bg-gray-800 h-screen w-full opacity-80`}
      />

      {/* Modal */}
      <div
        className={`${inputdev} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Add Task</h2>
            <button
              onClick={() => setInputdev("hidden")}
              className="text-2xl text-white"
            >
              <ImCross />
            </button>
          </div>

          {/* Title Input */}
          <input
            placeholder="Title (Required, max 50 chars)"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="px-3 py-2 rounded w-full bg-gray-700 text-white"
            type="text"
            maxLength="50"
            required
          />

          {/* Description Input */}
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description (Optional, max 200 chars)"
            className="px-3 py-2 rounded w-full my-3 bg-gray-700 text-white"
            maxLength="200"
          />

          {/* Category Selection */}
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="px-3 py-2 rounded w-full bg-gray-700 text-white"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl w-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
