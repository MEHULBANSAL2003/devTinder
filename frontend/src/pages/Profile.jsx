import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import ServerError from "../components/ServerError";

const Profile = () => {
 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user,setUser]=useState(null);


 
const fetchUser=async()=>{
  const url= `${import.meta.env.VITE_BACKEND_URL}/profile/view`;

try{
  const response=await axios({
    method:"get",
    url:url,
    withCredentials:true
  });
   
  if(response.data.result==="success"){
    setUser(response.data.data);
  }
}
catch(err){
  toast.error(err.response.data.message);
}
}


useEffect(()=>{ 
  fetchUser();
},[]);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewProfilePic = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfilePic = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleFileChange = (e) => {
    setError(null);
    setNewProfilePic(e.target.files[0]);
  };



  const handleUpload = async () => {
    setIsUpdateModalOpen(false);
    if (!newProfilePic) {
      return setError("Please select new profile photo");
    }

    setLoading(true);
    try {
      const filename = encodeURIComponent(newProfilePic.name);
      const contentType = newProfilePic.type;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate-upload-url`,
        {
          filename,
          contentType,
        }
      );

      if (response.data.result === "success") {
        const signedUrl = response.data.url;

        await axios.put(signedUrl, newProfilePic, {
          headers: {
            "Content-Type": contentType,
          },
        });
        const updatedUrl = response.data.key;
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/profile/edit/profilepicture`;
        const res = await axios({
          method: "post",
          url: url,
          data: {
            imageUrl: updatedUrl,
          },
          withCredentials: true,
        });

       
        if (res.data.result === "success") {
          setUser(res.data.data);
          toast.success(res.data.message);
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  if(!user){
    return <ServerError/>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8 relative">
        <button
          onClick={handleEditProfile}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
        <div className="flex  flex-col md:flex-row items-center gap-8 relative">
          <div className="relative">
            <img
              src={user.photoUrl} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300"
            />
            <div
              className="absolute bottom-1 right-2 bg-slate-900  border border-gray-300 rounded-full shadow-md p-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={toggleMenu}
            >
              <FaCamera />
            </div>
            {isMenuOpen && (
              <div className="absolute top-36 left-24 bg-white border border-gray-300 rounded shadow-md w-40">
                <button
                  onClick={handleViewProfilePic}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  View Profile Pic
                </button>
                <button
                  onClick={handleUpdateProfilePic}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  Update Profile Pic
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 text-lg">{user.userName}</p>
            <p className="mt-4 text-gray-700">{user.about}</p>

            <div className="mt-4 flex gap-6 text-lg text-gray-600">
              <div>
                <p className="font-semibold">Age</p>
                <p>{user.age || "Not available"}</p>
              </div>
              <div>
                <p className="font-semibold">Gender</p>
                <p>{user.gender || "Not available"}</p>
              </div>
            </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-4">
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-96 h-96 object-cover rounded-md"
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Update Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 border border-gray-300 rounded px-4 py-2"
            />
            {error && (
              <div className="text-sm text-red-600 -mt-2 mb-2">{error}</div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseUpdateModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
