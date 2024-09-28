import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserForm = ({onAddTask, openForm, setOpenForm}) => {
    const [title, setTitle] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
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
    
      const handleFormClose = () => {
        setOpenForm(false);
      };
    
      const handleAddUser = async (e) => {
        // const todoTasks = tasks_data.filter(task => task.status === 'ToDo');
        // const todoTasksCount = todoTasks.length;
        // const totalTasksCount = tasks_data.length;
        // const todoTasksPercentage = (todoTasksCount / totalTasksCount) * 100;
        // if (todoTasksPercentage >= 50) {
        //   toast.error("Existing todo tasks are >= 50% of total tasks");
        // } else {
        //   if (title.trim().length === 0) {
        //     setError("Title is mandatory");
        //     return;
        //   }
          const user = {
            title,
            lname,
            email,
          };
    
          const headers = {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("actualtoken"),
          };
          const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/users`  
          const response = await axios.post(API_URL, { user }, { headers });
          if (response.status == 200) {
            // onAddTask(response.data.data);
            setOpenForm(false);
          }
        // }
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

      const handleLnameChange =(e) =>{
        const lname = e.target.value.slice(0, 10);
        setLname(lname);
      }
    
      const handleEmailChange = (e) => {
        const newEmail = e.target.value
        setEmail(newEmail);
        if (newEmail.trim().length === 0) {
          setError("Title is mandatory");
        } else {
          setError("");
        }
      };

  return (
            <div>
      <Modal
        isOpen={openForm}
        onRequestClose={handleFormClose}
        contentLabel="Edit Task"
        className="task-modal"
      >
        <h2>Add User</h2>
        <div>
          <label>F-Name:<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={10}
            placeholder="Max 10 letters"
          />
        </div>
        <div>
          <label>L-Name:<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            value={lname}
            onChange={handleLnameChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {error && <label style={{ color: "red" }}>{error}</label>} 
        <button onClick={handleAddUser}>Add New User</button>
      </Modal>
    </div>
  )
}

export default UserForm