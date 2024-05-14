import express from 'express';
import { completeOrderById, createOrder, deleteOrderById, getAllActiveOrders, getAllOrders, getOrderById, updateOrder } from '../db/order.db';
import { Orders } from '../db/rowData.db';
import { generateUniqueCode } from '../helpers/codes';
import { setStockProduct } from '../db/products.db';

export const createOrderController = async (req: express.Request, res: express.Response) => {
    const { user, product, qta, status, date } = req.body;

    if (!user || !product || !qta || !status || !date) {
        return res.json({message: 'Missing params', status: 'ko'});
    }

    if(new Date(date) == undefined){
        return res.json({message: 'Date invalid', status: 'ko'});
    }

    const statusOfsetStock = await setStockProduct(product, qta);

    if(statusOfsetStock.affectedRows == 0){
        return res.json({message: 'Error updating current stock', status: 'ko'});
    }

    const orderCode = await generateUniqueCode();

    const statusOrder = await createOrder(orderCode, user, product, qta, status, date);

    if(statusOrder.affectedRows === 0){
        return res.json({error: 'Order not added prossibile query error', status: 'ko'});
    }

    res.status(200).json({message: 'Order added succesfuly', status: 'ok'});
};

export const deleteOrderController = async (req: express.Request, res: express.Response) => {
    const { orderID } = req.params;

    if(!orderID){
        return res.json({error: "Order ID not found", status: "ko"});
    }

    const order = await deleteOrderById(orderID);

    if (order.affectedRows > 0){
        return res.status(200).json({message: "Order deleted succesfuly", status: "ok"});
    }else{
        return res.json({error: "Error on deleting order", status: "ko"});
    }
}

export const getAllOrdersController = async (req: express.Request, res: express.Response) => {
    const orders = await getAllOrders();

    if(!orders){
        return res.status(200).json({error: "Orders not found", status: "ko"});
    }

    res.status(200).json({data: orders, status: "ok"});
}
export const getOrderController = async (req: express.Request, res: express.Response) => {
    const { orderID } = req.params;

    if(!orderID){
        return res.status(200).json({error: 'Order ID missed', status: 'ko'});
    }

    const order = await getOrderById(orderID);

    if(!order) {
        return res.json({error: 'order not found', status: 'ko'});
    }

    res.status(200).json({data: order, status: 'ok'});
}

export const updateOrderController = async (req: express.Request, res: express.Response) => {
    const { orderID } = req.params;
    const { user, product, qta, status, date } = req.body;

    if(!orderID){
        return res.json({error: 'Order ID missing', status: 'ko'});
    }

    if (!user || !product || !qta || !status || !date) {
        return res.json({error: 'missing body param', status: 'ko'});
    }

    if(new Date(date) == undefined){
        return res.json({message: 'Date invalid', status: 'ko'});
    }

    const orderStatus = await updateOrder(orderID, user, product, qta, status, date);

    if(orderStatus.affectedRows > 0){
        return res.status(200).json({message: 'Orderd updated succesfuly', status: 'ok'});
    }else{
        return res.json({error: 'Error update is not done, possibily error', status: 'ko'});
    }
}


export const getAllActiveOrdersController = async (req: express.Request, res: express.Response) => {
    const orders = await getAllActiveOrders();

    if(!orders){
        return res.status(200).json({error: "Orders not found", status: "ko"});
    }

    res.status(200).json({data: orders, status: "ok"});
}

export const completeOrderController = async (req: express.Request, res: express.Response) => {
    const { orderID } = req.params;

    if(!orderID){
        return res.json({message: 'Param missing', status: 'ko'});
    }

    const statusCompleteOrder = await completeOrderById(orderID);

    if(statusCompleteOrder.affectedRows == 0){
        return res.json({message: 'Error on complete order', status: 'ko'});
    }

    res.status(200).json({message: 'Order completed successfuly', status: 'ok'});
}

