const express = require("express");
const router = express.Router();
// const protectRoute = require("../middleware/protectRoutes")

const { addData,updateTeacher, getAllTeachers, getTeacherById, deleteTeacher} = require("../controllers/teachherController")

// Define the routes
router.get("/getData",getAllTeachers);
router.get("/getData/:id",getTeacherById);
router.post("/addData",addData);
router.put("/updateData/:id", updateTeacher);
router.delete("/deleteData/:id", deleteTeacher);

module.exports = router;