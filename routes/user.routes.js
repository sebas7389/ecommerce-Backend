const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/user.controller')
const jwtVerify = require ('../middlewares/jwtVerify')
const isAdmin = require ('../middlewares/isAdmin')

//POST - Crear usuario
router.post('/users', userController.postUser);
//GET - Leer usuario
router.get('/users/:id',jwtVerify, userController.getUser);



//GET - Leer usuarios
router.get('/users', jwtVerify, userController.getAllUsers);


// POST - Login
router.post('/login', userController.login);


//DELETE - Borrar usuarios
router.get('/users', jwtVerify, userController.getAllUsers);



router.delete('/users/:id', [jwtVerify, isAdmin], userController.deleteUser);

//PUT - Actualizar usuarios
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id/password', userController.updatePassword);


module.exports = router;