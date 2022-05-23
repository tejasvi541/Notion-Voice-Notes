const express = require("express");
const {
	postNote,
	getNote,
	getNotes,
	deleteNote,
	updateNote,
} = require("../controllers/note");

const { protect } = require("../middleware/auth");

const router = express.Router();
