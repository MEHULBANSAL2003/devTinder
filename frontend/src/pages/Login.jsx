import React, { useState } from "react";
import { validateLoginData } from "../utils/validation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    const message = validateLoginData(emailId, password);
    setError(message);

    if (message == null) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: {
            emailId: emailId,
            password: password,
          },
          withCredentials: true,
        });
        if (response.data.result == "success") {
          toast.success(response.data.message);
          dispatch(addUser(response.data.data));
          navigate("/feed");
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setEmailId("");
        setPassword("");
      }
    }
  };
  const togglePasswordVisibility = () => {
    if (password.current) {
      password.current.type =
        password.current.type === "password" ? "text" : "password";
    }
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center font-bold">
            Login
          </h2>

          <div>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="enter your email"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => {
                  setError(null);
                  setEmailId(e.target.value);
                }}
              />
              <div className="text-red-600 mt-1">
                {error && error.startsWith("Email") && <p>{error}</p>}
              </div>
            </label>

            <label className="form-control w-full max-w-xs relative">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute top-[65%] right-3 transform -translate-y-1/2 bg-transparent text-white hover:text-slate-100"
                type="button"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
              <div className="text-red-600 mt-1">
                {error && error.startsWith("Password") && <p>{error}</p>}
              </div>
            </label>
          </div>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
          <div className="font-semibold mt-4 flex justify-center">
            <p className="mx-8">
              Don't have an account?
              <Link to="/signup" className="text-slate-200 mx-2">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
