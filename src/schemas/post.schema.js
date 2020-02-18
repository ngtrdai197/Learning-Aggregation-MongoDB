const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
  postName: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
})

module.exports = mongoose.model('post', postModel, 'post')
