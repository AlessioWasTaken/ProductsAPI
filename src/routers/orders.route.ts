import express from 'express';
import { createOrderController } from '../controller/orders.controller';
import { isAuthenticated } from '../middleware';

export const ordersRoute = (router: express.Router) => {
    router.use(isAuthenticated);
    router.post('/v1/orders/create', createOrderController);
}; 