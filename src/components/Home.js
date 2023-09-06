import React from "react";
import "./home.css";
import home_img1 from "./home_img1.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container home row">
        <div className="col-md-6">
          <img className="home_image" src={home_img1} alt="" />
        </div>
        <div className="container col-md-6 home_text">
          <div className="mx-5 txt">
            <p className="headline">Forget about your messy Notes.</p>
          </div>
          <div className="mx-5 txt">
            <h5>
                  "  Unlock Your Productivity with MemoMate , Your Personal Digital Notebook.",
                
            </h5>
          </div>
          <div className="mx-5 my-5 row">
            <div className=" col-md-6">
              <h3>New user?</h3>
              <Link to="/Signup" className="btn btn-custom btn-dark mx-1">
                Signup
              </Link>
            </div>
            <div className="col-md-6">
              <h3>Existing user?</h3>
              <Link to="/Login" className="btn btn-custom btn-dark mx-1">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
