import React, { useEffect, useState } from "react";
import UserFeedCard from "../components/UserFeedCard";
import axios from "axios";
import Loader from "../components/Loader";


const Feed = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserFeedData = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/feed`;
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
    fetchUserFeedData();
  }, []);

  const handleActionComplete = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user._id !== userId)
    );
  };

  if (loading|| !userData) return <Loader />;



  if (userData.length === 0) {
    return (
      <div className="text-2xl font-semibold mt-40 mx-[44%]">No more users</div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="flex overflow-x-scroll  snap-x snap-mandatory w-full max-w-3xl space-x-4 p-4">
        {userData.map((user) => (
          <div key={user._id} className="snap-center shrink-0 w-full">
            <UserFeedCard user={user} onActionComplete={handleActionComplete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
