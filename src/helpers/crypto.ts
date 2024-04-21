import crypto from 'crypto';
import environments from '../environments';

export const random = () => {
    return crypto.randomBytes(128).toString('base64');
};

export const authenticate = (passowrd: string, salt: string) => {
    return crypto.createHmac('sha256', [passowrd, salt].join('/')).update(environments().secretKey).digest('base64');
};