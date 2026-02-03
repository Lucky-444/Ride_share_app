const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config();
const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const driverRoutes = require('./routes/driverRoutes');

const redisClient = require("./config/redisClient");

const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB();

app.use('api/auth' , authRoutes);
app.use('api/bookings' , bookingRoutes);
app.use('api/drivers' , driverRoutes);
app.use('api/passenger' , passengerRoutes);




server.listen(PORT ,() =>{
         console.log(`Server running On Port ${PORT}`);
})

redisClient.on('connect' , () => {
         console.log("Connected To redis");
})
