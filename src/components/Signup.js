import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import form_img from "./home_img2.webp"
import "./signup.css";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: credentials.userName,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/Login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("invalid details", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="image-container">
        <img className="form-image" src={form_img} alt="Image" />
        <div className="text-overlay-signup">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <div>
            <label htmlFor="exampleInputuserName" className=" frm-label">
                Username
              </label>
            </div>
              
              <input
                type="text"
                className="mx-2 frm-control"
                id="userName"
                onChange={onchange}
                name="userName"
                required
                minLength={5}
              />
            </div>
            <div className="mb-3">
            <div>
            <label htmlFor="email" className="frm-label">
                Email
              </label>
            </div>
             
              <input
                type="email"
                className="mx-2 frm-control"
                id="email"
                onChange={onchange}
                name="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
            <div>
            <label htmlFor="password" className="frm-label">
                Password
              </label>
            </div>
              
              <input
                type="password"
                className="mx-2 frm-control"
                id="password"
                onChange={onchange}
                name="password"
                required
                minLength={5}
              />
            </div>
            <button type="submit" className="mx-2 btn btn-dark">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
