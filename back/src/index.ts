import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import 'dotenv/config';
import createRouter from './routes';

import { app, server } from "./socket"

const port = process.env.PORT || 3001;
const router = createRouter()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({ credentials: false }));

app.use('/api', router)

server.listen(port, () =>
    console.log(`🚀 Server listening at http://localhost:${port}`)
);
