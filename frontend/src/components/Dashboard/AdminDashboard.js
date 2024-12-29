import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/rain-1599790.jpg"; 

const AdminDashboard = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: data.result.fullName,
    email: data.result.email,
    contact: data.result.phoneNumber,
  });
  // const data = JSON.parse(localStorage.getItem('admin'));
  // setAdmin(data);
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


  const API_BASE = "http://localhost:9876/api/class";

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${API_BASE}/list`);
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_BASE}/list`);
      const data = await response.json();
      console.log(data)
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE}/list`);
      const data = await response.json();
      // console.log(data[0].students[0])
      setStudents(data[0].students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
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
    setFormClassDetails(classData);
    setIsEditingClass(true);
    setIsClassModalOpen(true);
  };

  const handleSaveClass = async () => {
    try {
      const method = isEditingClass ? "PUT" : "POST";
      const url = isEditingClass
        ? `${API_BASE}/update/${formClassDetails._id}`
        : `${API_BASE}/create`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formClassDetails),
      });

      if (!response.ok) {
        throw new Error("Error saving class");
      }

      setIsClassModalOpen(false);
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await fetch(`${API_BASE}/delete/${classId}`, {
        method: "DELETE",
      });
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };


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



  const handleEditAdmin = () => {
    setFormAdminDetails(admin); // Pre-fill fields with admin's information
    setIsEditingAdmin(true);
    setIsAdminModalOpen(true);
  };

  const onLogout = ()=>{
    localStorage.clear();
    navigate('/');
  }

  

  const handleDeleteAdmin = () => {
    setAdmin(null);
    alert("Admin profile deleted!");
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
          onClick={onLogout}
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
                          {student.name} - ({student.subject})
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
