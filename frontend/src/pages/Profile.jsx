import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate=useNavigate();
  
  const handleEditProfile=()=>{
      navigate("/profile/edit");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8 relative">
        <button onClick={handleEditProfile} className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 text-lg">{user.emailId}</p>
            <p className="mt-4 text-gray-700">{user.about}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          {user.skills.length > 0 ? (
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              {user.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No skills added yet.</p>
          )}
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          Member since: {new Date(user.createdAt).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
