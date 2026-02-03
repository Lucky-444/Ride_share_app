const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const connectDB = require("./config/db");

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

connectDB();
app.get('/' , (req , res) => {
         res.send("Home Page")
})
app.listen(PORT ,() =>{
         console.log(`Server running On Port ${PORT}`);
})
