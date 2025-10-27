const express = require("express");
const { connectToDatabase } = require("./database/Db");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Import routes
const superAdminRoutes = require("./routes/superAdminRoute");
const adminRoutes = require("./routes/adminRoute");
const wlpRoutes = require("./routes/wlpRoute");
const manufacturRoutes = require("./routes/manuFacturRoute");

const app = express();

// ✅ Tell Express to trust proxy headers (important for real client IPs)
// ✅ If using Render, Nginx, or a load balancer
app.set('trust proxy', 1);

// ✅ Security Middlewares
app.use(helmet()); // Secure HTTP headers

// ✅ CORS (Restrict allowed origins in production)
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body parser
//app.use(express.json({ limit: "10kb" })); // Prevent DOS by limiting payload
app.use(express.json());

// ✅ Rate Limiting (Prevent brute force / DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Logging (Audit Trail)
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream })); // Logs requests to file
app.use(morgan("dev")); // Also log in console for dev

// ✅ API Routes
app.use("/superadmin", superAdminRoutes);
app.use("/admin", adminRoutes);
app.use("/wlp", wlpRoutes);
app.use("/manufactur", manufacturRoutes);

// ✅ Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// ✅ Connect to Database
connectToDatabase();
