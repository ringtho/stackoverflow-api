const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema(
  {
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
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Login to continue']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

questionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'questionId',
  justOne: false
})

questionSchema.virtual('posted_by', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

module.exports = mongoose.model('Question', questionSchema)
