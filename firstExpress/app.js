const express = require('express')
const path = require('path');
let { products, people } = require('./data');
const app = express();
const logger = require('./logger')
const authorize = require('./authorize')


app.use(express.static('./public'))

//everything will use logger
// app.use(logger)
//only api routes will use logger
// app.use('/api', logger)

// app.use([authorize, logger])


//routing

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), './index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(process.cwd(), './public/about.html'))
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id,item,image} = product;
        return {id, item, image}
    })
    res.json(newProducts)
    // res.json(products)
})

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

//  getting a single product route parametars
app.get('/api/products/:productId', (req, res) => {
    // console.log(req)
    // console.log("!!!", req.params.productId)
    const {productId} = req.params;
    const singleProduct = products.find((product) => product.id === Number(productId))
    if(!singleProduct) return res.status(404).sendFile(path.join(process.cwd(), './public/error.html'))
    res.json(singleProduct)
})

// Query Params
app.get('/api/v1/query', (req, res) => {

    const {search, limit} = req.query;
    let sortedProducts = [...products]

    if(search) sortedProducts = sortedProducts.filter((product) => product.item.startsWith(search))
    if(limit) sortedProducts = sortedProducts.slice(0, Number(limit))

    if(sortedProducts.length < 1) res.status(200).json({success: true, data: []})

    res.status(200).json(sortedProducts)
})


app.listen(5001, () => {
    console.log('server is listening at 5001')
})