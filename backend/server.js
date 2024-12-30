// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const dotenv = require("dotenv"); // dotenv module to load environment variables
const app = express(); // Initialize Express application

// Middleware to handle cross-origin requests

// const corsOptions = {
//     origin: "https://school-management-app-virid.vercel.app/", // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   };
  
// app.use(cors(corsOptions));// Enable CORS for all routes

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://school-management-app-thu0.onrender.com',
      'https://school-management-app-virid.vercel.app',
      // 'https://school-management-zh9v72d9u-abhishek-katiyars-projects-97d0705a.vercel.app',
    ];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));



// Middleware to parse incoming JSON data in requests
app.use(express.json()); // Automatically parses JSON requests

// Load environment variables from .env file
dotenv.config(); // Ensures environment variables are loaded from the .env file

// Import the database connection function
const connectToDatabase = require("./db/connectDatabase"); // Function to connect to your database

// Set up the port to either the one in environment variables or 5432
const PORT = process.env.PORT || 5432; // Default to 5432 if PORT is not specified in .env

// Import route modules for different API endpoints
const authRoutes = require("./routes/authRoutes"); // Routes for authentication-related operations
const teacherRoutes = require("./routes/teacherRoutes"); // Routes for teacher-related operations
const studentRoutes = require("./routes/studentRoutes"); // Routes for student-related operations
const classRoutes = require("./routes/classRoutes"); // Routes for class-related operations

// Use routes for their corresponding base URL
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with '/api/auth'
app.use('/api/teacher', teacherRoutes); // All teacher routes will be prefixed with '/api/teacher'
app.use('/api/student', studentRoutes); // All student routes will be prefixed with '/api/student'
app.use("/api/class", classRoutes); // All class routes will be prefixed with '/api/class'

// Start the server and listen on the defined port
app.listen(PORT, () => {
    connectToDatabase(); // Establish connection to the database when the server starts

    // Log server start confirmation along with the port number
    console.log("Server is started on port", PORT);
});
