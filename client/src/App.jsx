import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import NewQuiz from "./components/TeacherDashboard/NewQuiz";
import AttemptQuiz from "./components/StudentDashboard/AttemptQuiz";

const App = () => {
  return (
    <div className="font-edu">
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/newQuiz" element={<NewQuiz />} />
          <Route path="/attemptQuiz" element={<AttemptQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
