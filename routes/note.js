const express = require("express");
const { append } = require("express/lib/response");
const {
  postNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
  getUserNote,
} = require('../controllers/note');

const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/postNote", protect, postNote);
router.get("/getNote/:id", protect, getNote);
router.get("/getNotes", protect, getNotes);
router.delete("/deleteNote/:id", protect, deleteNote);
router.put("/updateNote/:id", protect, updateNote);

module.exports = router;
