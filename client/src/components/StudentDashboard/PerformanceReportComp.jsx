import React from "react";

const PerformanceReportComp = ({ quizTitle, quizScore, quizResult }) => {
  return (
    <div className=" text-md grid grid-cols-[5fr_3fr_3fr] bg-white">
      <h1 className="p-4 ">{quizTitle}</h1>
      <p className="p-4 text-sm">{quizScore}</p>
      <p
        className={`p-4 font-semibold ${
          quizResult == "Passed" ? "text-green-600" : "text-red-600"
        }`}
      >
        {quizResult}
      </p>
    </div>
  );
};

export default PerformanceReportComp;
