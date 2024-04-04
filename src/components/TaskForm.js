import React, { useState } from "react";
import Modal from "react-modal";

function TaskForm({ onAddTask, openForm, setOpenForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleAddTask = () => {
    const newTask = {
      title,
      description,
      status,
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setStatus("pending");
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
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            rows="4"
            className="textarea"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <button onClick={handleAddTask}>Add New Task</button>
      </Modal>
    </div>
  );
}

export default TaskForm;