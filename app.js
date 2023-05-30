const express = require('express');
const app = express();
const productRoutes = require ('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cors = require ('cors');


//Middlewares
app.use(express.json())
//Evitar cors error
app.use(cors());

// Definir rutas a usar por mi app express.
app.use ('/api',[

productRoutes,
userRoutes

])


module.exports = app