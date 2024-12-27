const Student = require('../models/studentSchema');
const Teacher = require("../models/teacherSchema")
const Class = require("../models/classSchema");
const mongoose = require("mongoose")


// Add a new teacher

const addData = async (req, res) => {
  try {
    const { name, subject, gender, dob, contact, salary } = req.body;
    

    // Data validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (!gender || !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    if (!dob || isNaN(Date.parse(dob))) {
      return res.status(400).json({ message: "Invalid date of birth (must be a valid date)" });
    }

    if (!contact || !/^\d{10}$/.test(contact)) {
      return res.status(400).json({
        message: "Invalid contact number (must be exactly 10 digits)",
      });
    }

    if (!salary || typeof salary !== "number" || salary <= 0) {
      return res.status(400).json({ message: "Invalid salary (must be a positive number)" });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return res.status(400).json({ message: "Invalid subject" });
    }
    

    let newClassId = [];
    // Check if the class for the subject exists
    const newClass = await Class.findOne({ subject });

    if (newClass && newClass.teacher.length === 0) {
      // console.log(newClass)
      newClassId = newClass._id
    }

    // Create a new teacher
    const newTeacher = new Teacher({
      name: name.trim(),
      subject: subject.trim(),
      gender,
      dob: new Date(dob), // Convert to a valid Date object
      contact,
      salary,
      assignedClasses: newClass ? newClassId : null ,
    });
  
    // Check if newClass and teacher is not present then assign this teacher to that class
    if (newClass && newClass.teacher.length === 0) {
      await newClass.updateOne({ $addToSet: { teacher: newTeacher._id } });
    }

    // Fetch students based on the subject
    const students = await Student.find({ subject });

    // Assign the teacher to students if found and not already assigned
    if (students.length > 0) {
      const unassignedStudents = students.filter(
        (student) => !student.assignedTeachers || !student.assignedTeachers.includes(newTeacher._id)
      );

      if (unassignedStudents.length > 0) {
        await Student.updateMany(
          { _id: { $in: unassignedStudents.map((student) => student._id) } },
          { $addToSet: { assignedTeachers: newTeacher._id } }
        );
      // assign student list to Teacher
        unassignedStudents.forEach((student) => {
          newTeacher.students.push(student._id);
        });        
      }
    }
    
    const savedTeacher = await newTeacher.save();
    console.log(name)
    res.status(201).json({
      message: "Teacher added successfully and assigned to unassigned students",
      teacher: savedTeacher,
      // assignedStudents: students.length > 0 ? students.map((student) => student._id) : [], // Return assigned students if found
    });
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    res.status(500).json({
      message: "Error adding teacher",
      error: error.message,
    });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id: teacherId } = req.params;
    const { name, gender, dob, contact, salary, subject } = req.body;

    // Validate teacher ID format
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    // Validate input fields
    const validationErrors = validateTeacherFields({ name, gender, dob, contact, salary, subject });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(', ') });
    }

    // Find the current teacher data
    const currentTeacher = await Teacher.findById(teacherId);
    if (!currentTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Flag to check if subject is updated
    const subjectChanged = subject && subject !== currentTeacher.subject;

    let newClassId = [];
    let classmessage = "";

    if (subjectChanged) {
      // Remove teacher from previously assigned students and classes
      await updateClassAndStudentsForTeacherChange(teacherId);

      // Fetch the new class for the updated subject
      const newClass = await Class.findOne({ subject });
      if (!newClass) {
        classmessage = "Class will assign soon";
      }

      // Assign teacher to the new class, if not already assigned
      if (newClass && newClass.teacher.length === 0) {
        await newClass.updateOne({ $addToSet: { teacher: teacherId } });
        newClassId = newClass._id; // Assign the new class ID
        // console.log(newClassId)
      }

    }

   

    // Update teacher details in the database
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        name,
        gender,
        dob: dob ? new Date(dob) : undefined,
        contact,
        salary,
        subject,
        assignedClasses: subjectChanged ? newClassId : currentTeacher.assignedClasses,
        students: []
         // Update class only if subject changed
      },
      { new: true, runValidators: true } // Return updated document and enforce schema validation
    );

    // Assign the teacher to unassigned students
    await assignTeacherToUnassignedStudents(subject, teacherId);

    res.status(200).json({
      message: "Teacher updated successfully",
      classmessage,
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error.message);
    res.status(500).json({
      message: "Error updating teacher",
      error: error.message,
    });
  }
};

