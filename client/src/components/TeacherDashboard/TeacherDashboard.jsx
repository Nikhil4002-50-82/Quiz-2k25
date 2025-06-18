import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../utils/supabase";

import TeacherHeader from "./TeacherHeader";
import TeacherFooter from "./TeacherFooter";
import ManageQuizzes from "./ManageQuizzes";
import StudentSubmissions from "./StudentSubmissions";

import { LoginContext } from "../../context/LoginContext";

const TeacherDashboard = () => {
  const { loggedIn, setLoggedIn, userData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizMetaData = async () => {
      let { data: quizzes, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("teacher_id", userData.id);

      setQuizzes(quizzes);
    };
    getQuizMetaData();
  }, []);

  const createManageQuizCards = (list) => {
    return (
      <ManageQuizzes
        key={list.quiz_id}
        quizTitle={list.title}
        quizDuration={list.time_limit}
        quizDate={list.date}
        id={list.quiz_id}
      />
    );
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <TeacherHeader />
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-black">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
          <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-0">
            Manage Quizzes
          </h1>
          <button
            className="text-white font-semibold bg-blue-600 py-2 px-4 sm:px-6 rounded-lg text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              navigate("/newQuiz");
            }}
          >
            + Create New Quiz
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {quizzes && quizzes.map(createManageQuizCards)}
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-10 text-black">
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
          Student Submissions
        </h1>
        <div className="overflow-x-auto">
          <div className="font-semibold text-sm sm:text-base md:text-lg grid grid-cols-[3fr_3fr_2fr_2fr] sm:grid-cols-[5fr_5fr_3fr_3fr] bg-blue-600 text-white rounded-t-lg">
            <h1 className="p-2 sm:p-3 md:p-4">Student</h1>
            <h1 className="p-2 sm:p-3 md:p-4">Quiz</h1>
            <p className="p-2 sm:p-3 md:p-4">Score</p>
            <p className="p-2 sm:p-3 md:p-4">Action</p>
          </div>
          <StudentSubmissions
            student="Nikhil"
            quizTitle="Maths Quiz"
            quizScore="9/10"
            quizAction="Graded"
          />
          <StudentSubmissions
            student="Varshini"
            quizTitle="Maths Quiz"
            quizScore="9/10"
            quizAction="Grade"
          />
        </div>
      </div>
      <TeacherFooter />
    </div>
  );
};

export default TeacherDashboard;
