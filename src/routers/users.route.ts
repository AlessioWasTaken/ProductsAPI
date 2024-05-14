import express from 'express';
import { deleteUserController, editUserController, editUserPasswordController, getAllUsersController, getUserController } from '../controller/users.controller';
import { isAuthenticated } from '../middleware';

export const usersRoute = async (router: express.Router) => {
    router.get('/v1/users', isAuthenticated, getAllUsersController);
    router.get('/v1/users/:userID', isAuthenticated, getUserController);
    router.delete('/v1/users/delete/:userID', isAuthenticated, deleteUserController);
    router.post('/v1/users/edit', isAuthenticated, editUserController);
    router.post('/v1/users/passwordChange', isAuthenticated, editUserPasswordController);
}