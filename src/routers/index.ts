import express from 'express';
import authenticationRoute from './authentication.route';
import { productsRoute } from './products.route';
import { ordersRoute } from './orders.route';
import { toolsRoute } from './tools.route';
import { usersRoute } from './users.route';

const router = express.Router();



export default () => {
    authenticationRoute(router);
    productsRoute(router);
    ordersRoute(router);
    usersRoute(router);
    toolsRoute(router);
    return router;
};