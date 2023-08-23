const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for your question'],
    minlength: 3
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for your question']
  },
  tag: {
    type: Array
  }
}, { timestamps: true })

module.exports = mongoose.model('Question', questionSchema)
