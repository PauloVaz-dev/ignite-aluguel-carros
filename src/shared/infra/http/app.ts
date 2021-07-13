import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import '@shared/container';
import '@shared/providers';

import '@shared/infra/typeorm';
import upload from '@config/upload';
import { AppError } from '@shared/erros/AppError';

import routes from './routes';

const app = express();

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(express.json());

app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

export { app };
