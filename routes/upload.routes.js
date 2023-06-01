const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')


//Cargar imagen del producto
router.post("/product/upload/image",uploadController.uploadProduct)


module.exports = router