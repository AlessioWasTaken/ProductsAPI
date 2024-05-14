import { ResultSetHeader } from "mysql2"

import database from ".";
import { Orders } from './rowData.db';

export const createOrder = (id: string, user: number, product: number, qta: number, status: boolean, date: Date): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`insert into orders(id, user, product, qta, completed, date) values('${id}', '${user}', '${product}', '${qta}', '${status}', '${date}')`, (err, result) => {
            if (err) reject(err);
            resolve(result); 
        });
    });
};

export const updateOrder = (orderID: string, user: number, product: number, qta: number, status: boolean, date: Date): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`update orders set user = '${user}', product = '${product}', qta = '${qta}', completed = '${status}', date = '${date}' where id = '${orderID}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

export const deleteOrderById = (id: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`delete from orders where id = '${id}'`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

export const getAllOrders = (): Promise<Orders[] | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Orders[]>(`select * from orders`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

export const getOrderById = (id: string): Promise<Orders | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Orders[]>(`select * from orders where id = '${id}'`, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
};

export const checkExistCodes = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        database.query<Orders[]>(`select id from orders where id = '${id}'`, (err, result) => {
            if (err) reject(err);
            if(result.length === 0){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}

export const completeOrderById = (id: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`update orders set completed = true where id = '${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    })
}

export const getAllActiveOrders = (): Promise<Orders[] | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Orders[]>(`select * from orders where completed = false`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};