const mongoose = require('mongoose')

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb://localhost:27017/LearningAggregation',
      { useUnifiedTopology: true, useNewUrlParser: true },
    )
    if (connect) {
      console.log(`MongoDB is connected ...`)
    }
  } catch (error) {
    throw error
  }
}

module.exports = { connectDatabase }
