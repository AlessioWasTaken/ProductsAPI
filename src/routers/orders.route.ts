import express from 'express';
import { completeOrderController, createOrderController, deleteOrderController, getAllActiveOrdersController, getAllOrdersController, getOrderController, updateOrderController } from '../controller/orders.controller';
import { isAuthenticated } from '../middleware';

export const ordersRoute = (router: express.Router) => {
    router.get('/v1/orders', isAuthenticated, getAllOrdersController);
    router.get('/v1/orders/:orderID', isAuthenticated, getOrderController);
    router.post('/v1/orders/create', isAuthenticated, createOrderController);
    router.delete('/v1/orders/delete/:orderID', isAuthenticated, deleteOrderController);
    router.patch('/v1/orders/update/:orderID', isAuthenticated, updateOrderController);
    router.get('/v1/ordersActive', isAuthenticated, getAllActiveOrdersController);
    router.post('/v1/orders/complete/:orderID', isAuthenticated, completeOrderController);
}; 