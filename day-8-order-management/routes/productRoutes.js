const express = require('express')
const router = express.Router()
const { authorize: auth, roleAuthorise: role } = require('../middleware/auth');
const Controller = require('../controllers/productController');

// POST /api/products (Admin only) 
// GET /api/products (All products) 
// GET /api/products/:id 
// PUT /api/products/:id 
// DELETE /api/products/:id

router.use(auth)

router.post('/', role(['admin']), Controller.create)
router.get('/', Controller.getAll)
router.get('/:id', Controller.byId)
router.put('/:id', role(['admin']), Controller.update)
router.delete('/:id', role(['admin']), Controller.delete)
router.delete('/', role(['admin']), Controller.deleteAll)

module.exports = router