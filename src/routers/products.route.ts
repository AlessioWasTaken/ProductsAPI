import express from 'express';
import { addProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from '../controller/products.controller';
import { isAuthenticated } from '../middleware';

export const productsRoute = (router: express.Router) => {
    router.get('/v1/products', isAuthenticated, getAllProductsController);
    router.get('/v1/products/:productId', isAuthenticated, getProductController);
    router.post('/v1/products/add', isAuthenticated, addProductController);
    router.delete('/v1/products/delete/:productId', isAuthenticated, deleteProductController);
    router.post('/v1/products/update/:productId', isAuthenticated, updateProductController);
};