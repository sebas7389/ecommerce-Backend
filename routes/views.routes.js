const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller.js');

// La definicion de todas las rutas vistas y sus respectivos controladores
router.get('/',(req, res) => res.render('index'));
router.get('/index',(req,res) => res.render('index'));
router.get('/contact',(req, res) => res.render('contact'));
router.get('/about',(req, res) => res.render('about'));
router.get('/register',(req, res) => res.render('register'));
router.get('/productDetail',(req, res) => res.render('productDetail'));
router.get('/order',(req, res) => res.render('order'));
router.get('/login',(req, res) => res.render('login'));
router.get('/adminProducts',(req, res) => res.render('adminProducts'));
router.get('/adminUser',(req, res) => res.render('adminUser'));




module.exports = router;