import React from "react";

const ManageQuizzes = ({ quizTitle, quizDuration, quizDate }) => {
  return (
    <div className="px-6 py-4 h-auto bg-white rounded-lg flex flex-col justify-cent mb-2 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)]">
      <h1 className="text-lg font-semibold mb-2">{quizTitle}</h1>
      <div className="text-xs text-gray-600 flex items-center mb-4">
        <p className="mr-[1em]">Time: {quizDuration} min</p>
        <p>|</p>
        <p className="ml-[1em]">Date: {quizDate}</p>
      </div>
      <div className="flex items-center">
        <button className="text-white w-[4em] h-auto px-1 py-[0.4em] bg-blue-600 text-white flex items-center justify-center font-semibold rounded-lg mr-2">
          Edit
        </button>
        <button className="text-white w-[6em] h-auto px-1 py-[0.4em] bg-red-600 text-white flex items-center justify-center font-semibold rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageQuizzes;
