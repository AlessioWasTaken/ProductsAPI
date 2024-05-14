import { ResultSetHeader } from "mysql2"
import { Users } from './rowData.db';
import database from ".";

export const getAllUsers = (): Promise<Users[] | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select * from users`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

export const getUserByID = (id: string): Promise<Users | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select * from users where userId = '${id}'`, (err, result) => {
            if(err) reject(err);
            if(result){
                resolve(result[0]);
            }else{
                resolve(undefined);
            }
        });
    });
}

export const deleteUserByID = (id: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`delete from users where userId = '${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

export const editUserByID = (id: string, name: string, surname: string, email: string, password: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`update users set name = '${name}', surname = '${surname}', email = '${email}', password = '${password}' where userId = '${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    })
}

export const editUserPassword = (id: string, password: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject) => {
        database.query<ResultSetHeader>(`update users set password = '${password}' where userId = '${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

export const getUserSalt = (id: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        database.query<Users[]>(`select salt from users where userId = '${id}'`, (err, result) => {
            if(err) reject(err);
            resolve(result[0].salt);
        });
    })
}