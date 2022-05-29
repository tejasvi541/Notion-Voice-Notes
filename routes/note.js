const express = require("express");
const { append } = require("express/lib/response");
const {
	postNote,
	getNote,
	getNotes,
	deleteNote,
	updateNote,
} = require("../controllers/note");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/postNote", protect, postNote);

module.exports = router;
