const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

const cors = require("cors")
dotenv.config()
 //env file ko use krne ka tarika

//initialize the express app
const app = express()
app.use(cors())

app.use(express.json());

app.use("/api", taskRoutes);

//connect the mongodb

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log("MongoDB connection error"));

module.exports = app;
