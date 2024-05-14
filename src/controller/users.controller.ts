import express from 'express';
import { deleteUserByID, editUserByID, editUserPassword, getAllUsers, getUserByID, getUserSalt } from '../db/users.db';
import { authenticate } from '../helpers/crypto';

export const getAllUsersController = async (req: express.Request, res: express.Response) => {
    const users = await getAllUsers();

    if(users.length == 0){
        return res.json({error: 'Users not found', status: 'ko'});
    }

    res.status(200).json({data: users, status: 'ok'});
}

export const getUserController = async (req: express.Request, res: express.Response) => {
    const { userID } = req.params;

    if(!userID) {
        return res.json({error: 'User id not found', status: 'ko'});
    }

    const user = await getUserByID(userID);

    if(!user){
        return res.json({message: 'User not exist', status: 'ko'});
    }

    res.status(200).json({data: user, status: 'ok'});
}

export const deleteUserController = async (req: express.Request, res: express.Response) => {
    const { userID } = req.params;

    if(!userID){
        return res.json({error: 'User id not found', status: 'ko'});
    }

    const userStatus = await deleteUserByID(userID);

    if(userStatus.affectedRows == 0){
        return res.json({error: 'Error on delteing process', status: 'ko'});
    }

    res.status(200).json({success: true, status: 'ok'});
}

export const editUserController = async (req: express.Request, res: express.Response) => {
    const { userID, name, surname, email, password } = req.body;

    if(!userID || !name || !surname || !email || !password){
        return res.json({error: 'params missing', status: 'ko'});
    }

    const userSalt = await getUserSalt(userID);

    if(!userSalt){
        return res.json({error: 'salt not found', status: 'ko'});
    }

    const hashedPassword = authenticate(password, userSalt);

    const userEditStatus = await editUserByID(userID, name, surname, email, hashedPassword);

    if(userEditStatus.affectedRows == 0){
        return res.json({error: 'Erro on edit user', status: 'ko'});
    }

    res.status(200).json({success: true, status: 'ok'});
}

export const editUserPasswordController = async (req: express.Request, res: express.Response) => {
    const { userID, password } = req.body;

    if(!userID || !password){
        return res.json({error: 'Params missgin', status: 'ko'});
    }

    const userSalt = await getUserSalt(userID);

    if(!userSalt){
        return res.json({error: 'salt not found', status: 'ko'});
    }

    const hashedPassword = authenticate(password, userSalt);

    const userPasswordStatus = await editUserPassword(userID, hashedPassword);

    if(userPasswordStatus.affectedRows == 0){
        return res.json({error: "Error on password change", status: 'ko'});
    }
    
    res.status(200).json({success: true, status: 'ok'});
}