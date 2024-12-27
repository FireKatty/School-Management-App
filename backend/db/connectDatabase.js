const mongoose = require("mongoose")
const mongoUri = process.env.MONGO_URI;

const connectToDatabase = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/School-Management-App', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected")
    } catch (error) {
        console.log("Error")
        
    }
}

module.exports = connectToDatabase;