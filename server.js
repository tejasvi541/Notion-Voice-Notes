const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connectDB();

// Initialise app

const app = express();

// Body Parser
app.use(express.json);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
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
