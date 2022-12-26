const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
  })
}

module.exports = connectDB
