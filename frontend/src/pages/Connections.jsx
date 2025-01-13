import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const [connection, setConnection] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleMakeConnection = () => {
    navigate("/feed");
  };

  const getAllConnections = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/connection`;
    try {
      const response = await axios({
        method: "get",
        url: url,
        withCredentials: true,
      });

      if (response.data.result === "success") {
        setLoading(false);
        setConnection(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllConnections();
    setLoading(false);
  }, []);

  if (loading || !connection) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Your Connections</h1>

      {connection && connection.length === 0 ? (
        <div className="flex flex-col items-center text-white">
          <p className="text-lg mb-4">No connections found...!!</p>
          <button
            onClick={handleMakeConnection}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg"
          >
            Let's Make Connections
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 w-full max-w-3xl">
          {connection?.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
