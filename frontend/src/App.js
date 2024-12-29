
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import StudentDashboard from "./components/Dashboard/StudentDashboard";
// import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
// import AdminDashboard from "./components/Dashboard/AdminDashboard";
// import LandingPage from "./components/Dashboard/LandingPage";
// import ProtectedRoute from "./components/ProtectedRoute"

// const App = () => {
//   const data = JSON.parse(localStorage.getItem("user"))
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<LandingPage />} />
//         {!data ? (
//           <>
//           <Route path="/" element={<LandingPage />} />
//           </>
//         ):(
//         <Route element={<ProtectedRoute/>}>
//           {/* <Route path="/" element={<Navigate to="/" />} /> */}
//           {data.result.role ==="admin" ?(
//             <>
//             <Route path="/" element={<Navigate to="/admin" />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/student" element={<Navigate to="/admin" />} />
//             <Route path="/teacher" element={<Navigate to="/admin" />} />
//             </>
//           ): data.result.role === "teacher" ? (
//             <>
//             <Route path="/" element={<Navigate to="/teacher" />} />
//             <Route path="/teacher" element={<TeacherDashboard />} />
//             <Route path="/admin" element={<Navigate to="/teacher" />} />
//             <Route path="/student" element={<Navigate to="/teacher" />} />
//             </>
//           ) : (
//             <>
//             <Route path="/" element={<Navigate to="/student" />} />
//             <Route path="/student" element={<StudentDashboard />} />
//             <Route path="/teacher" element={<Navigate to="/student" />} />
//             <Route path="/admin" element={<Navigate to="/student" />} />
            
//             </>
//           )
//           }
//         </Route>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import LandingPage from "./components/Dashboard/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}
        {user ? (
          <Route element={<ProtectedRoute />}>
            {user.result.role === "admin" ? (
              <>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student" element={<Navigate to="/admin" replace />} />
                <Route path="/teacher" element={<Navigate to="/admin" replace />} />
              </>
            ) : user.result.role === "teacher" ? (
              <>
                <Route path="/" element={<Navigate to="/teacher" replace />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/admin" element={<Navigate to="/teacher" replace />} />
                <Route path="/student" element={<Navigate to="/teacher" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/student" replace />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/teacher" element={<Navigate to="/student" replace />} />
                <Route path="/admin" element={<Navigate to="/student" replace />} />
              </>
            )}
          </Route>
        ) : (
          // If no user is logged in, redirect to the landing page
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
