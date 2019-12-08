const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: String,
  quantity: Number,
  type: String,
  category: String,
  size: {
    width: Number,
    height: Number,
    unit: String,
  },
})

module.exports = model('product', productSchema, 'product')
