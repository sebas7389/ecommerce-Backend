require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;
const DB_URL = process.env.MONGODB_CONNECTION;
const mongoose = require('mongoose');

mongoose.connect(DB_URL)
                 .then(() => {
                    console.log(`\x1b[35m Conexion a la MONGODB satisfactoria \x1b[37m`);

                    app.listen(port,() => {
                    console.log (`\x1b[36m Servidor funcionando en puerto ${port} \x1b[37m`);

                    })

                })


                .catch((error) => {
                    console.log(error)
                })

