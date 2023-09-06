import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import login_img from "./img4.png"
const Login = (props) => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: credentials.userName,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("authToken", json.authToken);
      console.log("authToken");
      props.showAlert("Logged in Successfully", "success");
      navigate("/Notes");
    } else {
      props.showAlert("invalid credentials", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="image-container-login">
        <img className="login-img" src={login_img} alt="Image" />
        <div className="text-overlay">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputuserName" className="form-label">
                Username
              </label>
              <input
                type="userName"
                className="form-control"
                value={credentials.userName}
                onChange={onchange}
                id="userName"
                name="userName"
                aria-describedby="userNameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onchange}
                id="password"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
