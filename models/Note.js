const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	text: {
		type: String,
		required: true,
	},

	link: {
		type: String,
		default: "",
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = new mongoose.model("Note", NoteSchema);
