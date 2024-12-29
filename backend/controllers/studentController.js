const Student = require('../models/studentSchema');
const Teacher = require("../models/teacherSchema");
const Class = require("../models/classSchema");
const mongoose = require("mongoose")

// Create a new student
const createStudent = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, subject, gender, dob, contact } = req.body;

    // Validate required fields
    if (!name || !subject || !gender || !dob || !contact) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Initialize variables for teacher and class
    let teacher = "";
    let clas = "";

    // Fetch the related teacher and class based on the subject
    try {
      teacher = await Teacher.findOne({ subject });
    } catch (error) {
      teacher = "";
    }

    try {
      clas = await Class.findOne({ subject });
    } catch (error) {
      clas = "";
    }

    // Initialize class and teacher assignment message
    let classAssignmentMessage = "";
    let teacherAssignmentMessage = "";

    // Check if the class exists
    if (clas) {
      // Check if students in the class are less than 60
      const studentsInClass = await Student.find({ assignedClass: clas._id });
      if (studentsInClass.length <= 60) {
        // Assign the class to the student if there are less than 60 students
        req.body.class = clas._id;
      } else {
        // Leave class assignment empty and notify that class assignment will be done soon
        classAssignmentMessage = "Class will assign soon.";
      }
    }else {
      // Leave class assignment empty and notify that class assignment will be done soon
      req.body.class = clas
      classAssignmentMessage = "Class  will assign soon.";
    }

    // Create the student instance
    const student = new Student({
      ...req.body,
      assignedTeachers: teacher ? [teacher._id] : [],
    });

    // If teacher exists, assign them to the student and add the student to teacher's students list
    if (teacher) {
      teacher.students.push(student._id);
    } else {
      teacherAssignmentMessage = "Teacher will be assigned soon.";
    }

    // If class exists, add student to class students and fees list
    if (clas) {
      clas.students.push(student._id);
      clas.studentFees.push(student._id); // Assuming this is required
    }

    // Save all changes concurrently using Promise.all
    await Promise.all([student.save(), teacher ? teacher.save() : "", clas ? clas.save() : ""]);

    // Respond with a success message and the created student
    res.status(201).json({
      message: 'Student created successfully',
      student,
      classAssignmentMessage,
      teacherAssignmentMessage,
    });
  } catch (error) {
    // Catch and respond with error details
    console.error('Error creating student:', error.message);
    res.status(500).json({
      message: 'Error creating student',
      error: error.message,
    });
  }
};



// Get all students with filters, pagination, and population
const getAllStudents = async (req, res) => {
  try {
    // Extract query parameters
    const { classId, gender, page = 1, limit = 10 } = req.query;

    // Build the filter object
    const filter = {};
    if (classId) filter.class = classId;
    if (gender) filter.gender = gender;

    // Parse pagination parameters and ensure valid numbers
    const pageNumber = Math.max(1, Number(page)); // Ensure page is at least 1
    const pageSize = Math.max(1, Number(limit)); // Ensure limit is at least 1

    // Query the database with filters, pagination, and population
    const [students, totalStudents] = await Promise.all([
      Student.find(filter)
        .populate("class", "className subject year") // Populate class details
        .populate("assignedTeachers", "name subject") // Populate assigned teachers
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize),
      Student.countDocuments(filter),
    ]);

    // Construct response
    res.status(200).json({
      message: "Students fetched successfully",
      students,
      meta: {
        totalStudents,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalStudents / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};


// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Fetch the student and populate related data
    const student = await Student.findById(id)
      .populate("class", "className year") // Populate class details
      .populate("assignedTeachers", "name subject"); // Populate assigned teachers

    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the student data
    res.status(200).json({
      message: "Student fetched successfully",
      student,
    });
  } catch (error) {
    console.error("Error fetching student by ID:", error.message);
    res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID format" });
    }

    // Find the existing student
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the subject is being updated
    const isSubjectUpdated = subject && subject !== existingStudent.subject;

    let classAssignmentMessage = "";
    let teacherAssignmentMessage = "";

    if (isSubjectUpdated) {
      console.log("Subject is being updated:", subject);

      // Remove student ID from the previous class and teacher
      if (existingStudent.class) {
        await Class.findByIdAndUpdate(existingStudent.class, {
          $pull: { students: id, studentFees: id },
        });
      }

      if (existingStudent.assignedTeachers && existingStudent.assignedTeachers.length > 0) {
        await Teacher.updateMany(
          { _id: { $in: existingStudent.assignedTeachers } },
          { $pull: { students: id } }
        );
      }

      // Find the new class and teacher based on the updated subject
      const newClass = await Class.findOne({ subject });
      const newTeacher = await Teacher.findOne({ subject });

      if (newClass) {
        // Check if the class has space for more students
        const studentsInClass = await Student.find({ assignedClass: newClass._id });
        if (studentsInClass.length < 60) {
          req.body.class = newClass._id;
          await newClass.updateOne({ $addToSet: { students: id, studentFees: id } });
        } else {
          req.body.class = null;
          classAssignmentMessage = "Class assignment will be done soon. The class is full.";
        }
      } else {
        req.body.class = null;
        classAssignmentMessage = "Class for the updated subject will be assigned soon.";
      }

      if (newTeacher) {
        req.body.assignedTeachers = [newTeacher._id];
        await newTeacher.updateOne({ $addToSet: { students: id } });
      } else {
        req.body.assignedTeachers = [];
        teacherAssignmentMessage = "Teacher for the updated subject will be assigned soon.";
      }
    }

    // const student = await Student.findById(id);
    // console.
    // const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
    //   new: true, // Return the updated document
    //   runValidators: true, // Validate the updates against the schema
    // });

    // Update the student with the new data
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Enforce schema validation during update
    });

    if (!updatedStudent) {
      return res.status(500).json({ message: "Failed to update student." });
    }

    // Respond with success
    res.status(200).json({
      message: "Student updated successfully.",
      student: updatedStudent,
      classAssignmentMessage,
      teacherAssignmentMessage,
    });
  } catch (error) {
    console.error("Error updating student:", error);

    // Handle known error types
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID or ObjectId casting issue." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed.", error: error.message });
    }

    // General server error
    res.status(500).json({
      message: "An unexpected error occurred while updating the student.",
      error: error.message,
    });
  }
};




const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Find and delete the student
    const deletedStudent = await Student.findByIdAndDelete(id);

    // Check if the student exists
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { class: classId, assignedTeachers } = deletedStudent;

    // Remove student from the related class
    if (classId) {
      await Class.findByIdAndUpdate(
        classId,
        {
          $pull: { students: id, studentFees: id }, // Remove student from students and studentFees arrays
        },
        { new: true }
      );
    }

    // Remove student from all assigned teachers
    if (assignedTeachers && assignedTeachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: assignedTeachers } },
        {
          $pull: { students: id }, // Remove student from teachers' students array
        }
      );
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: {
        id: deletedStudent._id,
        name: deletedStudent.name,
      },
    });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};


module.exports = {createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent};