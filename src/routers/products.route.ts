import express from 'express';
import { addProductController, deleteProductController, getAllProductsController, getProductController } from '../controller/products.controller';
import { isAuthenticated } from '../middleware';

export const productsRoute = (router: express.Router) => {
    router.use(isAuthenticated);
    router.get('/v1/products', getAllProductsController);
    router.get('/v1/products/:productId', getProductController);
    router.post('/v1/products/add', addProductController);
    router.delete('/v1/products/del/:productId', deleteProductController);
};