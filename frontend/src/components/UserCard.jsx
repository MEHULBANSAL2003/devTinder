import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);
  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };
  return (
    <div className="bg-base-300 rounded-lg shadow-lg p-6 flex flex-col items-center text-center text-white space-y-4">
      <img
        src={user.photoUrl}
        alt="user photo"
        className="w-24 h-24 rounded-full object-cover border-4 border-white"
      />
      <h2 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-gray-200">{user.email}</p>
      <div className=" flex ">
        <button
          onClick={handleViewProfile}
          className="bg-blue-500 hover:bg-blue-600 text-sm px-6 py-2 rounded-lg shadow-md"
        >
          View Profile
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-sm px-6 py-2 rounded-lg shadow-md mx-4">
          Remove Connection
        </button>
      </div>
    </div>
  );
};

export default UserCard;
