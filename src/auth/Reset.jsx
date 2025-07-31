import axios from "axios";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authenticate, isAuth } from "./Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        validToken: "",
        newPassword: "",
        buttonText: "Reset password reset link",
    });

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setValues((prevValues) => ({ ...prevValues, name: decoded.name, token }));
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [token]);

    const { name, validToken, newPassword, buttonText } = values;
    const [user, setUser] = useState(isAuth()); // Store user state

    // Effect to redirect once user updates
    useEffect(() => {
        if (user) {
            user.role === "admin" ? navigate("/admin") : navigate("/private");
        }
    }, [user, navigate]); // Runs only when user changes

    // Handle input change
    const handleChange = (event) => {
        setValues({ ...values, newPassword: event.target.value });
    };

    // Handle form submission
    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: "Submitting..." });
        // console.log("Send Request");


        try {
            const response = await axios.put("http://localhost:8000/api/reset-password", {
                newPassword,
                resetPasswordLink: token,
            });
            console.log("RESET PASSWORD SUCCESS", response);
            toast.success(response.data.message);
            setValues({ ...values, buttonText: 'Done' });

        } catch (error) {
            console.log("RESET PASSWORD ERROR", error.response?.data || error);
            toast.error(error.response?.data?.error || "Request failed. Try again.");
            setValues({ ...values, buttonText: "Reset password" });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="col-md-6 offset-md-3">
                <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={handleChange} value={newPassword} type="password" className="form-control" placeholder="Type new password" required />
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

export default Reset;
