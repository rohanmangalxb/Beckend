const multer = require('multer')
const path = require('path');
//storage:
const st = multer.diskStorage({
    destination: (req, file, cb) => { //cb -- callback
        cb(null, "uploads")
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}_${Math.round(Math.random())}${ext}`)
    }
})

// for filetype
const uploadFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (file.mimetype.startsWith('image/') && ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        cb(null, true);
    } else if (file) {
        cb(new Error("Only png/jpg/jpeg files allowed"), false)
    }
}

// setting up upload
exports.imgUpload = multer({
    storage: st,
    fileFilter: uploadFilter,
    limits: { fileSize: 1 * 1024 * 1024 } //for 1mb
})