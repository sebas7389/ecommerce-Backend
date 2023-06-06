const express = require('express');
const app = express();
const productRoutes = require ('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require ('./routes/order.routes');
const categoryRouter = require ('./routes/category.routes');
const uploadRouter = require ('./routes/upload.routes');
const viewsRoutes = require('./routes/views.routes');
const cors = require ('cors');

//Cargar configuracion de plantillas de javascript
app.set('view engine' , 'ejs')
app.use(express.static("public"));
//Middlewares
app.use(express.json())
//Evitar cors error
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(viewsRoutes)

// Definir rutas a usar por mi app express.
app.use ('/api',[

productRoutes,
userRoutes,
orderRoutes,
categoryRouter,
uploadRouter,
])


module.exports = app