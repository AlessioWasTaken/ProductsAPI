import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import routers from "./routers";

import environments from "./environments";

import db from './db';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(cors({
    origin: [...environments().origins],
    credentials: true // Occhio a questo da controllare
}));

app.use('/api', routers());

console.log(db)

app.listen(environments().serverPort, () => console.log(`Server listen on http://localhost:${environments().serverPort}/`));