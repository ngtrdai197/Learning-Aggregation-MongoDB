const express = require('express')
const { connectDatabase } = require('./src/common/connect-db')
const product = require('./src/schemas/product.schema')
const user = require('./src/schemas/user.schema')
const post = require('./src/schemas/post.schema')
const mongoose = require('mongoose')

const app = express()
connectDatabase()

app.use(express.json())

app.get('/test/:userId', async (req, res, next) => {
  const { userId } = req.params
  // await post.insertMany([
  //   {
  //     _id: '5e4beefec0558a75ddb0e80d',
  //     postName: 'Ngrx',
  //     userId: '5e4bee8b44336b754b731558',
  //     productId: '5e4bffb55d72730b328959b4',
  //   },
  //   {
  //     _id: '5e4beefec0558a75ddb0e80e',
  //     postName: 'Vuex',
  //     userId: '5e4bee8b44336b754b73155a',
  //     productId: '5e4bffb55d72730b328959b6',
  //   },
  //   {
  //     _id: '5e4beefec0558a75ddb0e80f',
  //     postName: 'Flutter',
  //     userId: '5e4bee8b44336b754b731558',
  //     productId: '5e4bffb55d72730b328959b5',
  //   },
  //   {
  //     _id: '5e4beefec0558a75ddb0e810',
  //     postName: 'Akita',
  //     userId: '5e4bee8b44336b754b731559',
  //     productId: '5e4bffb55d72730b328959b7',
  //   },
  //   {
  //     _id: '5e4beefec0558a75ddb0e811',
  //     postName: 'Reactjs',
  //     userId: '5e4bee8b44336b754b731558',
  //     productId: '5e4bffb55d72730b328959b8',
  //   },
  // ])
  // res.send('ok')
  const result = await user.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },
    {
      // return list post => _id === post.userId, with field name: posts
      $lookup: {
        from: 'post',
        localField: '_id',
        foreignField: 'userId',
        as: 'posts',
      },
    },
    // { $unwind: '$posts' },
    {
      // add field countPosts with value of array size 'posts' above
      $addFields: {
        countPosts: { $size: '$posts' },
      },
    },
    {
      // select fields
      $project: {
        'posts.postName': 1,
        'posts.userId': 1,
        username: 1,
        fullName: 1,
        countPosts: 1,
      },
    },
  ])
  return res.send(result)
})

app.get('/', async (req, res, nex) => {
  // const pipeline = [{ $group: { _id: null, titles: { $push: '$name' } } }]
  const result = await product.aggregate([
    {
      $lookup: {
        from: 'category',
        localField: 'category', //field của "products"
        foreignField: 'name', //field của category
        as: 'catalogs',
      },
    },
    {
      $match: { catalogs: { $ne: [] } },
    },
    {
      $unwind: '$catalogs', //Phẳng hoá
    },
    {
      $project: { 'catalogs._id': 0, 'catalogs.name': 0 },
    },
  ])
  return res.status(200).jsonp({ result, statusCode: 200 })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))
