const controller = require('../controllers/productController')
const express = require('express')
const router = express.Router()



router.get('/va', () => {
    console.log('done')
})

router.post('/', controller.addProducts)
router.get('/', controller.products)
router.delete('/', controller.delete)

module.exports = router