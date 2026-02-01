const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT;

connectDB();
app.get('/' , (req , res) => {
         res.send("Home Page")
})
app.listen(PORT ,() =>{
         console.log(`Server running On Port ${PORT}`);
})
