const Class = require('../models/classSchema');
const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");


// Add Classes
const addClass = async (req, res) => {
  try {
    const { subject, year, className } = req.body;

    // Validate required fields
    if (!subject || !year || !className) {
      return res.status(400).json({ message: "Subject, year, and className are required." });
    }

    // Check if a class with the same subject already exists
    const existingClass = await Class.findOne({ subject });

    if (existingClass) {
      // Count the number of students already assigned to the class
      const studentsInClass = await Student.find({
        assignedClass: existingClass._id,
      });

      // If the number of students in the existing class is less than 60, don't create a new class
      if (studentsInClass.length < 60) {
        return res.status(200).json({
          message: `Class for subject "${subject}" already exists and has fewer than 60 students. No new class created.`,
          class: existingClass,
        });
      }
    }

    // Create and save the new class
    const newClass = new Class({ subject, year, className });
    const savedClass = await newClass.save();

    // Find students who match the subject and are not assigned to any class
    const newStudents = await Student.find({
      subject, // Ensure the student has the updated subject
      $or: [
        { class: { $exists: false } }, // Class field does not exist
        { class: null }, // Class field is explicitly null
      ],
    });
    // Assign the class to these students
    if (newStudents.length > 0) {
      await Student.updateMany(
        { _id: { $in: newStudents.map((student) => student._id) } },
        { $set: { class: savedClass._id } }
      );
    }

    // Find teachers who match the subject and are not assigned to any class
    const newTeachers = await Teacher.find({
      subject, // Ensure the teacher's subject matches the changed subject
      $or: [
        { assignedClasses: { $exists: false } }, // Teacher doesn't have assignedClasses field
        { assignedClasses: { $size: 0 } }, // Teacher has assignedClasses, but it's an empty array
      ],
    });
    // Assign the class to these teachers
    if (newTeachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: newTeachers.map((teacher) => teacher._id) } },
        { $addToSet: { assignedClasses: savedClass._id } }
      );
    }

    // Update the class to include these students and teachers
    savedClass.students = newStudents.map((student) => student._id);
    savedClass.studentFees = newStudents.map((student) => student._id);
    savedClass.teacher = newTeachers.map((teacher) => teacher._id);
    await savedClass.save();

    res.status(201).json({
      message: "Class created successfully and assigned to relevant students and teachers.",
      class: savedClass,
      assignedStudents: newStudents.map((student) => student._id),
      assignedTeachers: newTeachers.map((teacher) => teacher._id),
    });
  } catch (error) {
    console.error("Error adding class:", error.message);
    res.status(500).json({
      message: "Error adding class",
      error: error.message,
    });
  }
};

// Update Class

const updateClass = async (req, res) => {
  try {
    const { subject, year, className } = req.body;
    const { id: classId } = req.params;

    // Validate required fields
    if (!subject || !year || !className) {
      return res.status(400).json({ message: "Please provide all required fields: subject, year, and className." });
    }

    // Find the class by ID
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ message: `No class found with ID "${classId}".` });
    }

    // Update class details
    const updatedFields = {
      className,
      subject,
      year
    };
    
    // Check if the subject is being updated
    const isSubjectChanged = existingClass.subject !== subject;

    if (isSubjectChanged) {
      // Remove the class association from students linked to the old subject
      await Student.updateMany(
        { class: classId },
        { $unset: { class: "" } }
      );

      // Remove the class association from teachers linked to the old subject
      await Teacher.updateMany(
        { assignedClasses: classId },
        { $pull: { assignedClasses: classId } }
      );

      // Find students based on the subject of the existing class
      const students = await Student.find({ subject: existingClass.subject });

      if (students.length > 0) {
        // console.log(students)
        await Class.updateMany(
          { _id: existingClass._id }, // Update only the specific class
          {
            $pull: {
              studentFees: { $in: students.map((student) => student._id) }, // Remove student IDs from studentFees
              students: { $in: students.map((student) => student._id) },    // Remove student IDs from students
            },
          }
        );
      }
      
      // Find Teachers based on the subject of the existing class
      const teachers = await Teacher.find({ subject: existingClass.subject });
      if (teachers.length > 0) {
        // console.log(teachers)
        await Class.updateMany(
          { _id: existingClass._id }, // Update only the specific class
          {
            $pull: {
             teacher : { $in: teachers.map((teacher) => teacher._id) }, // Remove teacher IDs from teacher array
            },
          }
        );
      }


      
      // Find students related to the new subject and not assigned to any class
      const newStudents = await Student.find({
        subject, // Ensure the student has the updated subject
        $or: [
          { class: { $exists: false } }, // Class field does not exist
          { class: null }, // Class field is explicitly null
        ],
      });
      // Assign students to the class
      if (newStudents.length > 0) {
        // Update the class for all the new students
        await Student.updateMany(
          { _id: { $in: newStudents.map((student) => student._id) } }, // Match students by their IDs
          { $set: { class: classId } } // Assign the new class ID
        );
      
        // Update the fields in the class document to reflect the new students and their fees
        updatedFields.students = newStudents.map((student) => student._id); // Add new student IDs
        updatedFields.studentFees = newStudents.map((student) => student._id); // Add corresponding fees
      }
      

      // Find teachers related to the new subject and not assigned to any class
      const newTeachers = await Teacher.find({
        subject, // Ensure the teacher's subject matches the changed subject
        $or: [
          { assignedClasses: { $exists: false } }, // Teacher doesn't have assignedClasses field
          { assignedClasses: { $size: 0 } }, // Teacher has assignedClasses, but it's an empty array
        ],
      });
      // Assign teachers to the class
      if (newTeachers.length > 0) {
        // Update multiple teachers, adding the classId to their assignedClasses
        await Teacher.updateMany(
          { _id: { $in: newTeachers.map((teacher) => teacher._id) } }, // Select teachers by their IDs
          { $addToSet: { assignedClasses: classId } } // Add classId to assignedClasses without duplicates
        );

        // Update the class with the IDs of the newly assigned teachers
        updatedFields.teacher = newTeachers.map((teacher) => teacher._id); // Add new teacher IDs to the updatedFields object
      }

    }

    // Update the class with new data
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $set: updatedFields },
      { new: true, runValidators: true } // Return updated document and enforce schema validation
    );

    res.status(200).json({
      message: "Class updated successfully.",
      class: updatedClass,
      updatedSubject: isSubjectChanged ? subject : "Subject not changed",
    });
  } catch (error) {
    console.error("Error updating class:", error.message);
    res.status(500).json({
      message: "Error updating class",
      error: error.message,
    });
  }
};





