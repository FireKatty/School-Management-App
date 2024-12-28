
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import LandingPage from "./components/Dashboard/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/login" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;

