const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters']
  },
  content: {
    type: String,
    maxlength: [500, 'Content cannot exceed 500 characters']
  }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
