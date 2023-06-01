const {responseCreator} = require ('../utils/utils');
const Order = require ('../schemas/order.schema');


async function createOrder (req, res ) {

   try {

    const body = req.body;

    const data = new Order(body);

    const newOrder = await data.save()


     responseCreator(res, 200, 'Orden creada correctamente', {newOrder});

   } catch (error) {
   console.log(error);
   return responseCreator(res, 500,'No se pudo crear la orden')
   }

    
}

async function getOrders (req, res) {

    try {

        const orders = await Order.find().populate('userId', {fullName: 1, email: 1}).populate
         ('products.productId',{name: 1, description: 1, image: 1});

        if(!orders) {
           return responseCreator(res, 404, 'No se encontraron ordenes');
        }

        return responseCreator(res, 200, ' Ordenes obtenidas correctamente', {orders});



    } catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'No se pudieron obtener ordenes' )
    }
}

async function getOrderByID (req, res) {

    try {

        const id = req.params.id;
        const orders = await Order.find().populate('userId', {fullName: 1, email: 1}).populate
         ('products.productId',{name: 1, description: 1, image: 1});

        if(!orders) {
            return responseCreator(res, 404, 'No se encontraron ordenes');
         }
        responseCreator(res ,200, 'Orden obtenida correctamente', {orders} );
   
    } catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'No se pudo obtener el ID' )
    }


    
}

async function updateOrder (req, res) {
    responseCreator(res, 200, 'Orden actualizada correctamente' );
}

async function deleteOrder (req, res) {
    responseCreator(res, 200, 'Orden eliminada correctamente' );
}

async function getUserOrders (req, res) {

    const userID = req.params.id;

    const userOrders = await Order.find({userId: userID}).populate('userId', {fullName: 1, email: 1}).populate
    ('products.productId',{name: 1, description: 1, image: 1});

    responseCreator(res, 200, `Ordenes del usuario ${userOrders[0].userId.fullName} obtenidas correctamente`, { userOrders} );
}








module.exports = {
    createOrder,
    getOrders,
    getOrderByID,
    updateOrder,
    deleteOrder,
    getUserOrders
}