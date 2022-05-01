const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true }).sort('-name').limit(2)
  res.status(200).json({ nbHits: products.length, products })
}

const replaceComma = (str) => {
  // In case the user provide multiple sort value e.g "name,-price"
  // We have to change it to "name -price" before passing it the query functions
  return str.replaceAll(/,/g, ' ')
}

const getAllProducts = async (req, res) => {
  // This fix the bug when user provide unnecessary query
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  // logic for the numericFilter system
  if (numericFilters) {
    const operatorMap = {
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
      '>': '$gt',
      '<=': '$gte',
    }

    const regex = /\b(<|<=|=|>|>=)\b/g

    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    )

    // NumericFilters only work on field with Number value
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      console.log(field, operator, value)
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  // logic for the paging system
  // example: if the page is 2, then we skip the first 10 items
  const page = req.query.page || 1 // default page is 1
  const limit = req.query.limit || 10 // default limit is 10
  let skip = (page - 1) * limit

  let products = await Product.find(queryObject)
    .select(fields ? replaceComma(fields) : '')
    .sort(sort ? replaceComma(sort) : 'createdAt')
    .skip(skip)
    .limit(limit)

  res.status(200).json({ nbHits: products.length, products })
}

module.exports = { getAllProducts, getAllProductsStatic }
