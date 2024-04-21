import express from 'express';
import { loginController, registerController } from '../controller/authentication.controller';

export default (router: express.Router) => {
    //Version 1
    router.post('/v1/auth/login', loginController);
    router.post('/v1/auth/register', registerController);

    //Version ...
};