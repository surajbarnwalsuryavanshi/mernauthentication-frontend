import axios from "axios";
import React, { useState, useEffect } from "react";
import { authenticate, isAuth } from "./Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit",
    });

    const { email, password, buttonText } = values;
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

        try {
            const response = await axios.post("http://localhost:8000/api/signin", {
                email,
                password,
            });

            console.log("SIGNIN SUCCESS", response);

            // Authenticate user and store token
            authenticate(response, () => {
                setValues({ ...values, email: "", password: "", buttonText: "Submitted" });

                // ✅ Fetch updated user and trigger re-render
                setUser(isAuth());
            });
        } catch (error) {
            console.log("SIGNIN ERROR", error.response?.data || error);
            setValues({ ...values, buttonText: "Submit" });
            toast.error(error.response?.data?.error || "Signin failed. Try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="col-md-6 offset-md-3">
                <h1 className="p-5 text-center">Auth - SignIn</h1>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={handleChange("email")} value={email} type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={handleChange("password")} value={password} type="password" className="form-control" />
                        </div>

                        <br />
                        <button className="btn btn-success" onClick={clickSubmit}>
                            {buttonText}
                        </button>
                    </form>
                    <br />
                    <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
                </div>
            </div>
        </>
    );
};

export default SignIn;
