const express = require('express')
const router = express.Router()
const { authorize: auth, roleAuthorise: role } = require('../middleware/auth');
const Controller = require('../controllers/productController');


router.use(auth)

router.post('/', role('admin'), Controller.create)
router.get('/', Controller.getAll)

router.get('/:id', Controller.byId)
router.put('/:id',auth, role('admin'), Controller.update)
router.delete('/:id',auth, role('admin'), Controller.delete)

module.exports = router