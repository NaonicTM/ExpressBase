let { products } = require('../data');

const getProducts = (req, res) => {
    const newProducts = products.map((product) => {
        const {id,item,image} = product;
        return {id, item, image}
    })
    res.json(newProducts)
    // res.json(products)
}

const getSingleProduct = (req, res) => {
    // console.log(req)
    // console.log("!!!", req.params.productId)
    const {productId} = req.params;
    const singleProduct = products.find((product) => product.id === Number(productId))
    if(!singleProduct) return res.status(404).sendFile(path.join(process.cwd(), './public/error.html'))
    res.json(singleProduct)
}

module.exports = {
    getProducts,
    getSingleProduct
}