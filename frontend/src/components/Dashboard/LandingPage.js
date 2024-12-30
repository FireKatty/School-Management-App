import React, { useState } from "react";
import backgroundImage from "../../images/university-6699377.jpg";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [isCreating, setIsCreating] = useState(false); // Toggle between login and create
  const [role, setRole] = useState(""); // Role field state
  // const [inputWidth, setInputWidth] = useState(200); // Default width for input fields
  const [heading, setHeading] = useState("Create New Student"); // Dynamic heading state
  const [formData, setFormData] = useState({}); // Store form data
  const navigate = useNavigate();

  const handleCreateClick = (selectedRole) => {
    setIsCreating(true);
    setRole(selectedRole); // Set role based on button clicked
    // Update heading based on selected role
    if (selectedRole === "student") {
      setHeading("Create New Student");
    } else if (selectedRole === "teacher") {
      setHeading("Create New Teacher");
    } else if (selectedRole === "admin") {
      setHeading("Create New Admin");
    }
  };

  const handleBackToLogin = () => {
    setIsCreating(false);
    setRole(""); // Reset role when going back to login
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9876/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data)); 
        console.log("API Response:", data);
  
        if (data.result && data.result.role) {
          // Role-based navigation
          switch (data.result.role) {
            case "admin":
              console.log("admin")
              navigate("/admin");
              break;
            case "teacher":
              console.log("teacher")
              navigate("/teacher");
              break;
            case "student":
              console.log("student")
              navigate("/student");
              break;
            default:
              navigate("/");
          }
          console.log("User created successfully:", data);
        } else {
          console.error("Role not found in API response:", data);
          alert("Failed to retrieve role information. Please try again.");
        }
      } else {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        alert(`Error: ${errorData.message || "Failed to create user."}`);
      }
    } catch (error) {
      console.error("Error during creation API call:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // API call to login
      const response = await fetch("http://localhost:9876/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));

        console.log("Login successful:", data);
  
        // Check if role exists in the response
        if (data?.result?.role) {
          const userRole = data.result.role;
          // Role-based navigation
          switch (userRole) {
            case "admin":
              console.log("admin")
              navigate("/admin");
              break;
            case "teacher":
              console.log("teacher")
              navigate("/teacher");
              break;
            case "student":
              console.log("student")
              navigate("/student");
              break;
            default:
              console.warn("Unexpected role:", userRole);
              navigate("/");
          }
        } else {
          console.error("Role not found in response:", data);
          alert("Login failed: Unable to determine user role.");
        }
      } else {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        alert(`Error: ${errorData.message || "Login failed. Please try again."}`);
      }
    } catch (error) {
      console.error("Error during login API call:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  


  return (
    <div className="flex min-h-screen">
      {/* Left Side: Placement Info and Background Image */}
      <div className="w-2/3 relative bg-gray-200">
        <img
          src={backgroundImage}
          alt="Campus"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side: Login or Create Form */}
      <div className="w-1/3 flex flex-col items-center justify-center bg-gray-900 text-white p-8">
        {isCreating ? (
          <div>
            <h2 className="text-3xl font-semibold mb-6">{heading}</h2> {/* Dynamic heading */}
            <form className="w-full max-w-lg" onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}

                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={role}
                  readOnly
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <button
                
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
              >
                Create Account
              </button>
            </form>
            <button
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md mt-4 hover:bg-red-700"
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-6">School Management App</h2>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700"
              >
                Sign me in
              </button>
            </form>
            <div className="mt-4 space-y-2">
              <button
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
                onClick={() => handleCreateClick("student")}
              >
                Create New Student (New Admission)
              </button>
              <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
                onClick={() => handleCreateClick("teacher")}
              >
                Create New Teacher (New Joined)
              </button>
              <button
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700"
                onClick={() => handleCreateClick("admin")}
              >
                Create New Admin (New Joined)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
