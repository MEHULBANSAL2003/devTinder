import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser,addUser } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosNotifications } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/logout`;
    try {
      const response = await axios({
        method: "post",
        url: url,
        withCredentials: true,
      });

      if (response.data.result == "success") {
        toast.success(response.data.message);

        dispatch(removeUser());
        sessionStorage.removeItem("user");

        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {!user && (
        <button onClick={handleLogin} className="mx-4">
          <IoLogIn size={40} />
        </button>
      )}
      {user && (
        <div className="flex-none gap-2">
          <Link to="/requests">
            {" "}
            <div className="mx-5 cursor-pointer">
              {" "}
              <IoIosNotifications size={30} />
            </div>{" "}
          </Link>
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user profile" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/user/change-password"> Change Password</Link>
              </li>

              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
