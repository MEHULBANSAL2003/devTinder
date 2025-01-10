import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateSignUpData } from "../utils/validation";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    const message = validateSignUpData(firstName, lastName, emailId, password);

    setError(message);

    if (message === null) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/signup`;

      try {
        const response = await axios({
          method: "post",
          url: url,
          data: {
            firstName: firstName,
            lastName: lastName,
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
        toast.error(err.response.data.message);
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");
      }
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-4xl justify-center font-bold text-white">
            DevTinder
          </h2>
          <h2 className="w-60 mx-12 font-semibold">
            Signup to meet developers and
          </h2>
          <h2 className="w-60 mx-24 -my-2">connect with them.</h2>

          <div>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="enter your first name"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => {
                  setError(null);
                  setFirstName(e.target.value);
                }}
              />
              <div className="text-red-600 mt-1 text-md">
                {error && error.startsWith("First") && <p>{error}</p>}
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">Last name</span>
              </div>
              <input
                type="text"
                placeholder="enter your last name"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => {
                  setError(null);
                  setLastName(e.target.value);
                }}
              />
              <div className="text-red-600 mt-1 text-md">
                {error && error.startsWith("Last") && <p>{error}</p>}
              </div>
            </label>
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
              <div className="text-red-600 mt-1 text-md">
                {error && error.startsWith("Email") && <p>{error}</p>}
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="enter your password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
              />

              <div className="text-red-600 mt-1 text-md">
                {error && error.startsWith("Password") && <p>{error}</p>}
              </div>
            </label>
          </div>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
          <div className="font-semibold mt-4 flex justify-center">
            <p className="mx-8">
              Already have an account?
              <Link to="/login" className="text-slate-200 mx-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
