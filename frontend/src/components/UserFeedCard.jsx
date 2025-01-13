import React from "react";

const UserFeedCard = ({ user }) => {
  return (
    <div className="max-w-sm w-full mx-auto bg-slate-800 my-3 border-gray-200 rounded-lg shadow-md p-5 flex flex-col items-center">
      <img
        src={user.photoUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
      />

      <h2 className="mt-4 text-xl font-semibold text-gray-100">
        {`${user.firstName} ${user.lastName}`}
      </h2>

      <p className="mt-2 text-gray-400 text-center">{user.about}</p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {user.skills.length > 0 ? (
          user.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm"></span>
        )}
      </div>

      <div className="flex gap-4 mt-5">
        <button
          onClick={() => console.log("Send Request clicked!")}
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
        >
          Send Request
        </button>
        <button
          onClick={() => console.log("Ignore clicked!")}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default UserFeedCard;
