const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	text: {
		type: String,
		required: true,
	},

	link: {
		type: String,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = new mongoose.model("Note", NoteSchema);
