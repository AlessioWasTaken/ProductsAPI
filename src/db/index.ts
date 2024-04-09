import mysql from 'mysql';
import { hostname } from 'os';
import environments from '../environments';

let database = mysql.createConnection({
    host: environments().urlDB,
    user: environments().userDB,
    password: environments().passwordDB,
})
database.connect((err) => {
    if (err) console.log(err);
    console.log('Connessione effeutata')
})
export default database;