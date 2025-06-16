import React from "react";

const StudentSubmissions = ({ student, quizTitle, quizScore, quizAction }) => {
  return (
    <div className=" text-md grid grid-cols-[5fr_5fr_3fr_3fr] bg-white">
      <h1 className="p-4 ">{student}</h1>
      <h1 className="p-4 ">{quizTitle}</h1>
      <p className="p-4 text-sm">{quizScore}</p>
      <p
        className={`p-4 font-semibold ${
          quizAction == "Graded" ? "text-green-600" : "bg-green-600 ml-[0.5em] mt-[0.6em] rounded-lg w-[5em] h-[1em] flex items-center justify-center text-white"
        }`}
      >
        {quizAction}
      </p>
    </div>
  );
};

export default StudentSubmissions;
