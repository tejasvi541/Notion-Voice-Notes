const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Note = require('../models/Note');
const mongoose = require('mongoose');

// ===================================== Post Note ========================================//

// @desc        Post Note
// @route       POST /api/v1/note/postNote
// @access      Private

exports.postNote = asyncHandler(async (req, res, next) => {
  const { text, link } = req.body;
  const user = await User.findById(req.user.id).select('-password');
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

// ===================================== Get Notes ========================================//

// @desc        Get Notes
// @route       GET /api/v1/note/getNotes
// @access      Private

exports.getNotes = asyncHandler(async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ date: -1 });

    if (!notes) {
      res.status(404).json({ msg: 'Note not found' });
    }
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Notes not found' });
    }

    res.status(500).send('Server Error');
  }
});

// ===================================== Get Note ========================================//

// @desc        Get Note by ID
// @route       GET /api/v1/note/getNote/:id
// @access      Private

exports.getNote = asyncHandler(async (req, res, next) => {
  try {
    const note = await Note.find({
      user: mongoose.Types.ObjectId(req.params.id),
    });
    if (!note) {
      res.status(404).json({ msg: 'Note not found' });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Note not found' });
    }

    res.status(500).send('Server Error');
  }
});

//==================================== Delete Note by id Route =========================//
// @route       DELETE api/deleteNote/:id
// @desc        Delete Note by id
// @access      Private

exports.updateNote = asyncHandler(async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404).json({ msg: 'Note not found' });
    }

    //Check user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }
    await note.remove();

    res.status(200).json({ msg: 'Note Removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Note not found' });
    }

    res.status(500).send('Server Error');
  }
});

//==================================== Update Note by id Route =========================//
// @route       Update api/deleteNote/:id
// @desc        Update Note by id
// @access      Private

exports.deleteNote = asyncHandler(async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404).json({ msg: 'Note not found' });
    }

    //Check user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }

    const { text, link } = req.body;

    note.text = text;
    note.link = link;

    await note.save();

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Note not found' });
    }

    res.status(500).send('Server Error');
  }
});