// Helper function to validate input fields
const validateTeacherFields = ({ name, gender, dob, contact, salary, subject }) => {
  const errors = [];

  if (name && (typeof name !== "string" || name.trim().length === 0)) {
    errors.push("Invalid name");
  }
  if (gender && !["Male", "Female", "Other"].includes(gender)) {
    errors.push("Invalid gender");
  }
  if (dob && isNaN(Date.parse(dob))) {
    errors.push("Invalid date of birth");
  }
  if (contact && !/^\d{10}$/.test(contact)) {
    errors.push("Invalid contact number (must be 10 digits)");
  }
  if (salary && (typeof salary !== "number" || salary <= 0)) {
    errors.push("Invalid salary (must be a positive number)");
  }
  if (subject && (typeof subject !== "string" || subject.trim().length === 0)) {
    errors.push("Invalid subject");
  }

  return errors;
};

// Helper function to update class and students when teacher's subject changes
const updateClassAndStudentsForTeacherChange = async (teacherId) => {
  // Remove teacher from currently assigned students and classes

  // Find all students associated with the teacher ID
  // const students = await Student.find({ assignedTeachers: teacherId }); // Corrected here to query by assignedTeachers
  // console.log(students)
  // if (students.length > 0) {
  //   // Extract student IDs
  //   const studentIds = students.map((student) => student._id);
  //   await Teacher.updateMany(
  //     {students: studentIds},
  //     {
  //       $pull: {students:studentIds}
  //     }
  //   );

    // Remove these students from all teachers
    // await Teacher.updateMany(
    //   {},
    //   { $pull: { students: { $in: studentIds } } } // Remove all student IDs in the array
    // );
  // }

  

  await Student.updateMany(
    { assignedTeachers: teacherId },
    { $pull: { assignedTeachers: teacherId } }
  );

  await Class.updateMany(
    { teacher: teacherId },
    { $pull: { teacher: teacherId } }
  );
};

// Helper function to assign teacher to unassigned students
const assignTeacherToUnassignedStudents = async (subject, teacherId) => {
  const students = await Student.find({ subject });
  const teacher = await Teacher.findById(teacherId);

  const unassignedStudents = students.filter(
    (student) => !student.assignedTeachers || !student.assignedTeachers.includes(teacherId)
  );

  if (unassignedStudents.length > 0) {
    await Student.updateMany(
      { _id: { $in: unassignedStudents.map((student) => student._id) } },
      { $addToSet: { assignedTeachers: teacherId } }
    );
    unassignedStudents.forEach((student) => {
      teacher.students.push(student._id);
    });
    await teacher.save();
  }
};


// Controller to get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const { subject, gender, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Apply filters if provided
    if (subject) filter.subject = subject;
    if (gender) filter.gender = gender;

    // Fetch teachers with filters, pagination, and populate required fields
    const teachers = await Teacher.find(filter)
      .populate("assignedClasses", "className year") // Populate assigned class details
      .populate("students", "name gender dob contact feesPaid") // Populate student details
      .skip((page - 1) * limit) // Pagination: skip documents
      .limit(Number(limit)); // Pagination: limit documents per page

    // Count total teachers matching the filter criteria
    const totalTeachers = await Teacher.countDocuments(filter);

    // Response with paginated teacher data
    res.status(200).json({
      teachers,
      totalTeachers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTeachers / limit),
    });
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    res.status(500).json({ message: "Error fetching teachers", error: error.message });
  }
};


// Get Teacher By ID
const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // Find teacher by ID and populate fields
    const teacher = await Teacher.findById(id)
      .populate("assignedClasses", "className year") // Populate assigned class details
      .populate("students", "name gender dob contact feesPaid"); // Populate student details

    // Handle case where teacher is not found
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Return the teacher profile
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher profile:", error.message);
    res.status(500).json({ message: "Error fetching teacher profile", error: error.message });
  }
};


// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    // Find and delete the teacher
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    // Check if the teacher exists
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const { assignedClasses, students } = deletedTeacher;

    // Remove teacher from related classes
    if (assignedClasses && assignedClasses.length > 0) {
      await Class.updateMany(
        { _id: { $in: assignedClasses } },
        {
          $pull: { teacher: id }, // Remove teacher from the teacher array in Class
        }
      );
    }

    // Remove teacher from all assigned students
    if (students && students.length > 0) {
      await Student.updateMany(
        { _id: { $in: students } },
        {
          $pull: { assignedTeachers: id }, // Remove teacher from students' assignedTeachers array
        }
      );
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
      teacher: {
        id: deletedTeacher._id,
        name: deletedTeacher.name,
      },
    });
  } catch (error) {
    console.error("Error deleting teacher:", error.message);
    res.status(500).json({
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};


module.exports = {addData, updateTeacher, getAllTeachers ,getTeacherById, deleteTeacher}

  