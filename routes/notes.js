const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  console.log('dasjhasdasd', req, res)
  try {
    console.log('dasjhasdasd 1111', req, res)
    const { title } = req.query;

    let filter = {};
    if (title) {
      filter.title = new RegExp(title, 'i'); // Case-insensitive match
    }

    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    console.log('dasjhasdasd 2222', req, res)
    res.status(500).json({ message: err.message });
  }
});



// Create new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
