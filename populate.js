require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const data = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('DB connected!')
    await Product.deleteMany()
    console.log('DB cleared')
    await Product.create(data)
    console.log('DB populated')
  } catch (error) {
    console.log(error)
  }
}

start()

console.log('test')
