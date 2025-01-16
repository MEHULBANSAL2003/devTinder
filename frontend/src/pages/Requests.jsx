import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import { useNavigate } from "react-router-dom";
import ServerError from "../components/ServerError";

const Requests = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPendingRequests = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/requests/recieved`;

    try {
      const response = await axios({
        method: "get",
        url: url,
        withCredentials: true,
      });

      if (response.data.result === "success") {
        setUserData(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleMakeConnection = async () => {
    navigate("/feed");
  };

  const handleActionComplete = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user._id !== userId)
    );
  };

  if (loading ) return <Loader />;
  if(!userData) return <ServerError/>
  if (userData.length === 0) {
    return (
      <div className="flex flex-col items-center text-white mt-48 mb-52">
        <p className="text-xl font-bold mb-4">No more Pending requests!!</p>
        <button
          onClick={handleMakeConnection}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg"
        >
          Let's Make Connections
        </button>
      </div>
    );
  }
  return (
    <div className="p-4 space-y-4">
      {userData.map((user) => (
        <RequestCard
          key={user._id}
          user={user}
          onActionComplete={handleActionComplete}
        />
      ))}
    </div>
  );
};

export default Requests;
