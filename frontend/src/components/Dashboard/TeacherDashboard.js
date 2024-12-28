
// import React, { useState } from "react";
// import backgroundImage from "../../images/university-6699377.jpg"; 

// const TeacherProfile = () => {
//   const [teacher, setTeacher] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formDetails, setFormDetails] = useState({
//     name: "",
//     subject: "",
//     gender: "",
//     dob: "",
//     contact: "",
//     salary: "",
//   });
//   const [students, setStudents] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddTeacher = () => {
//     setFormDetails({
//       name: "",
//       subject: "",
//       gender: "",
//       dob: "",
//       contact: "",
//       salary: "",
//     });
//     setIsEditing(false);
//     setIsModalOpen(true);
//   };

//   const handleEditTeacher = () => {
//     setFormDetails(teacher); // Pre-fill fields with teacher's information
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleSave = () => {
//     setTeacher((prev) => ({
//       ...prev,
//       ...formDetails,
//       assignedClass: getAssignedClass(formDetails.subject),
//     }));
//     setIsModalOpen(false);
//   };

//   const handleDelete = () => {
//     setTeacher(null);
//     alert("Profile deleted!");
//   };

//   const handleFetchStudents = (subject) => {
//     // Simulated database fetch
//     const fetchedStudents = subject
//       ? Array.from({ length: 5 }, (_, i) => ({
//           id: i + 1,
//           // name: Student ${i + 1},
//         }))
//       : [];
//     setStudents(fetchedStudents);
//   };

//   const getAssignedClass = (subject) => {
//     const classMapping = {
//       Mathematics: "10th Grade",
//       Science: "9th Grade",
//       English: "11th Grade",
//     };
//     return classMapping[subject] || "Class will be assigned soon";
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 py-8 bg-cover bg-center relative  bg-opacity-50" style={{ backgroundImage: `url(${backgroundImage})` }}>
//     {/* <div className=" relative bg-gray-200 bg-opacity-50"> */}
//       {/* <img
//         src={backgroundImage}
//         alt="Campus"
//         className="object-cover w-full h-full opacity-50"
//       /> */}
      
//       {/* Header Section */}
//       <header className="bg-blue-600 text-white py-6 px-6 flex justify-between items-center shadow-lg rounded-t-lg bg-transparent">
//   <h1 className="text-2xl font-semibold flex-grow text-center text-shadow-lg">
//     Teacher Dashboard
//   </h1>
//   {teacher && <span className="mr-4 text-shadow-lg">Welcome, {teacher.name}</span>}
//   <button
//     onClick={() => alert("Logged out")}
//     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//   >
//     Logout
//   </button>
// </header>

//       {/* Main Content */}
//       <div className="mt-8 container mx-auto px-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
//         {teacher ? (
//           <>
//             {/* Teacher Information Section */}
//             <div className=" p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border bg-opacity-50 border-gray-300 bg-transparent">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Teacher Information
//               </h3>
//               <p>
//                 <strong className="text-gray-600">Name:</strong>{" "}
//                 <span className="ml-5">{teacher.name}</span>
//               </p>
//               <p>
//                 <strong className="text-gray-600">Subject:</strong>{" "}
//                 <span className="ml-2">{teacher.subject}</span>
//               </p>
//               <p>
//                 <strong className="text-gray-600">Gender:</strong>{" "}
//                 <span className="ml-2">{teacher.gender}</span>
//               </p>
//               <p>
//                 <strong className="text-gray-600">DOB:</strong>{" "}
//                 <span className="ml-7">{teacher.dob}</span>
//               </p>
//               <p>
//                 <strong className="text-gray-600">Contact:</strong>{" "}
//                 <span className="ml-1">{teacher.contact}</span>
//               </p>
//               <p>
//                 <strong className="text-gray-600">Salary:</strong>{" "}
//                 <span className="ml-4">${teacher.salary}</span>
//               </p>
  
//               {/* Profile action buttons */}
//               <div className="flex space-x-4 mt-4">
//                 <button
//                   onClick={handleEditTeacher}
//                   className=" border-2 border-blue-1000 text-gray-1000 px-4 py-2 rounded-lg   bg-transparent"
//                 >
//                   Update Profile
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className=" border-2 border-blue-1000 text-gray-1000 px-4 py-2 rounded-lg bg-transparent"
//                 >
//                   Delete Profile
//                 </button>
//               </div>
//             </div>
  
//             {/* Assigned Class Section */}
//             <div className=" p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-50 bg-transparent">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Assigned Class
//               </h3>
//               <p>
//                 <strong className="text-gray-600">Class:</strong>{" "}
//                 {teacher.assignedClass || "Class will be assigned soon"}
//               </p>
//             </div>
  
//             {/* Students Section */}
//             <div className=" p-6 rounded-lg shadow-xl w-full lg:w-2/3 h-auto border border-gray-300 bg-opacity-50 bg-transparent">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Students List
//               </h3>
//               {students.length > 0 ? (
//                 <div>
//                   {/* Scrollable Students List */}
//                   <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
//                     <ul className="divide-y divide-gray-200">
//                       {students.map((student) => (
//                         <li
//                           key={student.id}
//                           className="py-2 px-4 hover:bg-gray-100"
//                         >
//                           {student.name}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ) : (
//                 <p>Students will be assigned soon.</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <div className="text-center">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               No Profile Found
//             </h3>
//             <button
//               className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
//               onClick={handleAddTeacher}
//             >
//               Add Teacher Information
//             </button>
//           </div>
//         )}
//       </div>
  
//       {/* Modal for Adding/Updating Teacher Information */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className=" p-6 rounded-lg shadow-lg w-96   ">
//             <h3 className="text-xl font-semibold text-gray-1100 mb-4">
//               {isEditing ? "Update Profile" : "Add Teacher Information"}
//             </h3>
//             <form>
//               <label className="block text-gray-1000 mt-8 mb-2">Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formDetails.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-opacity-50  bg-transparent"
//               />
//               <label className="block text-gray-1000 mt-2 mb-2">Subject:</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formDetails.subject}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-transparent "
//               />
//               <label className="block text-gray-1000 mb-2">Gender:</label>
//               <select
//                 name="gender"
//                 value={formDetails.gender}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-transparent"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               <label className="block text-gray-1000 mb-2">DOB:</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formDetails.dob}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-transparent"
//               />
//               <label className="block text-gray-1000 mb-2">Contact:</label>
//               <input
//                 type="text"
//                 name="contact"
//                 value={formDetails.contact}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-transparent"
//               />
//               <label className="block text-grey-900 mb-2">Salary:</label>
//               <input
//                 type="number"
//                 name="salary"
//                 value={formDetails.salary}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg mb-4 bg-transparent"
//               />
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleModalClose}
//                   className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     {/* </div> */}
//   </div>
  
