import express, { Request, Response, NextFunction, Router } from "express";
import 'express-async-errors';
import * as dotenv from "dotenv";
import cors from 'cors';

import { router } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

// Middleware para tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Loga o erro completo no console
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// inicia o servidor
app.listen(process.env.PORT, () => console.log('Servidor online'));