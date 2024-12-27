import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Card from "../Shared/Card";
// import { fetchAllDetails } from "../../utils/api";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchAllDetails()
//       .then(response => setData(response))
//       .catch(err => console.error(err));
//   }, []);

  return (
    <div>
      <Navbar userType="Admin" />
      <div className="p-6">
        {data ? (
          <>
            <Card title="Students">
              <ul>
                {data.students.map((student) => (
                  <li key={student._id}>{student.name}</li>
                ))}
              </ul>
            </Card>
            <Card title="Teachers">
              <ul>
                {data.teachers.map((teacher) => (
                  <li key={teacher._id}>{teacher.name}</li>
                ))}
              </ul>
            </Card>
            <Card title="Classes">
              <ul>
                {data.classes.map((classroom) => (
                  <li key={classroom._id}>{classroom.className}</li>
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

export default AdminDashboard;
