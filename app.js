const express = require('express');
const app = express();
const productRoutes = require ('./routes/product.routes')

app.get ('/', (request, response) => {
    response.send({
        msg:`Bienvenido a mi servidor express`,
        ok:true
    })
});

// Definir rutas a usar por mi app express.
app.use(productRoutes)


module.exports = app