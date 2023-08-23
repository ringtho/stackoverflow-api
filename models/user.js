const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: ['Please provide your password'],
    minlength: 6
  }
})

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET,
    { expiresIn: '30d' })
}

module.exports = mongoose.model('User', userSchema)
