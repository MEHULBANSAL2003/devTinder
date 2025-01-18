import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const { postedBy, imageUrl, createdAt } = post;
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${postedBy._id}`);
  };

  return (
    <div className="my-8 bg-gray-900 text-white max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
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
            <div className="flex items-center space-x-2">
              <CiHeart size={40} />
              {post.likedBy.length > 0 && (
                <span className="text-sm text-gray-400">
                  {post.likedBy.length}
                </span>
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

          <div className="flex py-2">
            {post.content && (
              <div className="flex">
                <h1 className="font-bold">{postedBy.userName}</h1>
                <h1 className="mx-3 font-normal">{post.content}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
