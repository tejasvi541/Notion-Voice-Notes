const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Note = require("../models/Note");

// ===================================== Post Note ========================================//

// @desc        Post Node
// @route       POST /api/v1/auth/postNote
// @access      Public

exports.postNote = asyncHandler(async (req, res, next) => {
	const { text, link } = req.body;
	const user = await User.findById(req.user.id).select("-password");
	// Create user
	const note = await Note.create({
		user,
		text,
		link,
	});

	res.status(200).json({
		success: true,
		data: note,
	});
});
