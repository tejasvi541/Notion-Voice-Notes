const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const colors = require("colors");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

// Route Files
const auth = require("./routes/auth");

// Initialise app

const app = express();

// Body Parser
app.use(express.json);

// Cookie Parser
app.use(cookieParser());

// Development logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Cross site scripting attacks
app.use(xssClean());

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
});

app.use(limiter);

// Enabling cross origin resource sharing
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// ================Mount routes=====================
app.use("/api/v1/auth", auth);

// Error handler middleware (Should be after mounting routes as otherwise it will not be able to
// errors otherwise)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handel unhandelled promise rejections
process.on("unhandledRejection", (err) => {
	console.log(`Error : ${err.message}`.red);
	// Close Server & Exit process
	server.close(() => process.exit(1));
});
