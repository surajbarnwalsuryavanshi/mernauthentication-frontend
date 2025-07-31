import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie, isAuth, signout, updateUser } from "../auth/Helpers";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const Admin = () => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: ".",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("ADMIN PROFILE UPDATE", response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("ADMIN PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            navigate("/");
          });
        }
      });
  };

  const { role, name, email, password, buttonText } = values;

  const handleChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });

    try {
      const response = await axios({
        method: "PUT",
        url: `${API}/user/update`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { name, password },
      });
      //   name,
      //   email,
      //   password,
      // });

      console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
      updateUser(response, () => {
        setValues({ ...values, buttonText: "Submitted" });
        toast.success("Profile updated successfully");
      });
    } catch (error) {
      console.error(
        "ADMIN PROFILE UPDATE ERROR",
        error.response?.data?.error || error.message
      );
      setValues({ ...values, buttonText: "Submit" });
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const updateForm = () => {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label className="text-muted">Role</label>
            <input
              type="text"
              className="form-control"
              value={role}
              readOnly
              disabled
            />
          </div>

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
              type="email"
              className="form-control"
              value={email}
              readOnly
              disabled
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
        <h1 className="pt-5 text-center">Admin</h1>
        <p className="lead text-center">Profile Update</p>
        {updateForm()}
      </div>
    </>
  );
};

export default Admin;
