import React, { useState } from "react";

function StudentList({ students, updateStudent, deleteStudent }) {
  const [editStudent, setEditStudent] = useState(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value });
  };

  const saveEdit = () => {
    updateStudent(editStudent);
    setEditStudent(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      {students.length === 0 && <p>No students found.</p>}
      {students.map((student) => (
        <div
          key={student.id}
          className="border-b py-4 flex justify-between items-center"
        >
          {editStudent?.id === student.id ? (
            <>
              <input
                type="text"
                name="name"
                value={editStudent.name}
                onChange={handleEditChange}
                className="border p-2 rounded w-1/4"
              />
              <input
                type="text"
                name="subject"
                value={editStudent.subject}
                onChange={handleEditChange}
                className="border p-2 rounded w-1/4"
              />
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div>
                <p className="font-bold">{student.name}</p>
                <p>Subject: {student.subject}</p>
                <p>Contact: {student.contact}</p>
                <p>Fees Paid: {student.feesPaid ? "Yes" : "No"}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditStudent(student)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudentList;