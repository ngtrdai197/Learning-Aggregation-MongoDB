const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  productName: String,
  quantity: Number,
})

module.exports = model('product', productSchema, 'product')