//   );
// };

// export default TeacherProfile;



import React, { useState } from "react";
import backgroundImage from "../../images/university-6699377.jpg"; 

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    subject: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
  });
  const [students, setStudents] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTeacher = () => {
    setFormDetails({
      name: "",
      subject: "",
      gender: "",
      dob: "",
      contact: "",
      salary: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditTeacher = () => {
    setFormDetails(teacher); // Pre-fill fields with teacher's information
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setTeacher((prev) => ({
      ...prev,
      ...formDetails,
      assignedClass: getAssignedClass(formDetails.subject),
    }));
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setTeacher(null);
    alert("Profile deleted!");
  };

  const handleFetchStudents = (subject) => {
    // Simulated database fetch
    const fetchedStudents = subject
      ? Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          // name: Student ${i + 1},
        }))
      : [];
    setStudents(fetchedStudents);
  };

  const getAssignedClass = (subject) => {
    const classMapping = {
      Mathematics: "10th Grade",
      Science: "9th Grade",
      English: "11th Grade",
    };
    return classMapping[subject] || "Class will be assigned soon";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 bg-cover bg-center relative  bg-opacity-50" style={{ backgroundImage: `url(${backgroundImage})` }}>
    {/* <div className=" relative bg-gray-200 bg-opacity-50"> */}
      {/* <img
        src={backgroundImage}
        alt="Campus"
        className="object-cover w-full h-full opacity-50"
      /> */}
      
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-6 px-6 flex justify-between items-center shadow-lg rounded-t-lg bg-transparent">
  <h1 className="text-2xl font-semibold flex-grow text-center text-shadow-lg">
    Teacher Dashboard
  </h1>
  {teacher && <span className="mr-4 text-shadow-lg">Welcome, {teacher.name}</span>}
  <button
    onClick={() => alert("Logged out")}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  >
    Logout
  </button>
</header>

      {/* Main Content */}
      <div className="mt-8 container mx-auto px-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {teacher ? (
          <>
            {/* Teacher Information Section */}
            <div className=" p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border bg-opacity-50 border-gray-300 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Teacher Information
              </h3>
              <p>
                <strong className="text-gray-600">Name:</strong>{" "}
                <span className="ml-5">{teacher.name}</span>
              </p>
              <p>
                <strong className="text-gray-600">Subject:</strong>{" "}
                <span className="ml-2">{teacher.subject}</span>
              </p>
              <p>
                <strong className="text-gray-600">Gender:</strong>{" "}
                <span className="ml-2">{teacher.gender}</span>
              </p>
              <p>
                <strong className="text-gray-600">DOB:</strong>{" "}
                <span className="ml-7">{teacher.dob}</span>
              </p>
              <p>
                <strong className="text-gray-600">Contact:</strong>{" "}
                <span className="ml-1">{teacher.contact}</span>
              </p>
              <p>
                <strong className="text-gray-600">Salary:</strong>{" "}
                <span className="ml-4">${teacher.salary}</span>
              </p>
  
              {/* Profile action buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleEditTeacher}
                  className=" border-2 border-blue-1000 text-gray-1000 px-4 py-2 rounded-lg   bg-transparent"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleDelete}
                  className=" border-2 border-blue-1000 text-gray-1000 px-4 py-2 rounded-lg bg-transparent"
                >
                  Delete Profile
                </button>
              </div>
            </div>
  
            {/* Assigned Class Section */}
            <div className=" p-6 rounded-lg shadow-xl w-full lg:w-1/3 h-auto border border-gray-300 bg-opacity-50 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Assigned Class
              </h3>
              <p>
                <strong className="text-gray-600">Class:</strong>{" "}
                {teacher.assignedClass || "Class will be assigned soon"}
              </p>
            </div>
  
            {/* Students Section */}
            <div className=" p-6 rounded-lg shadow-xl w-full lg:w-2/3 h-auto border border-gray-300 bg-opacity-50 bg-transparent">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Students List
              </h3>
              {students.length > 0 ? (
                <div>
                  {/* Scrollable Students List */}
                  <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
                    <ul className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <li
                          key={student.id}
                          className="py-2 px-4 hover:bg-gray-100"
                        >
                          {student.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Students will be assigned soon.</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              No Profile Found
            </h3>
            <button
              className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
              onClick={handleAddTeacher}
            >
              Add Teacher Information
            </button>
          </div>
        )}
      </div>
  
      {/* Modal for Adding/Updating Teacher Information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className=" p-6 rounded-lg shadow-lg w-96   ">
            <h3 className="text-xl font-semibold text-gray-1100 mb-4">
              {isEditing ? "Update Profile" : "Add Teacher Information"}
            </h3>
            <form>
              <label className="block text-gray-1000 mt-8 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-opacity-50  bg-transparent"
              />
              <label className="block text-gray-1000 mt-2 mb-2">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formDetails.subject}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-transparent "
              />
              <label className="block text-gray-1000 mb-2">Gender:</label>
              <select
                name="gender"
                value={formDetails.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label className="block text-gray-1000 mb-2">DOB:</label>
              <input
                type="date"
                name="dob"
                value={formDetails.dob}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-transparent"
              />
              <label className="block text-gray-1000 mb-2">Contact:</label>
              <input
                type="text"
                name="contact"
                value={formDetails.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-transparent"
              />
              <label className="block text-grey-900 mb-2">Salary:</label>
              <input
                type="number"
                name="salary"
                value={formDetails.salary}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4 bg-transparent"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className=" border-2 border-blue-1000 text-gray-1000  px-4 py-2 rounded-lg bg-transparent"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    {/* </div> */}
  </div>
  
  );
};

export default TeacherProfile;