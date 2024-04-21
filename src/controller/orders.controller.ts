import express from 'express';
import { createOrder } from '../db/order.db';
import { Orders } from '../db/rowData.db';
import { generateUniqueCode } from '../helpers/codes';

export const createOrderController = async (req: express.Request, res: express.Response) => {
    const { user, product, qta } = req.body;

    if (!user || !product || !qta) {
        return res.json({message: 'Missing params', status: 'ko'});
    }    

    const orderCode = await generateUniqueCode();
    console.log(orderCode)

    const statusOrder = await createOrder(orderCode, user, product, qta);

    if(statusOrder.affectedRows === 0){
        return res.json({error: 'Order not added prossibile query error', status: 'ko'});
    }

    res.status(200).json({message: 'Order added succesfuly', status: 'ok'});
};