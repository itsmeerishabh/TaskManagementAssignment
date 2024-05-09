const express=require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./Config/dbConnection.js");
const dotenv =require("dotenv").config();

const cors = require('cors');


// Configure CORS
// You can customize the options according to your requirements.
const corsOptions = {
    origin: '*', // Allow all origins (change to a specific origin as needed)
    methods: 'GET, POST, PUT, DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
};



connectDb();

const app=express();

// Use the `cors` middleware
app.use(cors(corsOptions));

const port= process.env.PORT || 5000;

// app.get("/api/contacts",(req,res)=>{
//     res.status(200).json({message:"Get all contacts"});
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
 app.use("/api/employee",require("./routes/employeeRoutes.js"))
 app.use("/api/user",require("./routes/userRoutes.js"))
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
});