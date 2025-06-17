import React, { useState } from "react";
import supabase from "../../../utils/supabase";

const CreateQuizForm = () => {
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(1);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questionId,
        text: "",
        type: "objective",
        marks: "",
        options: ["", "", "", ""],
        correctOption: null,
      },
    ]);
    setQuestionId(questionId + 1);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleChange = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (id, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleCorrectOptionChange = (id, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctOption: optionIndex } : q
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quiz Created!");
    console.log("Quiz submitted:", questions);
  };

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[80%] max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-blue-600 flex items-center justify-center">
          Create New Quiz
        </h2>

        <label className="block font-medium text-sm sm:text-base mt-4">
          Quiz Title
        </label>
        <input
          type="text"
          name="title"
          className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
          placeholder="e.g. Midterm Quiz"
          required
        />

        <label className="block font-medium text-sm sm:text-base mt-4">
          Description
        </label>
        <textarea
          name="description"
          className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
          placeholder="Brief description..."
          rows="3"
          required
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="w-full">
            <label className="block font-medium text-sm sm:text-base">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
              required
            />
          </div>
          <div className="w-full">
            <label className="block font-medium text-sm sm:text-base">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="duration"
              className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
              placeholder="e.g. 30"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Questions
          </h3>
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-gray-50 p-4 rounded mb-3 border">
              <label className="block font-medium text-sm sm:text-base">
                Question {idx + 1}
              </label>
              <input
                type="text"
                className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
                placeholder="Enter the question"
                value={q.text}
                onChange={(e) => handleChange(q.id, "text", e.target.value)}
                required
              />

              <div className="flex flex-col sm:flex-row gap-4 mt-3">
                <div className="w-full">
                  <label className="block font-medium text-sm sm:text-base">
                    Type
                  </label>
                  <select
                    className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
                    value={q.type}
                    onChange={(e) => handleChange(q.id, "type", e.target.value)}
                  >
                    <option value="objective">Objective</option>
                    <option value="subjective">Subjective</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block font-medium text-sm sm:text-base">
                    Marks
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 sm:p-3 mt-1 border rounded text-sm sm:text-base"
                    placeholder="e.g. 2"
                    value={q.marks}
                    onChange={(e) =>
                      handleChange(q.id, "marks", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {q.type === "objective" && (
                <div className="mt-3">
                  <label className="block font-medium text-sm sm:text-base">
                    Options
                  </label>
                  {q.options.map((option, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name={`correct-option-${q.id}`}
                        checked={q.correctOption === optIdx}
                        onChange={() => handleCorrectOptionChange(q.id, optIdx)}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
                        placeholder={`Option ${optIdx + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(q.id, optIdx, e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="mt-3 bg-red-600 font-semibold text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
                onClick={() => removeQuestion(q.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 bg-blue-600 font-semibold text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 text-base sm:text-xl w-full bg-blue-600 font-semibold text-white py-2 sm:py-3 rounded-xl"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizForm;