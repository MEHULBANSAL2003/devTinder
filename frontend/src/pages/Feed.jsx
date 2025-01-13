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

      console.log(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFeedData();
    setLoading(false);
  }, []);

  if (loading || !userData) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex overflow-x-scroll snap-x snap-mandatory w-full max-w-3xl space-x-4 p-4">
        {userData &&
          userData.map((user) => (
            <div key={user._id} className="snap-center shrink-0 w-full">
              <UserFeedCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
