import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import LandingPage from "./components/Dashboard/LandingPage";
import PrivateRoute from "./components/ProtectedRoute";

const App = () => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Redirect based on role if user is logged in
  const redirectToRoleBasedDashboard = () => {
    if (user && user.result) {
      switch (user.result.role) {
        case "admin":
          return <Navigate to="/admin" />;
        case "teacher":
          return <Navigate to="/teacher" />;
        case "student":
          return <Navigate to="/student" />;
        default:
          return <Navigate to="/" />;
      }
    }
    return null;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect logged-in users to their respective dashboards */}
        <Route path="/" element={user ? redirectToRoleBasedDashboard() : <LandingPage />} />

        {/* Role-Based Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <PrivateRoute allowedRole="teacher">
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute allowedRole="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
