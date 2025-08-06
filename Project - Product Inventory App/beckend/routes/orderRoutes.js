const express = require('express')
const router = express.Router()
const Controller = require('../controllers/orderController');
const { authorize: auth, roleAuthorise: role } = require('../middleware/auth');
const { create, getAll } = require('../controllers/productController');
const { route } = require('./userRoutes');


router.use(auth)

router.post('/',auth, Controller.create)
router.get('/', role(['admin']) ,Controller.getAll)

router.get('/my', Controller.getUserOrder)
router.put('/:id', Controller.updateStatus)

router.delete('/:id', Controller.delete)


module.exports = router