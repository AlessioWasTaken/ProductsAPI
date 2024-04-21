import { ResultSetHeader } from "mysql2"

import database from ".";
import { Users } from './rowData.db';

//Attenzione non abbiamo pensato ad un campo per il tipo di utente: admin, gestore, user, root??

export const getUserByEmail = (email: string): Promise<Users | undefined > => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select * from users where email = '${email}'`, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
};

export const updateSessionToken = (token: string, email: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`update users set token = '${token}' where email = '${email}'`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

export const getUserBySessionToken = (token: string): Promise<Users | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select * from users where token = '${token}'`, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
};

export const getSessionToken = (email: string, password: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select token from users where email = ${email} and password = ${password}`, (err, result) => {
            if (err) reject(err);
            resolve(result[0].token);
        });
    });
};

export const createUser = (name: string, surname: string, email: string, password: string, salt: string, token: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`insert into users(name, surname, email, password, salt, token) values('${name}', '${surname}', '${email}', '${password}', '${salt}', '${token}')`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
};