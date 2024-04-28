import express from 'express';
import { uploadImageFromBase64Controller } from '../controller/products.controller';
import { isLoggedController } from '../controller/tools.controller';
import { isAuthenticated } from '../middleware';
export const toolsRoute = (router: express.Router) => {
    router.post('/v1/tools/upload/getImageUUID', isAuthenticated, uploadImageFromBase64Controller);
    router.get('/v1/tools/isLogged', isLoggedController);
}