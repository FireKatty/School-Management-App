import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../ProfileModal";
import image from "../../images/19.jpg";

function App() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id:"",
    name: "",
    subject: "",
    gender: "",
    dob: "",
    contact: "",
    feesPaid: false,
  });

  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" or "update"

  const [assignedClasses, setAssignedClasses] = useState([]);
  const [assignedTeachers, setAssignTeachers] = useState([]);
  // let studentData = "";

  useEffect(() => {
    fetchStudentsAndClasses();
  }, []);

  const fetchStudentsAndClasses = async () => {
    try {
      const response = await fetch("https://school-management-app-thu0.onrender.com/api/student/list"); // Replace with actual API endpoint
      const data = await response.json();
  
      if (response.ok) {
        const studentData = data.students[0];
  
        setProfile({
          id: studentData._id,
          name: studentData.name,
          subject: studentData.subject,
          gender: studentData.gender,
          dob: new Date(studentData.dob).toISOString().split("T")[0],
          contact: studentData.contact,
          feesPaid: studentData.feesPaid,
        });
  
        // Handle classes safely
        if (studentData.class) {
          setAssignedClasses([
            {
              className: studentData.class.className || "N/A",
              subject: studentData.class.subject || "N/A",
              year: studentData.class.year || "N/A",
            },
          ]);
        } else {
          setAssignedClasses([]);
        }
  
        // Handle teachers safely
        setAssignTeachers(studentData.assignedTeachers || []);
  
        setIsProfileCreated(true);
      } else {
        alert(data.message || "Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Error fetching data");
    }
  };
  

  const handleProfileSave = async (newProfile) => {
    try {
      // Create a clean copy of the profile to avoid circular references
      const cleanedProfile = {
        name: newProfile.name,
        subject: newProfile.subject,
        gender: newProfile.gender,
        dob: newProfile.dob,
        contact: newProfile.contact,
        feesPaid: newProfile.feesPaid,
      };
  
      const method = isProfileCreated ? "PUT" : "POST";
      const url = isProfileCreated
        ? `https://school-management-app-thu0.onrender.com/api/student/update/${profile.id}`
        : "https://school-management-app-thu0.onrender.com/api/student/create";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedProfile),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setProfile(newProfile);
        setIsProfileCreated(true);
        setIsModalOpen(false);
        fetchStudentsAndClasses();
      } else {
        alert(data.message || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile");
    }
  };
  

//   const handleDeleteProfile = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:9876/api/data/delete/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert(data.message || "Profile deleted successfully");
//       setProfile({
//         name: "",
//         subject: "",
//         gender: "",
//         dob: "",
//         contact: "",
//         feesPaid: false,
//       });
//       setIsProfileCreated(false);
//       fetchStudentsAndClasses(); // Refresh data after deletion
//     } else {
//       alert(data.message || "Failed to delete profile");
//     }
//   } catch (error) {
//     console.error("Error deleting profile:", error);
//     alert("Error deleting profile");
//   }
// };

  
  const handleLogout = () => {
    // alert("You have logged out successfully!");
    setIsProfileCreated(false);
    localStorage.clear()
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-300 to-teal-500 bg-transparent shadow-lg p-6 rounded-lg mb-8 flex justify-between items-center space-x-4">
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-semibold text-white">Student Dashboard</h1>
        </div>
        {profile.name && (
          <div className="flex items-center space-x-4">
            <span className="text-xl text-white">Welcome, {profile.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-400 transition border-2 border-blue-1000 bg-opacity-20"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 text-center bg-opacity-10 bg-transparent">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
          {isProfileCreated ? (
            <div className="text-gray-600">
              <div className="flex space-x-10 border-b pb-3 mb-3 px-4">
                <strong>Name:</strong>
                <span>{profile.name}</span>
              </div>
              <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
                <strong>Subject:</strong>
                <span>{profile.subject}</span>
              </div>
              <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
                <strong>Gender:</strong>
                <span>{profile.gender}</span>
              </div>
              <div className="flex space-x-12 border-b pb-3 mb-3 px-4">
                <strong>DOB:</strong>
                <span>{profile.dob}</span>
              </div>
              <div className="flex space-x-6 border-b pb-3 mb-3 px-4">
                <strong>Contact:</strong>
                <span>{profile.contact}</span>
              </div>
              <div className="flex space-x-3 border-b pb-3 mb-3 px-4">
                <strong>Fees Paid:</strong>
                <span>{profile.feesPaid ? "Yes" : "No"}</span>
              </div>
              <button
                onClick={() => {
                  setModalType("update");
                  setIsModalOpen(true);
                }}
                className="bg-green-500 text-white px-6 py-2 rounded w-full mt-4 hover:bg-green-600 transition"
              >
                Update Details
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setModalType("create");
                setIsModalOpen(true);
              }}
              className="bg-blue-500 text-gray px-6 py-2 rounded w-full transition border-2 border-blue-1000 bg-transparent"
            >
              Create Personal Details
            </button>
          )}
        </div>

        {/* Assign Teacher */}
        <div className="bg-white  shadow-lg p-6 rounded-lg border border-gray-300 text-center bg-opacity-10 bg-transparent">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Teacher</h2>
          <ul className="space-y-4">
            {assignedTeachers.map((TeacherItem, index) => (
              <li key={index} className="flex space-x-10 text-gray-1000 border-b pb-3 mb-3 px-4">
                <div className="flex space-x-7 text-black border-b pb-3 mb-3 px-4">
                  <strong>Name:</strong>
                  <span>{TeacherItem.name || "Not Assigned"}</span>
                </div>
                <div className="flex space-x-4 text-black border-b pb-3 mb-3 px-4">
                  <strong>Subject:</strong>
                  <span>{TeacherItem.subject || "Not Assigned"}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Assigned Classes */}
        <div className="bg-white bg-opacity-10 shadow-lg p-6 rounded-lg border border-gray-300 text-center bg-transparent">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Classes</h2>
          <ul className="space-y-4">
            {assignedClasses.map((classItem, index) => (
              <li key={index} className="flex space-x-10 text-gray-1000 border-b pb-3 mb-3 px-4">
                <span>
                  <strong>Class:</strong> {classItem.className}
                </span>
                <span>
                  <strong>Subject:</strong> {classItem.subject}
                </span>
                <span>
                  <strong>Year:</strong> {classItem.year}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Students List */}
        {/* <div className="bg-white bg-opacity-10 shadow-lg p-6 rounded-lg border border-gray-300 text-center bg-transparent">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Students List</h2>
          <ul className="space-y-4">
            {students.map((student, index) => (
              <li key={student._id} className="flex flex-col text-gray-1000 border-b pb-3 mb-3 px-4">
                <span>
                  <strong>Name:</strong> {student.name}
                </span>
                <span>
                  <strong>Subject:</strong> {student.subject}
                </span>
                <span>
                  <strong>Gender:</strong> {student.gender}
                </span>
                <span>
                  <strong>Contact:</strong> {student.contact}
                </span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Profile Modal */}
      {isModalOpen && (
        <ProfileModal
          type={modalType}
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
}

export default App;
