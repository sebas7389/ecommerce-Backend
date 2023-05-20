const express = require('express');
const { request } = require('http');
const app = express();
const port = 4000;

app.get ('/', (request, response) => {
    response.send({
        msg:`Bienvenido a mi servidor express`,
        ok:true
    })
})

app.listen(port,() => {
    console.log (`Servidor funcionando en puerto ${port}`);
} )