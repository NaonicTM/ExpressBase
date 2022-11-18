const express = require('express')
const path = require('path');
let { products, people } = require('./data');
const app = express();
const logger = require('./logger')
const authorize = require('./authorize')


const productsRoute = require('./routes/productsRoute/productsRoute')
app.use('/api/products', productsRoute)
const authRoute = require('./routes/authRoute/auth')
app.use('/login', authRoute)


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

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

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