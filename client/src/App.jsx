import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";

const App = () => {
  return (
    <div className="font-edu">
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
