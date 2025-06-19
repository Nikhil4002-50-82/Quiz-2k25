import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import NewQuiz from "./components/TeacherDashboard/NewQuiz";
import AttemptQuiz from "./components/StudentDashboard/AttemptQuiz";
import AuthComponent from "./components/Home/AuthComponent";

import { LoginContext } from "./context/LoginContext";
import ReviewStudentAttempt from "./components/TeacherDashboard/ReviewStudentAttempt";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("userData"));
    if (isLoggedIn && user) {
      setLoggedIn(true);
      setUserData(user);
    }
  }, []);

  return (
    <div className="font-edu">
      <LoginContext.Provider
        value={{ loggedIn, setLoggedIn, userData, setUserData }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthComponent />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/newQuiz" element={<NewQuiz />} />
            <Route path="/attemptQuiz" element={<AttemptQuiz />} />
             <Route path="/teacher/review" element={<ReviewStudentAttempt />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
