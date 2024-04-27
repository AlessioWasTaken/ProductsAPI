import mysql from 'mysql2';
import environments from '../environments';

let database = mysql.createConnection({
    host: environments().urlDB,
    user: environments().userDB,
    password: environments().passwordDB,
    database: environments().databaseName,
})
database.connect((err) => {
    if(err) console.log(err);
    console.log('Connessione effeutata')
})
export default database;