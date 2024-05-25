import express from 'express';
import { getUserBySessionToken } from '../db/authentication.db';
import { resolve } from 'path';

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

export const getImgController = async (req: express.Request, res: express.Response) => {
    const { imgID } = req.params;
    const path = resolve(__dirname, `../../public/${imgID}`)
    res.sendFile(path, (err) => {
        throw new Error(`Error 10: ${err}`);
    });
}