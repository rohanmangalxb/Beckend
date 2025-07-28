const controller = require('../controllers/productController')
const express = require('express')
const router = express.Router()

router.get('/va', ()=>{
    console.log('done')
} )

router.post('/', controller.addProd) //
router.get('/', controller.getProd) // added pagination with this
router.get('/category', controller.filterByCateg) //
router.get('/price', controller.filterByPrice) //
router.get('/search', controller.Search) //
router.get('/sortPrice', controller.SortByPrice) 
router.get('/sortTime', controller.SortByTime)
router.delete('/', controller.delAll)

module.exports =  router