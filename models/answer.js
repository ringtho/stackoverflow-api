const mongoose = require('mongoose')
const { Schema } = mongoose

const answerSchema = new Schema({
  answer: {
    type: String,
    required: [true, 'Please provide an answer to the question'],
    minlength: 5
  },
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Login to continue']
  },
  questionAuthor: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Login to continue']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Login to continue']
  },
  preferred: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Answer', answerSchema)
