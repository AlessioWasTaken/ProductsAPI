import express from 'express';
import { addProduct, delProduct, getAllProducts, getProductByID, getProductByName, updateProduct } from '../db/products.db';
import '../types/type.enum';
import ProductType from '../types/type.enum';
import fs from 'fs';
import path from 'path';


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

    //TODO: Non capisco perche si faccia cosi perche avevo messo type != ProductType.bread || ....
    if( type != ProductType.bread || type != ProductType.drink || type != ProductType.coffee || type != ProductType.dessert || type != ProductType.water || type != ProductType.other){
        return res.status(200).json({message: 'Type not valid', status: 'ko'});
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

export const updateProductController = async (req: express.Request, res: express.Response) => {
    const { productId } = req.params;
    const { productName, description, type, img, price, stock } = req.body;

    if(!productId || isNaN(Number(productId))){
        return res.status(200).json({message: 'Missing productId or is not nuber', status: 'ko'});
    }

    if(!productName || !description || !type || !img || !price || !stock){
        return res.status(200).json({message: 'Missing params', status: 'ko'});
    }

    if( type !== ProductType.bread && type !== ProductType.drink && type !== ProductType.coffee && type !== ProductType.dessert && type !== ProductType.water && type !== ProductType.other){
        return res.status(200).json({message: 'Type not valid', status: 'ko'});
    }

    const productIdVal = Number(productId);
    const existProduct = await getProductByID(productId);

    if(!existProduct) {
        return res.status(200).json({message: 'Product not exist', status: 'ko'});
    }

    const statusUpdate = await updateProduct(productIdVal, productName, description, type, img, price, stock);

    if(statusUpdate.affectedRows > 0){
        return res.status(200).json({message: 'Product updated succesfuly', status: 'ok'});
    }else{
        return res.json({error: 'Possible error on query or productId', status: 'ko'});
    }
}

export const uploadImageFromBase64Controller = async (req:express.Request, res: express.Response) => {
    const { base64 } = req.body;

    if(!base64) {
        return res.json({error: 'base64 data not provided', status: 'ko'});
    }

    const base64Data = base64.split(';base64,');
    const extension = base64Data[0].split('/')[1];
    const imageName = `image-${crypto.randomUUID()}.${extension}`;

    const dir = path.resolve(__dirname, '../../public');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, imageName);

    fs.writeFile(filePath, base64Data[1], {encoding: 'base64'}, err => {
        if(err){
            return res.json({error: `Error occurred ${err}`, status: 'ko'});
        }else{
            return res.status(200).json({data: imageName, message: 'File create succesfluy', status: 'ok'});
        }
    });
}

