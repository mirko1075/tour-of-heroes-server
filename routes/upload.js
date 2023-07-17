const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // Destination folder for saving the images
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const extname = path.extname(file.originalname)
      cb(null, 'img-' + uniqueSuffix + extname) // Unique filename for each uploaded image
    },
  }),
})
module.exports = (params) => {
  router.post('/', upload.single('image'), (req, res) => {
    const imageName = req.file.filename
    console.log('imageName', imageName)
    res.status(200).json({ imageName })
  })
  return router
}
