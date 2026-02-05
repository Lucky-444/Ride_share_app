/**
 * ==============================
 * Core & Third-Party Imports
 * ==============================
 */
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");

dotenv.config();

/**
 * ==============================
 * App & Server Initialization
 * ==============================
 */
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

/**
 * ==============================
 * Database & Cache Connections
 * ==============================
 */
const connectDB = require("./config/db");
const redisClient = require("./config/redisClient");

/**
 * ==============================
 * Routes
 * ==============================
 */
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const driverRoutes = require("./routes/driverRoutes");

/**
 * ==============================
 * Socket Services
 * ==============================
 */
const locationService = require("./services/locationService");

/**
 * ==============================
 * Middleware
 * ==============================
 */
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

/**
 * ==============================
 * Database Connection
 * ==============================
 */
connectDB();

/**
 * ==============================
 * Socket.IO Setup
 * ==============================
 */
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
  },
});

/**
 * ==============================
 * API Routes
 * ==============================
 */
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes(io)); // passing io to booking routes
app.use("/api/drivers", driverRoutes);
app.use("/api/passengers", passengerRoutes);

/**
 * ==============================
 * Redis Events
 * ==============================
 */
redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

/**
 * ==============================
 * Socket.IO Events
 * ==============================
 */
io.on("connection", (socket) => {
  console.log("🔌 New socket connected:", socket.id);

  // Register driver socket
  socket.on("registerDriver", async (driverId) => {
    await locationService.setDriverSocket(driverId, socket.id);
    console.log(`🚗 Driver ${driverId} registered`);
  });

  // Cleanup on disconnect
  socket.on("disconnect", async() => {
    try {
      // 1. Get driverId using socketId
      const driverId = await locationService.getDriverSocket(socket.id);

      if (driverId) {
        // 2. Remove both mappings from Redis
        await locationService.removeDriverSocket(driverId, socket.id);
        console.log(`❌ Driver ${driverId} disconnected`);
      }
    } catch (err) {
      console.error("Error during disconnect cleanup:", err);
    }
  });
});

/**
 * ==============================
 * Server Listener
 * ==============================
 */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
