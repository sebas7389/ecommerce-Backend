const express = require ('express');
const router = express.Router();
const ordersController = require ('../controllers/order.controller');


//Get all orders
router.get ('/orders', ordersController. getOrders);
//Get order by ID
router.get ('/orders/:id', ordersController. getOrderByID);
//Get user orders
router.get ('/orders/user/:id', ordersController.getUserOrders);
//Create Order
router.post('/orders', ordersController. createOrder);
//Update order
router.put('/orders/:id', ordersController. updateOrder);
//Delete order
router.delete('/orders/:id', ordersController. deleteOrder);


module.exports = router;