const express = require("express");
const {
	register,
	login,
	logout,
	getMe,
	updateDetails,
	updatepassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/logout", logout);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatepassword);

module.exports = router;
