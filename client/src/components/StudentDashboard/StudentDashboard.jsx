import React from "react";
import StudentHeader from "./StudentHeader";
import AvailableQuizzes from "./AvailableQuizzes";
import StudentFooter from "./StudentFooter";
import PerformanceReportComp from "./PerformanceReportComp";

const StudentDashboard = () => {
  return (
    <div className="bg-gray-100 h-auto w-full">
      <StudentHeader />
      <div className="p-10 text-black">
        <h1 className="font-semibold text-2xl mb-6">Available Quizzes</h1>
        <div className="grid grid-cols-4 gap-10">
          <AvailableQuizzes
            quizTitle="Physics MCQs"
            quizDuration="20"
            quizDate="2025-06-22"
          />
          <AvailableQuizzes
            quizTitle="Maths Quiz"
            quizDuration="30"
            quizDate="2025-06-20"
          />
        </div>
      </div>
      <div className="px-10 text-black">
        <h1 className="font-semibold text-2xl mb-6">Performance Reports</h1>
        <div className="">
            <div className="font-semibold text-lg grid grid-cols-[5fr_3fr_3fr] bg-blue-300 rounded-t-lg">
                <h1 className="p-4 ">Quiz</h1>
                <p className="p-4 ">Score</p>
                <p className="p-4 ">Status</p>
            </div>
            <PerformanceReportComp quizTitle="Maths Quiz" quizScore="3/10" quizResult="Failed" />
            <PerformanceReportComp quizTitle="Maths Quiz" quizScore="10/10" quizResult="Passed" />
        </div>
      </div>
      <StudentFooter />
    </div>
  );
};

export default StudentDashboard;
