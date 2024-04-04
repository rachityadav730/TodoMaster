import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
// import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

function Header() {
  const { setIsAuth, isAuth, setIsLoading, loading, userName, setUserName } =
    useContext(AppContext);

  const handleLogout = async () => {
    setIsLoading(true);
  };

  return (
    <nav className="main-navbar">
      <div>
        <h2> TODO APP</h2>
      </div>

      <div className="right-nav">
        <ul>
          {" "}
          <Link to="/">Home</Link>
        </ul>
        <ul>
          {" "}
          <Link to="/profile">Profile</Link>
        </ul>

        {isAuth ? (
          <>
            <button disabled={loading} onClick={handleLogout} className="btn">
              Logout
            </button>
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
