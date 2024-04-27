import express from 'express';
import { uploadImageFromBase64Controller } from '../controller/products.controller';
export const toolsRoute = (router: express.Router) => {
    router.post('/v1/tools/upload/getImageUUID', uploadImageFromBase64Controller);
}