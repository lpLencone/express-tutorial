const express = require('express')
const app = express()
const { products, people } = require('./data')

const reducedProducts = products.map(product => {
  const { id, name, image } = product
  return { id, name, image }
})

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
  const { search, limit } = req.query
  let sortedProducts = [...reducedProducts]

  // if user provided the 'search' paramenter, find which products start with the search value
  if (search) {
    sortedProducts = sortedProducts.filter(product => {
      // return the product if it starts with the value of the 'search' query
      return product.name.startsWith(search)
    })
  }
  // if user provided a limit to how many items should be displayed, limit it
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  // if length equals zero, display all products
  if (!sortedProducts.length) {
    res.json({
      Attention: 'No product matches your query',
      Products: products
    })
  }

  // if no response was sent to the server yet, send this
  if (!res.headersSent) {
    res.status(200).json(sortedProducts)
  }
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
