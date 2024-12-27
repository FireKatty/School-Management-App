import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Card from "../Shared/Card";
import { fetchTeacherDetails } from "../../utils/api";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);

//   useEffect(() => {
//     fetchTeacherDetails()
//       .then(data => setTeacher(data))
//       .catch(err => console.error(err));
//   }, []);

  return (
    <div>
      <Navbar userType="Teacher" />
      <div className="p-6">
        {teacher ? (
          <>
            <Card title="Profile">
              <p>Name: {teacher.name}</p>
              <p>Contact: {teacher.contact}</p>
              <p>Salary: {teacher.salary}</p>
            </Card>
            <Card title="Assigned Classes">
              {teacher.assignedClasses.map((classroom) => (
                <div key={classroom._id} className="mb-4">
                  <p>Class: {classroom.className}</p>
                  <p>Year: {classroom.year}</p>
                </div>
              ))}
            </Card>
            <Card title="Students">
              {teacher.assignedClasses.map((classroom) => (
                <div key={classroom._id} className="mb-4">
                  <h3>Class: {classroom.className}</h3>
                  <ul>
                    {classroom.students.map((student) => (
                      <li key={student._id}>{student.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
