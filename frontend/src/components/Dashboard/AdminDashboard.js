// import React, { useState } from "react";
// import ProfileModal from "../ProfileModal";
// import image from "../../images/19.jpg";

// function App() {
//   const [profile, setProfile] = useState({
//     name: "",
//     subject: "",
//     gender: "",
//     dob: "",
//     contact: "",
//     feesPaid: false,
//   });

//   const [isProfileCreated, setIsProfileCreated] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState(""); // "create" or "update"

//   const [assignedClasses, setAssignedClasses] = useState([
//     { className: "Math 101", subject: "Mathematics" },
//     { className: "Science 202", subject: "Science" },
//   ]);

//   const handleProfileSave = (newProfile) => {
//     setProfile(newProfile);
//     setIsProfileCreated(true);
//     setIsModalOpen(false);
//   };

//   const handleLogout = () => {
//     alert("You have logged out successfully!");
//     setProfile({
//       name: "",
//       subject: "",
//       gender: "",
//       dob: "",
//       contact: "",
//       feesPaid: false,
//     });
//     setIsProfileCreated(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-teal-500 bg-opacity-50 shadow-lg p-6 rounded-lg mb-8 flex justify-between items-center space-x-4">
//         <div className="flex-grow text-center">
//           <h1 className="text-3xl font-semibold text-white">Student Dashboard</h1>
//         </div>
//         {profile.name && (
//           <div className="flex items-center space-x-4">
//             <span className="text-xl text-white">Welcome, {profile.name}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//         {!profile.name && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Personal Details */}
//         <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
//           {isProfileCreated ? (
//             <div className="text-gray-600">
//               <div className="flex space-x-10 border-b pb-3 mb-3 px-4">
//                 <strong>Name:</strong>
//                 <span>{profile.name}</span>
//               </div>
//               <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
//                 <strong>Subject:</strong>
//                 <span>{profile.subject}</span>
//               </div>
//               <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
//                 <strong>Gender:</strong>
//                 <span>{profile.gender}</span>
//               </div>
//               <div className="flex space-x-12 border-b pb-3 mb-3 px-4">
//                 <strong>DOB:</strong>
//                 <span>{profile.dob}</span>
//               </div>
//               <div className="flex space-x-6 border-b pb-3 mb-3 px-4">
//                 <strong>Contact:</strong>
//                 <span>{profile.contact}</span>
//               </div>
//               <div className="flex space-x-3 border-b pb-3 mb-3 px-4">
//                 <strong>Fees Paid:</strong>
//                 <span>{profile.feesPaid ? "Yes" : "No"}</span>
//               </div>
//               <button
//                 onClick={() => {
//                   setModalType("update");
//                   setIsModalOpen(true);
//                 }}
//                 className="bg-green-500 text-white px-6 py-2 rounded w-full mt-4 hover:bg-green-600 transition"
//               >
//                 Update Details
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => {
//                 setModalType("create");
//                 setIsModalOpen(true);
//               }}
//               className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600 transition"
//             >
//               Create Personal Details
//             </button>
//           )}
//         </div>

//         {/* Assign Teacher */}
//         <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Teacher</h2>
//           <div className="text-gray-600">
//             <div className="flex space-x-7 border-b pb-3 mb-3 px-4">
//               <strong>Name:</strong>
//               <span>{profile.name || "Not Assigned"}</span>
//             </div>
//             <div className="flex space-x-4 border-b pb-3 mb-3 px-4">
//               <strong>Subject:</strong>
//               <span>{profile.subject || "Not Assigned"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Assigned Classes */}
//         <div className="bg-white bg-opacity-80 shadow-lg p-6 rounded-lg border border-gray-300 text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Classes</h2>
//           <ul className="space-y-4">
//             {assignedClasses.map((classItem, index) => (
//               <li key={index} className="flex space-x-10 text-gray-600 border-b pb-3 mb-3 px-4">
//                 <span>
//                   <strong>Class:</strong> {classItem.className}
//                 </span>
//                 <span>
//                   <strong>Subject:</strong> {classItem.subject}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Profile Modal */}
//       {isModalOpen && (
//         <ProfileModal
//           type={modalType}
//           profile={profile}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleProfileSave}
//         />
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";

// const AdminDashboard = () => {
//   const [admin, setAdmin] = useState("Abhishek");
//   const [isEditingAdmin, setIsEditingAdmin] = useState(false);
//   const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
//   const [formAdminDetails, setFormAdminDetails] = useState({
//     name: "",
//     email: "",
//     contact: "",
//   });

//   const [teachers, setTeachers] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);

//   const [isEditingClass, setIsEditingClass] = useState(false);
//   const [isClassModalOpen, setIsClassModalOpen] = useState(false);
//   const [formClassDetails, setFormClassDetails] = useState({
//     className: "",
//     subject: "",
//     year: "",
//   });

//   const [showTeachers, setShowTeachers] = useState(false);
//   const [showClasses, setShowClasses] = useState(false);
//   const [showStudents, setShowStudents] = useState(false);

//   const handleInputChange = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "admin") {
//       setFormAdminDetails((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     } else if (type === "class") {
//       setFormClassDetails((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleAddClass = () => {
//     setFormClassDetails({
//       className: "",
//       subject: "",
//       year: "",
//     });
//     setIsEditingClass(false);
//     setIsClassModalOpen(true);
//   };

//   const handleSaveClass = () => {
//     if (isEditingClass) {
//       setClasses((prev) =>
//         prev.map((cls) =>
//           cls.className === formClassDetails.className ? formClassDetails : cls
//         )
//       );
//     } else {
//       setClasses((prev) => [...prev, formClassDetails]);
//     }
//     setIsClassModalOpen(false);
//   };

//   const handleFetchTeachers = () => {
//     setTeachers(
//       Array.from({ length: 3 }, (_, i) => ({
//         id: i + 1,
//         // name: Teacher ${i + 1},
//       }))
//     );
//     setShowTeachers(true);
//   };

//   const handleFetchStudents = () => {
//     setStudents(
//       Array.from({ length: 5 }, (_, i) => ({
//         id: i + 1,
//         // name: Student ${i + 1},
//         class: "10th Grade",
//         subject: "Mathematics",
//       }))
//     );
//     setShowStudents(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <header className="bg-blue-600 text-white py-6 px-6 flex justify-between items-center shadow-lg rounded-t-lg">
//         <h1 className="text-2xl font-semibold flex-grow text-center">
//           Admin Dashboard
//         </h1>
//         {admin && <span className="mr-4">Welcome, {admin.name}</span>}
//         <button
//           onClick={() => alert("Logged out")}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </header>

//       <div className="mt-8 container mx-auto px-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
//         {admin ? (
//           <>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 border border-gray-300">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Teachers
//               </h3>
//               <button
//                 onClick={
//                   showTeachers
//                     ? () => setShowTeachers(false)
//                     : handleFetchTeachers
//                 }
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 {showTeachers ? "Hide Teachers" : "View Teachers"}
//               </button>
//               {showTeachers && (
//                 <div className="mt-4">
//                   <ul className="divide-y divide-gray-200">
//                     {teachers.map((teacher) => (
//                       <li key={teacher.id} className="py-2 px-4">
//                         {teacher.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 border border-gray-300">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Classes
//               </h3>
//               <button
//                 onClick={() => setShowClasses(!showClasses)}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//               >
//                 {showClasses ? "Hide Classes" : "View Classes"}
//               </button>
//               {showClasses && (
//                 <div className="mt-4">
//                   <ul className="divide-y divide-gray-200">
//                     {classes.map((cls) => (
//                       <li
//                         key={cls.className}
//                         className="py-2 px-4 flex justify-between"
//                       >
//                         <span>
//                           {cls.className} - {cls.subject} ({cls.year})
//                         </span>
//                         <div className="flex space-x-2">
//                           <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
//                             Edit
//                           </button>
//                           <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
//                             Delete
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 border border-gray-300">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Students
//               </h3>
//               <button
//                 onClick={
//                   showStudents
//                     ? () => setShowStudents(false)
//                     : handleFetchStudents
//                 }
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 {showStudents ? "Hide Students" : "View Students"}
//               </button>
//               {showStudents && (
//                 <div className="mt-4">
//                   <ul className="divide-y divide-gray-200">
//                     {students.map((student) => (
//                       <li key={student.id} className="py-2 px-4">
//                         {student.name} - {student.class} ({student.subject})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-xl font-semibold text-gray-700">
//             Please login to access the dashboard.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import backgroundImage from "../../images/rain-1599790.jpg"; 

const AdminDashboard = () => {
  const [admin, setAdmin] = useState({
    name: "Abhishek",
    email: "admin@example.com",
    contact: "1234567890",
  });
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [formAdminDetails, setFormAdminDetails] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  const [isEditingClass, setIsEditingClass] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [formClassDetails, setFormClassDetails] = useState({
    className: "",
    subject: "",
    year: "",
  });

  const [isTeachersVisible, setIsTeachersVisible] = useState(true);
  const [isClassesVisible, setIsClassesVisible] = useState(true);
  const [isStudentsVisible, setIsStudentsVisible] = useState(true);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "admin") {
      setFormAdminDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === "class") {
      setFormClassDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddAdmin = () => {
    setFormAdminDetails({
      name: "",
      email: "",
      contact: "",
    });
    setIsEditingAdmin(false);
    setIsAdminModalOpen(true);
  };

  const handleEditAdmin = () => {
    setFormAdminDetails(admin); // Pre-fill fields with admin's information
    setIsEditingAdmin(true);
    setIsAdminModalOpen(true);
  };

  const handleSaveAdmin = () => {
    setAdmin({
      ...formAdminDetails,
    });
    setIsAdminModalOpen(false);
  };

  const handleDeleteAdmin = () => {
    setAdmin(null);
    alert("Admin profile deleted!");
  };

  const handleAddClass = () => {
    setFormClassDetails({
      className: "",
      subject: "",
      year: "",
    });
    setIsEditingClass(false);
    setIsClassModalOpen(true);
  };

  const handleEditClass = (classData) => {
    setFormClassDetails(classData); // Pre-fill fields with class information
    setIsEditingClass(true);
    setIsClassModalOpen(true);
  };

  const handleSaveClass = () => {
    if (isEditingClass) {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.className === formClassDetails.className ? formClassDetails : cls
        )
      );
    } else {
      setClasses((prev) => [...prev, formClassDetails]);
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (className) => {
    setClasses((prev) => prev.filter((cls) => cls.className !== className));
    alert("Class deleted!");
  };

  const handleFetchTeachers = () => {
    const fetchedTeachers = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      // name: Teacher ${i + 1},
    }));
    setTeachers(fetchedTeachers);
  };

  const handleFetchStudents = () => {
    const fetchedStudents = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      // name: Student ${i + 1},
      class: "10th Grade",
      subject: "Mathematics",
    }));
    setStudents(fetchedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 bg-cover bg-center relative  bg-opacity-50" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header Section */}
      <header className="bg-gradient-to-r  text-whitetext-yellow-300 py-6 px-6 flex justify-between items-center shadow-lg rounded-t-lg bg-opacity-10 bg-transparent">
        <h1 className="text-3xl font-bold text-center flex-grow tracking-wide">
          Admin Dashboard
        </h1>
        {admin && <span className="mr-4 text-lg font-medium text-yellow-300">Welcome, {admin.name}</span>}
        <button
          onClick={() => alert("Logged out")}
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 "
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="mt-8 container mx-auto px-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {admin ? (
          <>
            {/* Admin Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-10 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Admin Information
              </h3>
              <p>
                <strong className="text-gray-600">Name:</strong>{" "}
                <span className="ml-5">{admin.name}</span>
              </p>
              <p>
                <strong className="text-gray-600">Email:</strong>{" "}
                <span className="ml-2">{admin.email}</span>
              </p>
              <p>
                <strong className="text-gray-600">Contact:</strong>{" "}
                <span className="ml-2">{admin.contact}</span>
              </p>

              {/* Profile action buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleEditAdmin}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleDeleteAdmin}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Profile
                </button>
              </div>
            </div>

            {/* View Teachers Section */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-10 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Teachers List
              </h3>
              <button
                onClick={() => setIsTeachersVisible(!isTeachersVisible)}
                // onClick={handleFetchTeachers}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4"
              >
                {isTeachersVisible ? "Hide Teachers" : "Show Teachers"}
              </button>
              {isTeachersVisible && (
                <div className="mt-4">
                  {teachers.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {teachers.map((teacher) => (
                        <li key={teacher.id} className="py-2 px-4">
                          {teacher.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No teachers available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Classes Section */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-10 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Classes</h3>
              <div className="flex justify-between items-center">
                {/* View Classes and Create Class buttons in the same line */}
                <button
                  onClick={() => setIsClassesVisible(!isClassesVisible)}
                  className="bg-gray-500  text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4"
                >
                  {isClassesVisible ? "Hide Classes" : "Show Classes"}
                </button>
                <button
                  onClick={handleAddClass}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
                >
                  Create Class
                </button>
              </div>
              

              {isClassesVisible && (
                <div className="mt-4">
                  {classes.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {classes.map((cls) => (
                        <li
                          key={cls.className}
                          className="py-2 px-4 flex justify-between items-center"
                        >
                          <span>
                            {cls.className} - {cls.subject} ({cls.year})
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClass(cls)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls.className)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No classes available.</p>
                  )}
                </div>
              )}
            </div>

            {/* View Students Section */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-10 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Students List
              </h3>
              <button
                onClick={() => setIsStudentsVisible(!isStudentsVisible)}
                // onClick={handleFetchStudents}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4"
              >
                {isStudentsVisible ? "Hide Students" : "Show Students"}
              </button>
              {isStudentsVisible && (
                <div className="mt-4">
                  {students.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <li key={student.id} className="py-2 px-4">
                          {student.name} - {student.class} ({student.subject})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No students available.</p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-xl font-semibold text-gray-700">
            Please login to access the dashboard.
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md bg-opacity-10 bg-transparent">
            <h2 className="text-xl font-semibold text-gray-1000 mb-4">
              {isEditingClass ? "Update Class" : "Create Class"}
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="className"
                  className="block text-gray-900 text-sm font-medium"
                >
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  name="className"
                  value={formClassDetails.className}
                  onChange={(e) => handleInputChange(e, "class")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-opacity-10 bg-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-900 text-sm font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formClassDetails.subject}
                  onChange={(e) => handleInputChange(e, "class")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-opacity-10 bg-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="year"
                  className="block text-gray-900 text-sm font-medium"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formClassDetails.year}
                  onChange={(e) => handleInputChange(e, "class")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-opacity-10 bg-transparent"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveClass}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;