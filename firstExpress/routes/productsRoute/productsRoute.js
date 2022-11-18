const express = require('express')
const router = express.Router();

const {
    getProducts,
    getSingleProduct
} = require('../../controllers/productsController')

router.route('/').get(getProducts)
router.route('/:productId').get(getSingleProduct)

module.exports = router