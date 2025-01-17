import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }) => {
  const { postedBy, imageUrl, createdAt } = post;
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <div className="my-8 bg-gray-900 text-white max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center p-3 border-b border-gray-700">
        <img
          src={postedBy?.photoUrl}
          alt={`${postedBy.firstName} ${postedBy.lastName}`}
          className="w-14 h-14 rounded-full border border-gray-700"
        />
        <div className="ml-6">
          <h4 className="font-semibold text-xl">
            {postedBy.firstName} {postedBy.lastName}
          </h4>
          <p className="text-sm text-slate-200">@{postedBy.userName}</p>
          <p className="text-sm text-slate-200">{formattedDate}</p>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt="Post"
          className="w-full h-[40rem] object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 transition duration-300"></div>
      </div>

      <div className="p-6">
        <div className=" items-center justify-between text-white">
          <div className="flex">
            <CiHeart size={40} />
            <div className="mx-3 my-1">
              <FaRegComment size={30} />
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