//GetAll Classes
const getAllClasses = async (req, res) => {
  try {
    // Fetch all classes and populate the relevant fields
    const classes = await Class.find()
      .populate({
        path: 'students',           // Populating the 'students' field
        // select: 'name rollNumber'   // Optional: Select specific fields to return (e.g., name, rollNumber)
      })
      .populate({
        path: 'teacher',            // Populating the 'teacher' field
        select: 'name subject'      // Optional: Select specific fields to return (e.g., name, subject)
      })
      .populate({
        path: 'studentFees',        // Populating the 'studentFees' field
        // select: 'feeStatus amount'  // Optional: Select specific fields to return (e.g., feeStatus, amount)
      });

    // Return the populated classes data
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Get Class By Id
const getClassByCriteria = async (req, res) => {
  try {
    const { className, subject } = req.query; // Extract query parameters

    // Validate that at least one parameter (className or subject) is provided
    if (!className && !subject) {
      return res.status(400).json({ message: "Please provide className or subject." });
    }

    // Build the query based on the provided criteria
    const query = {};
    if (className) query.className = className;
    if (subject) query.subject = subject;
    console.log(query)

    // Find classes that match the query
    const classes = await Class.find(query)
      .populate({
        path: 'students'
      })
      .populate({
        path: 'teacher'
        // select: 'name subject'
      })
      .populate({
        path: 'studentFees',
      });

    // Check if any classes were found
    if (classes.length === 0) {
      return res.status(404).json({ message: "No classes found for the given criteria." });
    }

    // Return the classes that match the criteria
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching class:", error.message);
    res.status(500).json({ message: "Error fetching class", error: error.message });
  }
};




// Delete Class
const deleteClass = async (req, res) => {
  try {
    const { subject } = req.body;

    // Validate required fields
    if (!subject) {
      return res.status(400).json({ message: "Subject is required to delete a class." });
    }

    // Find the class by subject
    const existingClass = await Class.findOne({ subject });

    if (!existingClass) {
      return res.status(404).json({ message: `No class found for subject "${subject}".` });
    }

    // Remove the class association from students
    await Student.updateMany(
      { class: existingClass._id },
      { $unset: { class: "" } } // Remove the class field
    );

    // Remove the class association from teachers
    await Teacher.updateMany(
      { assignedClasses: existingClass._id },
      { $pull: { assignedClasses: existingClass._id } } // Remove the class ID from the assignedClasses array
    );

    // Delete the class
    await Class.deleteOne({ _id: existingClass._id });

    res.status(200).json({
      message: `Class for subject "${subject}" deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    res.status(500).json({
      message: "Error deleting class",
      error: error.message,
    });
  }
};


module.exports = {addClass, updateClass , getAllClasses,getClassByCriteria,deleteClass}