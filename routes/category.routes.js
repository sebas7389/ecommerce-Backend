const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')


//obtener todas las categorias
router.get("/category",categoryController.getCategorys)

//obtener un categoria por su id
router.get("/category/:id",categoryController.getCategory)

//agregar un categoria
router.post("/category",categoryController.addCategory)

//Borrar un categoria
router.delete("/category/:id",categoryController.deleteCategory)

//actualizar una categoria
router.put("/category/",categoryController.updateCategory)

module.exports = router