import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../services/actions";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("all");
  const [taskFilter, setTaskFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [dueDatePassed, setDueDatePassed] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem('all_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);


  const filteredTasks = tasks.filter((task) => {
    if (!task) {
      return false;
    }
    console.log("sdfas", task)
    const userId = task != undefined && task.assign_user_id !== null ? task.assign_user_id.toString() : null;

    if (selectedUser !== "all" && userId !== selectedUser) {
      return false;
    }
    if (taskFilter !== "all" && task.status !== taskFilter) {
      return false;
    }
    if (dueDatePassed && new Date(task.submission_date) >= new Date()) {
      return false;
    }
    return true;
  });

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setShowForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    let id = tasks[taskId].id
    const headers = {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("actualtoken"),
    };
    const response = await axios.delete(`http://localhost:3000/api/v1/todos/${id}`, { headers });
    if (response.status == 200) {
      dispatch(deleteTask(taskId));
    }

  };

  const handleEditTask = async (taskId, updatedTask) => {

    console.log("check values", taskId, updatedTask)
    let id = tasks[taskId].id
    const headers = {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("actualtoken"),
    };
    const to_do = tasks[taskId]

    const response = await axios.post(`http://localhost:3000/api/v1/todos/${id}/custom_update`, { to_do }, { headers });
    if (response.status == 200) {
      dispatch(editTask(taskId, updatedTask));
    }

  };

  return (
    <div>
      <div className="menu">
        <h2>All Task</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          Add New Task
        </button>
      </div>

      <div>
        <label>User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="all">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Task Status:</label>
        <select
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="ToDo">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={dueDatePassed}
            onChange={(e) => setDueDatePassed(e.target.checked)}
          />
          Due Date Passed
        </label>
      </div>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          openForm={showForm}
          setOpenForm={setShowForm}
          tasks_data={tasks}
        />
      )}
      <ul className="ul">
        {tasks && filteredTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => handleDeleteTask(index)}
            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;