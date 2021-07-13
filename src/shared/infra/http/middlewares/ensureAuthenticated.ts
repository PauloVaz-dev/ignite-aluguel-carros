import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/erros/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as ITokenPayload;

    request.user = {
      id: user_id,
      roles: [],
    };
    return next();
  } catch {
    throw new Error('Invalid Token');
  }
}
