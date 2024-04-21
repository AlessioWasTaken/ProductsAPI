import express from 'express';
import { merge } from 'lodash';
import { getUserBySessionToken } from '../db/authentication.db';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { sessionToken } = req.cookies;

    if(!sessionToken) {
        return res.status(200).json({'message': 'Sorry but you need to be logged for access to this section', 'status': 'ko'});
    }

    const user = await getUserBySessionToken(sessionToken);

    if(!user) {
        return res.status(200).json({'message': 'Unauthorized or Token invalid', 'status': 'ko'});
    }

    merge(req, { user });
    next();
};

// Impotetico middle ware che controlla se sei admin e ti fa fare certe azioni come rimuovere prodotti o modificarli
// Pero bisogna implementare il ruolo nel DB e in caso unare un enum tipo Role.Admin,Root,User,Manager ...
