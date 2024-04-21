import { ResultSetHeader } from "mysql2"

import database from ".";
import { Products } from './rowData.db';

export const getAllProducts = (): Promise<Products[] | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Products[]>(`select * from products`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

export const getProductByID = (id: string): Promise<Products | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Products[]>(`select * from products where productId = ${id}`, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
}

export const getProductByName = (name: string): Promise<Products | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Products[]>(`select * from products where productName = '${name}'`, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
};


//Per il tipo potrebbe essere un enum???
export const addProduct = (productName: string, description: string, type: string, img: string, price: string, stock: number): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`insert into products(productName, description, type, img, price, stock) values('${productName}', '${description}', '${type}', '${img}', '${price}', '${stock}')`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

//Aggiungere la query
export const delProduct = (productId: number): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`DELETE FROM products WHERE productId = '${productId}'`, (err, result)=> {
            if (err) reject(err);
            resolve(result);
        })
    });
}

//Aggiungere la query di modifica totale/selettiva