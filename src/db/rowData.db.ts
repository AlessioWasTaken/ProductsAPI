import { RowDataPacket } from 'mysql2';

export interface Users extends RowDataPacket {
    userId?: number,
    name?: string,
    surname?: string,
    email?: string,
    password?: string,
    salt?: string,
    token?: string
}

export interface Products extends RowDataPacket {
    productId?: number,
    productName?: string,
    description?: string,
    type?: string,
    img?: string,
    price?: number,
    stock?: number
}

export interface Orders extends RowDataPacket {
    id?: string,
    user?: number,
    product?: number,
    qta?: number
}