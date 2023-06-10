const res = require('express/lib/response');
const Product = require('../schemas/product.schema')
const {responseCreator} = require('../utils/utils')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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


async function addProduct (req, res) {

    console.log(req.body);
    console.log(req.file);
    //Lo asigno yo al generar el nombre de la imagen uuid
     try {

      const product = new Product(req.body);

      await product.save();

      return res.status(200).send({
                ok: true,
                msg:`Producto guardado correctamente`,
                product
            })

    } catch(error) {
    return res.status(500).send ({
        ok: false,
        msg: `No se agrego el producto`,
        error
        })
    }
}



async function deleteProduct (req, res) {

    try {
        const id = req.params.id;
        
    

  const deleteProduct = await Product.findByIdAndDelete(id)

            if(!deleteProduct) {
                return res.status(404).send({
                    msg:`No se encontro el producto a borrar`
            })
        }
            return res.status(200).send({
                msg: `Producto borrado correctamente`,
                deleteProduct
            })

        }catch(error) {
            return res.status(500).send({
                msg:`Error al borrar el producto`,
            })        
        }

    }
 

async function getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            return res.status(200).send({
                msg: `Producto encontrado`,
                ok: true,
                product
            });
            
        } catch (error) {
        console.log(error);
         return responseCreator(res, 400, `Error al obtener productos` )
        }
    }


async function updateProduct(req, res) {
    try {


    const id = req.params.id;
    const data = req.body
        console.log("INGRESAMOS AL UPDATE")
        console.log(id, "id")
        console.log(data,"data")
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