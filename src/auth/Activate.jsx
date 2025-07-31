import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API;

const Activate = () => {
  const { token } = useParams(); // Extract token from URL
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
    buttonText: "Activate Account",
  });

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setValues((prevValues) => ({
          ...prevValues,
          name: decoded.name,
          token,
        }));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  const { name, buttonText } = values;

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues((prevValues) => ({ ...prevValues, buttonText: "Submitting..." }));

    axios({
      method: "POST",
      url: `${API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 text-center">
        <ToastContainer />
        <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
        <button className="btn btn-outline-success" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Activate;
