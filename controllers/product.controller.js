const Product = require ('./../schemas/product.schema');
const {responseCreator} = require ('../utils/utils');



const getAllProducts = async (req, res) => {

   const productos = await Product.find().then(function(productos){

    const total = productos.length
    
        return responseCreator(res,200, 'Productos obtenidos correctamente', {productos, total});
    //     res.status(200).send({
    //         msg: `Productos solicitados correctamente`,
    //         productos: productos
    // });


    }). catch((error) => {
        console.log(error)
    })

}




function addProduct (req, res) {

      const product = new Product(req.body);


     product.save()
            .then(function(product) {

            return res.status(200).send({
                msg:`Producto guardado correctamente`,
                product
            })

        })
        .catch(error => {

            console.log(error);
            res.status(500).send(`EL producto no se pudo guardar`)
        })

    }



function deleteProduct (req, res) {

    const id = req.params.id;

    Product.findByIdAndDelete(id).then((deleted) =>{

            if(!deleted) {
                return res.status(404).send({
                    msg:`No se encontro el producto a borrar`
            })
    }

            return res.status(200).send({
                msg: `Producto borrado correctamente`,
                deleted
            })

        })
        .catch(error =>{
            console.log(error)
            return res.status(500).send({
                msg:`Error al borrar el producto`,
                deleted
            })

            
        })

    }
 

async function getProduct(req, res) {

        console.log('iamado')
        try {
            const Product = await Product.findById(req.params.id);
    
            // if(!product) return res.status(404).send({
            //     msg: `No se encontro el producto`,
            //     ok: false
            // });
    
            return res.status(200).send({
                msg: `Producto encontrado`,
                ok: true,
                product
            });
    
        } catch (error) {
            console.log(error);
            res.status(400).send({
                msg: `Error al obtener productos`,
                ok: false
            })
        }
    }


async function updateProduct(req, res) {
    try {


    const id = req.query.id;
    const data = req.body


        const newProduct= await Product.findByIdAndUpdate(id,data,{new: true})
        
        if(!newProduct) {
            return res.status(404).send({

                msg:`El producto no se actualizo`
            })
        }
        // .then ((productUpdated) => {
    //     console.log(data);
        return res.status(200).send ({
            msg:`Producto actualizado`,
            productUpdated: newProduct
        })
    // })
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                msg:`No se pudo actualizar el producto`
            })
        }

}










    module.exports = {
        getAllProducts,
        deleteProduct,
        addProduct,
        getProduct,
        updateProduct
    }    