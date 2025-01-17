import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import PostCard from "../components/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/posts`;
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: url,
        withCredentials: true,
      });

      if (response?.data?.result === "success") {
        setPosts(response?.data?.data);
      }
      console.log(response?.data?.data);
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="text-center text-white text-xl">
            No posts available!
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-lg mt-8">
            Sorry! Unable to fetch posts right now. Please try again later.
          </div>
        )}
      </div>
      <div className="flex justify-center mt-12 py-4  border-t border-gray-800 text-slate-200 text-md">
        <span className="font-medium ">
          You have reached the end of the posts..!!
        </span>
      </div>
    </div>
  );
};

export default Posts;
