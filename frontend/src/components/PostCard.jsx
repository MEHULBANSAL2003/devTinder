import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoMdMore } from "react-icons/io";

const PostCard = ({ post, closeButton, deleteOption }) => {
  const userData = useSelector((store) => store.user);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { postedBy, imageUrl, createdAt, likedBy } = post;
  const [likeCount, setLikeCount] = useState(likedBy.length);
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${postedBy._id}`);
  };

  const handleLike = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/post/${
        isLiked ? "dislike" : "like"
      }/${post._id}`;
      const response = await axios({
        method: "post",
        url: url,
        data: { userId: userData._id },
        withCredentials: true,
      });

      if (response.data.result === "success") {
        setIsLiked(!isLiked);
        setLikeCount((prev) => prev + (isLiked ? -1 : 1));
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  const handleMoreOption = () => {
    setShowDropDown((prev) => !prev);
  };

  const handleDeleteOption = () => {
    setShowDeleteModal(true);
  };
 
  const handleCancelDelete=()=>{
    setShowDeleteModal(false);
    setShowDropDown(false);
  }

  const handleDelete=()=>{
    
  }

  return (
    <div className="relative my-8 bg-gray-900 text-white max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
      {deleteOption && (
        <button
          onClick={handleMoreOption}
          className="absolute top-4 right-10  text-white rounded-full p-2 hover:text-slate-400 focus:outline-none"
        >
          <IoMdMore size={25} />
        </button>
      )}

      {showDropDown && (
        <div className="absolute top-12 right-10 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm">
          <button
            onClick={handleDeleteOption}
            className="block px-4 py-2 text-left text-red-600 hover:bg-gray-700 w-full"
          >
            Delete Post
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {closeButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4  text-white rounded-full p-2 hover:text-slate-400 focus:outline-none"
        >
          ✕
        </button>
      )}

      <div className="flex items-center p-3 border-b border-gray-700">
        <img
          onClick={handleViewProfile}
          src={postedBy?.photoUrl}
          alt={`${postedBy.firstName} ${postedBy.lastName}`}
          className="w-14 h-14 rounded-full border border-gray-700 hover:cursor-pointer"
        />
        <div className="ml-6">
          <h4
            className="font-semibold text-xl hover:cursor-pointer hover:text-slate-300"
            onClick={handleViewProfile}
          >
            {postedBy.firstName} {postedBy.lastName}
          </h4>
          <p className="text-sm text-slate-200">@{postedBy.userName}</p>
          <p className="text-sm text-slate-200">{formattedDate}</p>
        </div>
      </div>

      <div className="relative">
        <img
          src={imageUrl}
          alt="Post"
          className="w-full h-[40rem] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 transition duration-300"></div>
      </div>

      <div className="p-6">
        <div className="items-center justify-between text-white">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              {!isLiked ? (
                <CiHeart
                  size={40}
                  onClick={handleLike}
                  className="hover:cursor-pointer"
                />
              ) : (
                <FaHeart
                  size={40}
                  onClick={handleLike}
                  className="hover:cursor-pointer"
                />
              )}
              {likeCount > 0 && (
                <span className="text-lg text-white">{likeCount}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <FaRegComment size={30} />
              {post.replies.length > 0 && (
                <span className="text-sm text-gray-400">
                  {post.replies.length}
                </span>
              )}
            </div>
          </div>
          {post.content && (
            <div className="flex py-2">
              <h1 className="font-bold">{postedBy.userName}</h1>
              <h1 className="mx-3 font-normal">{post.content}</h1>
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  );
};

export default PostCard;
