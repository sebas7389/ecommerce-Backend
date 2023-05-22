const express = require ('express');
const router = express.Router();
const productController = require ('./../controllers/product.controller');

//Obtener productos
router.get("/products",productController.getAllProducts);


// Ruta para obtener un producto especifico/ o por categoria
// Añadir un producto
// Eliminar un producto
router.delete("/products", productController.deleteProduct)
// Modificar

module.exports = router;