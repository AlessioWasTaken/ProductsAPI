import express from 'express';
import { addProduct, delProduct, getAllProducts, getProductByID, getProductByName } from '../db/products.db';
import { isNumber } from 'lodash';

export const getAllProductsController = async (req: express.Request, res: express.Response) => {
    const products = await getAllProducts();

    if(products.length == 0){
        return res.status(200).json({'message': 'No products found', 'status': 'ko'});
    }

    res.status(200).json(products);
};

export const getProductController = async (req: express.Request, res: express.Response) => {
    const { productId } = req.params;

    if(!productId) {
        return res.status(200).json({'message': 'Error not provided a productId', 'status': 'ko'});
    }

    const product = await getProductByID(productId);

    if(!product) {
        return res.status(200).json({message: 'No product found', status: 'ko'});
    }

    res.status(200).json({data: product, status: 'ok'});
};

export const addProductController = async (req: express.Request, res: express.Response) => {
    const { productName, description, type, img, price, stock } = req.body;

    if(!productName || !description || !type || !img || !price || !stock){
        return res.status(200).json({message: 'Missing params', status: 'ko'});
    }

    const existProduct = await getProductByName(productName);

    if(existProduct) {
        return res.status(200).json({message: 'Product alredy exist', status: 'ko'});
    }

    const statusProduct = await addProduct(productName, description, type, img, price, stock);

    if(!statusProduct.insertId || statusProduct.insertId == 0){
        return res.json({error: 'Product not added prossibile query error', status: 'ko'});
    }

    res.status(200).json({message: 'Product added succesfuly', status: 'ok'});
};

export const deleteProductController = async (req: express.Request, res: express.Response) => {
    const { productId } = req.params;

    if(!productId || isNaN(Number(productId))){
        return res.status(200).json({message: 'Missing productId or is not nuber', status: 'ko'});
    }

    const productIdVal = Number(productId);
    const existProduct = await getProductByID(productId);

    if(!existProduct) {
        return res.status(200).json({message: 'Product not exist', status: 'ko'});
    }
    const statusDelete = await delProduct(productIdVal);

    if(statusDelete.affectedRows > 0){
        return res.status(200).json({message: 'Product eliminated succesfuly', status: 'ok'});
    }else{
        return res.json({error: 'Possible error on query or productId', status: 'ko'});
    }
};