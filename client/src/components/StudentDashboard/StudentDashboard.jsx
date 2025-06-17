import React, { useState, useEffect } from "react";
import supabase from "../../../utils/supabase";
import StudentHeader from "./StudentHeader";
import AvailableQuizzes from "./AvailableQuizzes";
import StudentFooter from "./StudentFooter";
import PerformanceReportComp from "./PerformanceReportComp";

const StudentDashboard = () => {
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
  }, []);

  const createQuizzes = (list) => {
    return (
      <AvailableQuizzes
        key={list.quiz_id}
        quizTitle={list.title}
        quizDuration={list.time_limit}
        quizDate={list.date}
        quizData={quizData}
      />
    );
  };
  // const sampleQuizData = {
  //   title: "Midterm Quiz",
  //   description: "A quiz covering basic JavaScript and React concepts.",
  //   date: "2025-06-20",
  //   duration: 20,
  //   questions: [
  //     {
  //       id: 1,
  //       text: "What is the purpose of useState in React?",
  //       type: "objective",
  //       marks: "2",
  //       options: [
  //         "To manage component state",
  //         "To fetch data from an API",
  //         "To navigate between routes",
  //         "To style components",
  //       ],
  //       correctOption: 0,
  //     },
  //     {
  //       id: 2,
  //       text: "Explain the difference between let and const in JavaScript.",
  //       type: "subjective",
  //       marks: "5",
  //       options: [], // No options for subjective questions
  //       correctOption: null,
  //     },
  //     {
  //       id: 3,
  //       text: "Which method is used to update the state in a React functional component?",
  //       type: "objective",
  //       marks: "3",
  //       options: [
  //         "setState",
  //         "useEffect",
  //         "useState setter function",
  //         "render",
  //       ],
  //       correctOption: 2,
  //     },
  //   ],
  // };
  return (
    <div className="bg-gray-200 h-auto w-full">
      <StudentHeader />
      <div className="p-10 text-black">
        <h1 className="font-semibold text-2xl mb-6">Available Quizzes</h1>
        <div className="grid grid-cols-4 gap-10">
          {quizzes.map(createQuizzes)}
        </div>
      </div>
      <div className="px-10 text-black">
        <h1 className="font-semibold text-2xl mb-6">Performance Reports</h1>
        <div className="">
          <div className="font-semibold text-lg grid grid-cols-[5fr_3fr_3fr] bg-purple-600 text-white rounded-t-lg">
            <h1 className="p-4 ">Quiz</h1>
            <p className="p-4 ">Score</p>
            <p className="p-4 ">Status</p>
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
  );
};

export default StudentDashboard;
