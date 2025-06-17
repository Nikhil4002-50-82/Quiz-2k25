import React from "react";

const StudentHeader = () => {
  return (
    <div className="h-16 sm:h-20 md:h-24 w-full bg-purple-600 flex items-center px-6 py-10 md:py-14 sm:px-6 md:px-8">
      <div className="flex justify-between w-full">
        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-4">
          QuizMaster-2K25 | <span className="text-sm sm:text-lg md:text-xl">Student Panel</span>
        </h1>
        <button className="text-purple-600 w-24 h-8 sm:h-9 sm:w-28 md:w-32 bg-white hover:bg-red-600 hover:text-white flex items-center justify-center font-bold rounded-lg text-sm sm:text-base">
          Log out
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;