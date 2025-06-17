import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../utils/supabase";

import TeacherHeader from "./TeacherHeader";
import TeacherFooter from "./TeacherFooter";
import ManageQuizzes from "./ManageQuizzes";
import StudentSubmissions from "./StudentSubmissions";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizMetaData = async () => {
      let { data: quizzes, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("teacher_id", 1);

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
      />
    );
  };
  return (
    <div className="bg-gray-200">
      <TeacherHeader />
      <div className="p-10 text-black h-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl mb-6">Manage Quizzes</h1>
          <button
            className="text-white font-semibold bg-blue-600 p-2 px-3 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              navigate("/newQuiz");
            }}
          >
            + Create New Quiz
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {quizzes && quizzes.map(createManageQuizCards)}
        </div>
      </div>
      <div className="px-10 text-black">
        <h1 className="font-semibold text-2xl mb-6">Student Submissions</h1>
        <div className="">
          <div className="font-semibold text-lg grid grid-cols-[5fr_5fr_3fr_3fr] bg-blue-600 text-white rounded-t-lg">
            <h1 className="p-4 ">Student</h1>
            <h1 className="p-4 ">Quiz</h1>
            <p className="p-4 ">Score</p>
            <p className="p-4 ">Action</p>
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
