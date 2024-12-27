const express = require("express");
const router = express.Router();

// const protectRoute = require("../middleware/protectRoutes");


const {createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent} = require("../controllers/studentController");

// Define the routes
router.post('/create' ,createStudent);
router.get('/list', getAllStudents);
router.get("/list/:id", getStudentById);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id'  , deleteStudent);

module.exports = router;
