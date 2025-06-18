import React, { useState, useEffect, useContext } from "react";
import supabase from "../../../utils/supabase";
import StudentHeader from "./StudentHeader";
import AvailableQuizzes from "./AvailableQuizzes";
import StudentFooter from "./StudentFooter";
import PerformanceReportComp from "./PerformanceReportComp";

import { LoginContext } from "../../context/LoginContext";

const StudentDashboard = () => {
  const { loggedIn, setLoggedIn,userData } = useContext(LoginContext);

  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    const getAllData = async () => {
      const { data: quizzes, error: quizError } = await supabase
        .from("quizzes")
        .select("*");
      const { data: questions, error: questionError } = await supabase
        .from("questions")
        .select("*");
      const { data: options, error: optionError } = await supabase
        .from("options")
        .select("*");
      if (quizError || questionError || optionError) {
        console.error(
          "Error fetching data:",
          quizError || questionError || optionError
        );
        return;
      }

      setQuizzes(quizzes);
      setQuestions(questions);
      setOptions(options);

      const formattedQuizData = quizzes.map((quiz) => {
        const relatedQuestions = questions
          .filter((q) => q.quiz_id === quiz.quiz_id)
          .map((q) => {
            const qOptions = options.filter(
              (opt) => opt.question_id === q.question_id
            );
            return {
              id: q.question_id,
              text: q.question_text,
              type: q.question_type || "objective",
              marks: 1,
              options: qOptions.map((opt) => opt.option_text),
              correctOption: qOptions.findIndex(
                (opt) => opt.is_correct === true
              ),
            };
          });

        return {
          quiz_id: quiz.quiz_id,
          title: quiz.title,
          description: quiz.description,
          date: quiz.date,
          duration: quiz.time_limit,
          teacher_id: quiz.teacher_id,
          questions: relatedQuestions,
        };
      });
      setQuizData(formattedQuizData);
    };
    getAllData();
  }, [loggedIn]);

  const createQuizzes = (list) => {
    const fullQuizData = quizData.find((q) => q.quiz_id === list.quiz_id);

    return (
      <AvailableQuizzes
        key={list.quiz_id}
        quizTitle={list.title}
        quizDuration={list.time_limit}
        quizDate={list.date}
        quizData={fullQuizData}
      />
    );
  };
if (!userData) return <div className="text-center mt-10">Loading...</div>;
  return (
    <>
      {loggedIn && (
        <div className="bg-gray-200 min-h-screen w-full">
          <StudentHeader />
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-black">
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
              Available Quizzes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {quizzes.map(createQuizzes)}
            </div>
          </div>
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-10 text-black">
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
              Performance Reports
            </h1>
            <div className="overflow-x-auto">
              <div className="font-semibold text-sm sm:text-base md:text-lg grid grid-cols-[3fr_2fr_2fr] sm:grid-cols-[5fr_3fr_3fr] bg-purple-600 text-white rounded-t-lg">
                <h1 className="p-2 sm:p-3 md:p-4">Quiz</h1>
                <p className="p-2 sm:p-3 md:p-4">Score</p>
                <p className="p-2 sm:p-3 md:p-4">Status</p>
              </div>
              <PerformanceReportComp
                quizTitle="Maths Quiz"
                quizScore="3/10"
                quizResult="Failed"
              />
              <PerformanceReportComp
                quizTitle="Maths Quiz"
                quizScore="10/10"
                quizResult="Passed"
              />
            </div>
          </div>
          <StudentFooter />
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
