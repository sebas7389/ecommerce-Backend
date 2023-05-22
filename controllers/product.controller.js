const Product = require ('./../schemas/product.schema')


const getAllProducts = (req, res) => {

    Product.find().then(function(productos){

        res.status(200).send({
            msg: `Productos solicitados correctamente`,
            productos: productos
    });

    }). catch((error) => {
        console.log
    })

}

    function deleteProduct (req, res) {
        res.status(200).send(`Producto borrado correctamente!!!`)
    }
 

    module.exports = {
        getAllProducts,
        deleteProduct
    }    