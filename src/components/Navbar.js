import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  // const location = useLocation();
  return (
    <div>
      <div className="row nav-custom container-fluid ">
        <div className="nav-brand-container col-md-2">
          <div className="nav-brand">
            MemoMate
          </div>
        </div>
        <div className="nav-links-container col-md-2">
          {!localStorage.getItem("authToken") ? (
            <form>
            <div className="link-div">
            <Link className="btn btn-custom btn-dark mx-1" to="/Login" role="button">
                Login
              </Link>
              <Link className="btn btn-custom btn-dark mx-1" to="/Signup" role="button">
                Signup
              </Link>
            </div>
            </form>
          ) : (
            <button onClick={handleLogout} className="btn btn-custom btn-dark">
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
