import express from 'express';
import { completeOrderById, createOrder, deleteOrderById, getAllActiveOrders, getAllActiveOrdersByUser, getAllOrders, getOrderById, updateOrder } from '../db/order.db';
import { generateUniqueCode } from '../helpers/codes';
import { getStockByID, setStockProduct } from '../db/products.db';
import { RequestWithUser } from '../types/requestWithUser.type';

export const createOrderController = async (req: RequestWithUser, res: express.Response) => {
    const { user, product, qta, status, date } = req.body;

    if (!product || !qta || !status || !date) {
        return res.json({message: 'Missing params', status: 'ko'});
    }

    if(isNaN(new Date(date).getTime())){
        return res.json({message: 'Date invalid', status: 'ko'});
    }

    if(status !== 'false' && status !== 'true'){
        return res.json({message: 'Status invalid', status: 'ko'});
    }

    const newStock = await getStockByID(product) - qta;

    const statusOfsetStock = await setStockProduct(product, newStock);

    if(statusOfsetStock.affectedRows == 0){
        return res.json({message: 'Error updating current stock', status: 'ko'});
    }

    const orderCode = await generateUniqueCode();

    const statusOrder = await createOrder(orderCode, !user ? req.user.userId : user, product, qta, status, date);

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

    if(isNaN(new Date(date).getTime())){
        return res.json({message: 'Date invalid', status: 'ko'});
    }

    if(status !== 'false' && status !== 'true'){
        return res.json({message: 'Status invalid', status: 'ko'});
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

export const getOrderByCurrentUser = async (req: RequestWithUser, res: express.Response) => {
    const orders = await getAllActiveOrdersByUser(req.user.userId);

    if(!orders){
        return res.json({message: 'Order not found', status: 'ok'});
    }

    res.status(200).json({data: orders, status: 'ok'});
}