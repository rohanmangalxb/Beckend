const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware');

const {imgUpload} = require('../middlewares/uploadMiddleware')

const { createP, getAll, getProdById, updateProd, deleteAllProd, deleteProd, upImage } = require('../controllers/productController')




router.use(auth)

// router.post('/upload',imgUpload.single('sample'), upImage)
router.get('/', getAll)
.get('/:id', getProdById)
.post('/', createP)
.put('/:id', updateProd)
.put('/:id/uploads', imgUpload.single('sample'), upImage)
.delete('/', deleteAllProd)
.delete('/:id', deleteProd)

module.exports = router