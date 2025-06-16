import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StudentHeader from "./StudentHeader";
import StudentFooter from "./StudentFooter";

const AttemptQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData = location.state?.quizData;

  const [timeLeft, setTimeLeft] = useState(
    quizData ? quizData.duration * 60 : 0
  );
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!quizData) return;

    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizData, isSubmitted]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitted(true);
    alert("Quiz Submitted!");
    console.log("User answers:", answers);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-gray-200">
      <StudentHeader />
      <div className="mt-6">
        <div className="w-[80%] mx-auto bg-white shadow-xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-purple-600">
              {quizData.title}
            </h2>
            <div className="text-lg font-medium text-red-600">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>

          <p className="text-gray-600 mb-4 font-semibold">{quizData.description}</p>
          <p className="text-gray-600 mb-6 font-semibold">Date: {quizData.date}</p>

          {!isSubmitted && (
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Questions</h3>
                {quizData.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-gray-50 p-4 rounded mb-3 border"
                  >
                    <div className="flex justify-between">
                      <label className="block font-medium">
                        Question {idx + 1}: {q.text}
                      </label>
                      <span className="text-sm text-gray-600">
                        Marks: {q.marks}
                      </span>
                    </div>

                    {q.type === "objective" ? (
                      <div className="mt-3">
                        {q.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={optIdx}
                              checked={answers[q.id] === optIdx.toString()}
                              onChange={(e) =>
                                handleAnswerChange(q.id, e.target.value)
                              }
                              className="mr-2"
                              disabled={isSubmitted}
                              required
                            />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        className="w-full p-2 mt-3 border rounded"
                        placeholder="Enter your answer..."
                        rows="4"
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(q.id, e.target.value)
                        }
                        disabled={isSubmitted}
                        required
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="mt-6 text-xl w-full bg-purple-600 font-semibold text-white py-3 rounded-xl disabled:bg-gray-400"
                disabled={isSubmitted}
                onClick={() => {
                  navigate("/student");
                }}
              >
                Submit Quiz
              </button>
            </form>
          )}
        </div>
      </div>
      <StudentFooter />
    </div>
  );
};

export default AttemptQuiz;
