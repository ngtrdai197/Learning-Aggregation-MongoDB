const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: String,
  description: String,
})

module.exports = model('category', categorySchema, 'category')
