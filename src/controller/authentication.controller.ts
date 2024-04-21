import express from 'express';
import { Users } from '../db/rowData.db';
import { createUser, getUserByEmail, updateSessionToken } from '../db/authentication.db';
import { authenticate, random } from '../helpers/crypto';

export const loginController = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({'error': 'email or password missing', 'status': 'ko'});
    }

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return res.json({'error': 'User do not exist', 'status': 'ko'});
    }

    const { salt, userId } = existingUser;
    const expectedHash = existingUser.password;

    const hasedPassword = authenticate(password, salt);

    if(hasedPassword != expectedHash) {
        return res.json({'error': 'Password mismatch', 'status': 'ko'});
    }

    const token = authenticate(random(), userId.toString());

    updateSessionToken(token, email);

    res.cookie('sessionToken', token, {domain: 'localhost', path: '/'});

    res.status(200).json({'message': 'Logged in', 'status': 'ok'});

}

export const registerController = async (req: express.Request, res: express.Response) => {
    const { name, surname, email, password } = req.body;

    if(!name || !surname || !email || !password) {
        return res.json({'error': 'required data is missing', 'status': 'ko'})
    }

    const salt = random();
    const hasedPassword = authenticate(password, salt);

    const existingUser = await getUserByEmail(email);

    if (existingUser){
        return res.json({'error': 'User alredi exist', 'status': 'ko'});
    }

    const newUser = await createUser(name, surname, email, hasedPassword, salt, '');
    
    res.status(200).json(newUser.insertId || newUser.insertId > 0 ? {'message': 'User added succesful', 'status': 'ok'} : {'error': 'Possible error', 'status': 'ko' });
};