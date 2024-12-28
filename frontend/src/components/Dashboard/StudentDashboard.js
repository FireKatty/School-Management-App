import React, { useState } from "react";
import ProfileModal from "../ProfileModal";
import image from "../../images/19.jpg";

function App() {
  const [profile, setProfile] = useState({
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

  const [assignedClasses, setAssignedClasses] = useState([
    { className: "Math 101", subject: "Mathematics" },
    { className: "Science 202", subject: "Science" },
  ]);

  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
    setIsProfileCreated(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    alert("You have logged out successfully!");
    setProfile({
      name: "",
      subject: "",
      gender: "",
      dob: "",
      contact: "",
      feesPaid: false,
    });
    setIsProfileCreated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 bg-opacity-50 shadow-lg p-6 rounded-lg mb-8 flex justify-between items-center space-x-4">
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-semibold text-white">Student Dashboard</h1>
        </div>
        {profile.name && (
          <div className="flex items-center space-x-4">
            <span className="text-xl text-white">Welcome, {profile.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
        {!profile.name && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
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
              className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600 transition"
            >
              Create Personal Details
            </button>
          )}
        </div>

        {/* Assign Teacher */}
        <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Teacher</h2>
          <div className="text-gray-600">
            <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
              <strong>Name:</strong>
              <span>{profile.name || "Not Assigned"}</span>
            </div>
            <div className="flex space-x-4 border-b pb-3 mb-3 px-4">
              <strong>Subject:</strong>
              <span>{profile.subject || "Not Assigned"}</span>
            </div>
          </div>
        </div>

        {/* Assigned Classes */}
        <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Classes</h2>
          <ul className="space-y-4">
            {assignedClasses.map((classItem, index) => (
              <li key={index} className="flex space-x-10 text-gray-600 border-b pb-3 mb-3 px-4">
                <span>
                  <strong>Class:</strong> {classItem.className}
                </span>
                <span>
                  <strong>Subject:</strong> {classItem.subject}
                </span>
              </li>
            ))}
          </ul>
        </div>
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

