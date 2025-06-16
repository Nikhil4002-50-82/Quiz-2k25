import React from "react";

const StudentHeader = () => {
  return (
    <div className="h-[7em] w-full bg-blue-600 flex items-center px-8">
      <div className="flex justify-between w-full">
         <h1 className="text-white font-bold text-3xl mr-[2em]">
          QuizMaster-2K25 | <span className='text-xl'>Student Panel</span>
        </h1>
        <button className="text-blue w-[8em] bg-white text-blue-600 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold rounded-lg">
          Log out
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;
