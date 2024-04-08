import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import { AppContext } from "../components/AppContextProvider";
import { Form, Navigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../services/actions";
import { updateTasks } from "../services/actions"; // Assuming you have an action to update all tasks


function Home() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { setIsAuth, isAuth } = useContext(AppContext);


 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = localStorage.getItem("actualtoken");
        if (authToken) {
          const headers = {
            'Content-Type': 'application/json',
            'authorization': authToken,
          };
          const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/todos`  

          const response = await axios.get(API_URL, { headers });
          if (response.status === 200) {
            const tasks = response.data.data;
            dispatch(updateTasks(tasks)); 
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.log("error:", error);
        setIsAuth(false);
        toast.error(error.response.data.message);
      }
    };

    checkAuth();
  }, [dispatch, setIsAuth, refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
            <div className="container">
                <TaskList />
            </div>
    </div>
  );
}

export default Home;
