import express from 'express';
import { createOrderController, deleteOrderController, getAllOrdersController, getOrderController, updateOrderController } from '../controller/orders.controller';
import { isAuthenticated } from '../middleware';

export const ordersRoute = (router: express.Router) => {
    router.use(isAuthenticated);
    router.get('/v1/orders', getAllOrdersController);
    router.get('/v1/orders/:orderID', getOrderController);
    router.post('/v1/orders/create', createOrderController);
    router.delete('/v1/orders/delete/:orderID', deleteOrderController);
    router.patch('/v1/orders/update/:orderID', updateOrderController);
}; 