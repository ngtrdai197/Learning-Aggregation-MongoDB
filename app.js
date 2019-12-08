const express = require('express')
const { connectDatabase } = require('./src/common/connect-db')
const product = require('./src/schemas/product.schema')

const app = express()
connectDatabase()

app.use(express.json())

app.get('/', async (req, res, nex) => {
  const pipeline = [
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
  ]
  // const pipeline = [{ $group: { _id: null, titles: { $push: '$name' } } }]
  const result = await product.aggregate(pipeline)
  return res.status(200).jsonp({ result, statusCode: 200 })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))
