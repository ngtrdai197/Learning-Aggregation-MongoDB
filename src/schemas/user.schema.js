const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
  username: String,
  fullName: String,
})

module.exports = mongoose.model('user', userModel, 'user')
