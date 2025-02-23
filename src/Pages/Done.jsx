import React, { useEffect, useState } from "react";

export default function Done() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchDoneTasks();
  }, []);

  // Fetch only "Done" category tasks
  const fetchDoneTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks/done");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching Done tasks:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="bg-gray-800 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-bold text-white">{task.title}</h3>
            <p className="text-gray-300 my-2">{task.description}</p>
            <p>Date: {task.timestamp}</p>
            <button className="px-3 py-1 bg-green-500 text-white rounded mt-3">
              {task.category}
            </button>
          </div>
        ))
      ) : (
        <p className="text-white">No Done tasks available</p>
      )}
    </div>
  );
}
