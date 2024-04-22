import { createSecretKey } from "crypto";

export default {
    userDB: 'root',
    passwordDB: 'root',
    urlDB: '127.0.0.1',
    databaseName: 'AppDB',
    origins: [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:5173'
    ],
    serverPort: 8080,
    portDB: 3306,
    secretKey: '9f8hw3iurfhwiu3hfuis3',
};