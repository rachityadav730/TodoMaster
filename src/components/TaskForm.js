import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";

function TaskForm({ onAddTask, openForm, setOpenForm, tasks_data }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ToDo");
  const [error, setError] = useState("");
  const [submission_date, setSubmission_date] = useState('');
  const [assign_user_id, setAssignUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('all_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);


  const handleChange = (event) => {
    const userId = event.target.value;
    setAssignUserId(userId);
  };

  const handleDateChange = (event) => {
    setSubmission_date(event.target.value);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleAddTask = async (e) => {

    const todoTasks = tasks_data.filter(task => task.status === 'ToDo');
    const todoTasksCount = todoTasks.length;
    const totalTasksCount = tasks_data.length;
    const todoTasksPercentage = (todoTasksCount / totalTasksCount) * 100;
    if (todoTasksPercentage >= 50) {
      toast.error("Existing todo tasks are >= 50% of total tasks");
    } else {
      if (title.trim().length === 0) {
        setError("Title is mandatory");
        return;
      }
      const to_do = {
        title,
        description,
        status,
        submission_date,
        assign_user_id,
      };

      const headers = {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem("actualtoken"),
      };
      const response = await axios.post("http://localhost:3000/api/v1/todos", { to_do }, { headers });
      if (response.status == 200) {
        onAddTask(response.data.data);
      }
      setTitle("");
      setDescription("");
      setStatus("ToDo");
    }


  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value.slice(0, 10);
    setTitle(newTitle);
    if (newTitle.trim().length === 0) {
      setError("Title is mandatory");
    } else {
      setError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  };


  return (
    <div>
      <Modal
        isOpen={openForm}
        onRequestClose={handleFormClose}
        contentLabel="Edit Task"
        className="task-modal"
      >
        <h2>Add Task</h2>
        <div>
          <label>Title:<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={10}
            placeholder="Max 10 letters"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            rows="4"
            className="textarea"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Max 100 letters"
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={submission_date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>User</label>
          <select value={assign_user_id} onChange={handleChange}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        {error && <label style={{ color: "red" }}>{error}</label>} 
        <button onClick={handleAddTask}>Add New Task</button>
      </Modal>
    </div>
  );
}

export default TaskForm;