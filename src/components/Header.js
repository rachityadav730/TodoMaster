import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
// import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

function Header() {
  const { setIsAuth, isAuth, setIsLoading, loading, userName, setUserName } =
    useContext(AppContext);

  const handleLogout = async () => {

    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json', 
        'authorization':  localStorage.getItem("actualtoken") , 
      };  
      const API_URL = `${process.env.REACT_APP_API_URL}/logout`     
      const response = await axios.delete(API_URL, { headers });
      if (response.status == 200 ){
        localStorage.removeItem("actualtoken")
      }
      setIsAuth(false);
      setIsLoading(false);
        if (!isAuth) return <Navigate to="/login" />;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status == 401 ){
        setIsAuth(false);
        return <Navigate to="/login" />;
      }
      else{
        toast.error("Logout failed. Please try again.");
      }
      // Show error toast
    }
    setIsLoading(true);
  };

  return (
    <nav className="main-navbar">
      <div>
        <h2> Task Manager APP</h2>
      </div>

      <div className="right-nav">
        <ul>
          {" "}
          <Link to="/">Home</Link>
        </ul>
        {/* <ul>
          {" "}
          <Link to="/profile">Profile</Link>
        </ul> */}

        {isAuth ? (
          <>
            <ul style={{cursor: "pointer"}} onClick={handleLogout} >
              {loading ? "Logging out..." : "Logout"}
            </ul>
          </>
        ) : (
          <ul>
            {" "}
            <Link to="/login">Login</Link>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
