const express = require('express')
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const { createP, getAll, getProdById, updateProd, deleteAllProd, deleteProd } = require('../controllers/productController')

router.use(auth)

router.get('/', getAll)
router.get('/:id', getProdById)

router.post('/', createP)

router.put('/:id', updateProd)

router.delete('/', deleteAllProd)
router.delete('/:id', deleteProd)

module.exports = router;