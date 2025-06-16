import React from "react";

const TeacherHeader = () => {
  return (
    <div className="h-[7em] w-full bg-[#7b39ed] flex items-center px-8">
      <div className="flex justify-between w-full">
        <h1 className="text-white font-bold text-3xl mr-[2em]">
          QuizMaster-2K25 | <span className="text-xl">Teacher Panel</span>
        </h1>
        <button className="text-[#7b39ed] w-[8em] bg-white hover:bg-red-600 hover:text-white flex items-center justify-center font-bold rounded-lg">
          Log out
        </button>
      </div>
    </div>
  );
};

export default TeacherHeader;
