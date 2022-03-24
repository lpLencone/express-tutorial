const express = require('express')
const app = express()
const { products, people } = require('./data')

const newProducts = products.map(product => {
  const { id, name, image } = product
  return { id, name, image }
})

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
  res.json(newProducts)
})

app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params
  const singleProduct = products.find(
    product => product.id === Number(productId)
  )
  if (!singleProduct) {
    return res.status(404).send("Product doesn't exist")
  }
  res.json(singleProduct)
})

app.listen(5000, () => {
  console.log('server running on port: 5000')
})
