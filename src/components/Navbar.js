import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  
  const context = useContext(NoteContext);
  const { info, getInfo } = context;
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getInfo();
    } 
  }, [getInfo]);
  // const location = useLocation();
  return (
    <div>
      <div className="row nav-custom container-fluid ">
        <div className="nav-brand-container col-md-2">
          <div className="nav-brand">MemoMate</div>
        </div>
        <div className="nav-links-container col-md-2">
          {!localStorage.getItem("authToken") ? (
            <form>
              <div className="link-div">
                <Link
                  className="btn btn-custom btn-dark mx-1"
                  to="/Login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-custom btn-dark mx-1"
                  to="/Signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            </form>
          ) : (
            <form>
              <button
                onClick={handleLogout}
                className="btn btn-custom btn-dark"
              >
                Log Out
              </button>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </button>
                <ul class="dropdown-menu profile_info">
                  <li>
                    <a class="dropdown-item" href="#">
                      {info.userName}
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      {info.email}
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
