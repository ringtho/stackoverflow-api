const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  comment: {
    type: String,
    required: ['Please provide a comment to the answer'],
    minlength: 3
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Login to continue']
  },
  answerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Answer',
    required: [true, 'Please select an answer to provide a comment']
  }

}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)
