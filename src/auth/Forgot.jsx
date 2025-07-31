import axios from "axios";
import React, { useState, useEffect } from "react";
import { authenticate, isAuth } from "./Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const Forgot = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;
  const [user, setUser] = useState(isAuth()); // Store user state

  // Effect to redirect once user updates
  useEffect(() => {
    if (user) {
      user.role === "admin" ? navigate("/admin") : navigate("/private");
    }
  }, [user, navigate]); // Runs only when user changes

  // Handle input change
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // Handle form submission
  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });
    // console.log("Send Request");

    try {
      const response = await axios.put(`${API}/forgot-password`, {
        email,
      });
      console.log("FORGOT PASSWORD SUCCESS", response);
      toast.success(response.data.message);
      setValues({ ...values, buttonText: "Requested" });
    } catch (error) {
      console.log("FORGOT PASSWORD ERROR", error.response?.data || error);
      toast.error(error.response?.data?.error || "Request failed. Try again.");
      setValues({ ...values, buttonText: "Request password reset link" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5 text-center">Forgot Password</h1>
        <div className="container">
          <form>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="email"
                className="form-control"
              />
            </div>

            <br />
            <button className="btn btn-success" onClick={clickSubmit}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
