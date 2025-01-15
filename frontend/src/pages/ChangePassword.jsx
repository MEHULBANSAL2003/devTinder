import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ChangePassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    reNewPassword: false,
  });

  const [password, setPassword] = useState("");
  const [rePass, setRePassword] = useState("");
  const [oldPass, setOldPass] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = () => {};

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center font-bold">
            Change Password
          </h2>

          <div>
            {/* Old Password */}
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">Old Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPasswords.oldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  className="input input-bordered w-full max-w-xs"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
                <button
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 bg-transparent text-white hover:text-slate-100"
                  type="button"
                >
                  {showPasswords.oldPassword ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>
              </div>
            </label>

            {/* New Password */}
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 bg-transparent text-white hover:text-slate-100"
                  type="button"
                >
                  {showPasswords.newPassword ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>
              </div>
            </label>

            {/* Re-enter New Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Re-enter New Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPasswords.reNewPassword ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  className="input input-bordered w-full max-w-xs"
                  value={rePass}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <button
                  onClick={() => togglePasswordVisibility("reNewPassword")}
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 bg-transparent text-white hover:text-slate-100"
                  type="button"
                >
                  {showPasswords.reNewPassword ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>
              </div>
            </label>
          </div>

          <div className="card-actions justify-center mt-6">
            <button onClick={handleChangePassword} className="btn btn-primary">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
