const express = require('express');
const router = express.Router();

// const protectRoute = require("../middleware/protectRoutes");


const {addClass, updateClass , getAllClasses,getClassByCriteria,deleteClass} = require('../controllers/classController');


// Define the routes
router.get('/list', getAllClasses);
router.get("/list/:id", getClassByCriteria);
router.post('/create', addClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id" , deleteClass);

module.exports = router;
