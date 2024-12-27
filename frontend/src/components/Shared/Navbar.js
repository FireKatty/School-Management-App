import React from "react";

const Navbar = ({ userType }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <h1 className="text-2xl font-bold">School Management System</h1>
      <p className="mt-1 text-lg">{userType} Dashboard</p>
    </nav>
  );
};

export default Navbar;
