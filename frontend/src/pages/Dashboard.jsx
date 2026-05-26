import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchTasks = async () => {

    const { data } = await axios.get(
      "http://localhost:5000/api/tasks",
      config
    );

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {

    if (!title) return;

    await axios.post(
      "https://task-manager-backend-pxtd.onrender.com/api/tasks",
      {
        title,
        completed: status === "Completed"
      },
      config
    );

    setTitle("");

    fetchTasks();
  };

  const completeTask = async (id) => {

    await axios.put(
      `https://task-manager-backend-pxtd.onrender.com/api/tasks/${id}`,
      {},
      config
    );

    fetchTasks();
  };

  const deleteTask = async (id) => {

    await axios.delete(
      `https://task-manager-backend-pxtd.onrender.com/api/tasks/${id}`,
      config
    );

    fetchTasks();
  };

  return (
    <div className="dashboard">

      <Navbar />

      <h1 className="heading">
        Task Manager Dashboard
      </h1>

      <div className="task-input-section">

        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      <div className="tasks-container">

        {
          tasks.length === 0
          ? <p className="no-task">No tasks found</p>
          : tasks.map((task)=>(
              <TaskItem
                key={task._id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            ))
        }

      </div>

    </div>
  );
}

export default Dashboard;