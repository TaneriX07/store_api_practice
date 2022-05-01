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
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()

console.log('test')
