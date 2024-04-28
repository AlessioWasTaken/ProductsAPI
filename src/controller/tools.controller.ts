import express from 'express';
import { getUserBySessionToken } from '../db/authentication.db';

export const isLoggedController = async (req: express.Request, res: express.Response) => {
    const { sessionToken } = req.cookies;

    if(!sessionToken) {
        return res.status(200).json({message: 'session token missing', isLogged: false});
    }

    const user = await getUserBySessionToken(sessionToken);

    if(!user) {
        return res.status(200).json({isLogged: false});
    }

    res.json({isLogged: true})
}