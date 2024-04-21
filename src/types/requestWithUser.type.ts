import express from 'express';

export type RequestWithUser  = express.Request & { user: {
    userId: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    salt: string,
    token: string
}}