import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Card from "../Shared/Card";
import { fetchStudentDetails } from "../../utils/api";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

//   useEffect(() => {
//     fetchStudentDetails()
//       .then(data => setStudent(data))
//       .catch(err => console.error(err));
//   }, []);

  return (
    <div>
      <Navbar userType="Student" />
      <div className="p-6">
        {student ? (
          <>
            <Card title="Profile">
              <p>Name: {student.name}</p>
              <p>Contact: {student.contact}</p>
              <p>Fees Paid: {student.feesPaid ? "Yes" : "No"}</p>
            </Card>
            <Card title="Classroom">
              <p>Class: {student.class.className}</p>
              <p>Year: {student.class.year}</p>
            </Card>
            <Card title="Teachers">
              <ul>
                {student.class.teachers.map((teacher) => (
                  <li key={teacher._id}>{teacher.name}</li>
                ))}
              </ul>
            </Card>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
