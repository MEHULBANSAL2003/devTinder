import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import RequestCard from "../components/RequestCard";

const Requests = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !userData) return <Loader />;
  return (
    <div className="p-4 space-y-4">
      {userData.map((user) => (
        <RequestCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Requests;
