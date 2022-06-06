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

// Route Files
const auth = require("./routes/auth");
const note = require("./routes/note");
// Load env vars
dotenv.config({ path: './config/config.env' });

// connectDB();

// // Initialise app

const app = express();

app.use(express.urlencoded({ extended: false }));
// // Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
// app.use(mongoSanitize());

// Cross site scripting attacks
// app.use(xssClean());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

// Enabling cross origin resource sharing
app.use(cors());

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ================Mount routes=====================
app.get("/", (req, res, next) => {
	console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);

	res.send("HELLO");
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/note", note);

// Error handler middleware (Should be after mounting routes as otherwise it will not be able to
// errors otherwise)
app.use(errorHandler);

const PORT = process.env.PORT || 4500;
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
// const server = app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

// // Handel unhandelled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.log(`Error : ${err.message}`.red);
//   // Close Server & Exit process
//   server.close(() => process.exit(1));
// });
