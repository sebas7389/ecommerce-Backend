const express = require ('express');
const router = express.Router();
const productController = require ('./../controllers/product.controller');
const uploadController = require('../controllers/upload.controller')

//Obtener todos los productos
router.get("/products",productController.getAllProducts);

//Obtener un producto especifico
router.get('/product/:id',productController.getProduct);

// Añadir un producto
router.post("/product",uploadController.uploadProduct,productController.addProduct);


// Eliminar un producto
router.delete("/product/:id", productController.deleteProduct);
// Modificar
router.put('/product', productController.updateProduct)



module.exports = router;