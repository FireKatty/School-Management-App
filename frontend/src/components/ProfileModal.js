import React, { useState } from "react";

function ProfileModal({ type, profile, onClose, onSave }) {
  const [formData, setFormData] = useState(
    type === "update"
      ? profile
      : {
          name: "",
          subject: "",
          gender: "",
          dob: "",
          contact: "",
          feesPaid: false,
        }
  );

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md bg-opacity-20 bg-transparent">
        <h2 className="text-xl font-bold mb-4">
          {type === "create" ? "Create Profile" : "Update Profile"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border bg-gray-500 rounded p-2 bg-opacity-50  "
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border rounded p-2  bg-gray-500 bg-opacity-50 "
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-500 bg-opacity-50 "
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded p-2  bg-gray-500 bg-opacity-50 "
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="w-full border rounded p-2  bg-gray-500 bg-opacity-50 "
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="feesPaid"
              checked={formData.feesPaid}
              onChange={handleChange}
              className="mr-2 bg-opacity-50  bg-gray-500 bg-transparent"
            />
            Fees Paid
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded bg-opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSave}
              className="bg-blue-500 text-white px-4 py-2 rounded bg-opacity-70"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;