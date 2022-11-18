const express = require('express')

const router = express.Router();

router.get('/:name', (req, res) => {
    console.log(req.params)
    const {name} = req.params
    if (name) return res.status(200).send(`welcome ${name}`)
    res.status(401).send('please provide credentials')

})

module.exports = router;