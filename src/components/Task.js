import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function Task({ task, onDelete, onEdit }) {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem('all_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    setEditedTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      submission_date: task.submission_date,
      assign_user_id: task.assign_user_id
    });
  }, [task]);

  const handleEdit = () => {
    setIsEditing(true);
    handleOpen();
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit(editedTask);
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "Pending":
        return "#f0ad4e";
      case "InProgress":
        return "#5bc0de";
      case "Complete":
        return "#5cb85c";
      default:
        return "#000000";
    }
  };

  const assignedUser = users.find(user => user.id === parseInt(task.assign_user_id));

  return (
    <li className="task-list">
      {isEditing ? (
        <>
          <Modal
            isOpen={open}
            onClose={handleClose}
            contentLabel="Edit Task"
            className="task-modal"
          >
            <h2>Update Task</h2>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                rows="4"
                className="textarea"
                type="text"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={editedTask.submission_date}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, submission_date: e.target.value })
                }
              />
            </div>
            <div>
              <label>User:</label>
              <select
                value={editedTask.assign_user_id}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assign_user_id: e.target.value })
                }
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Status:</label>
              <select
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <button onClick={handleSaveEdit}>Update Task</button>
          </Modal>
        </>
      ) : (
        <>
          <div>
            <div className="tasklist-status">
              <p style={{ backgroundColor: getStatusColor() }} >{task.status}</p>
            </div>
            <div className="tasklist-title">
              <p>{task.title}</p>
            </div>
            <div className="tasklist-date">
              <p>Submission Date:{task.submission_date ? task.submission_date : 'Not Mentioned'}</p>
            </div>
            <div className="tasklist-dis">
              <p>Assign User: {assignedUser ? assignedUser.name : 'Not Assigned'}</p>
            </div>
            <div className="tasklist-dis">
              <p>{task.description}</p>
            </div>

          </div>

          <div className="task-btns">
            <button className="task-btn" onClick={handleEdit}>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button className="task-btn" onClick={onDelete}>
              {" "}
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Task;