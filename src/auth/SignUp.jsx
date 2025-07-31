import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth } from "./Helpers";
import { Link, Navigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              value={name}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange("password")}
              value={password}
              type="password"
              className="form-control"
            />
          </div>
          <br />
          <div>
            <button className="btn btn-success" onClick={clickSubmit}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({name, email, password})} */}
        {isAuth() ? <Navigate to="/" /> : null}
        <h1 className="p-5 text-center">Auth-SignUp</h1>
        {signupForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot Password
        </Link>
      </div>
    </>
  );
};

export default SignUp;
