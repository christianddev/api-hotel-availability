import type { NextFunction, Request, Response } from 'express';
import { SERVER_LOGGING } from '../config';

export const Logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (SERVER_LOGGING) {
    const method = `${req.method} ${req?.originalUrl}`;
    const body = `\n\tbody: ${JSON.stringify(req?.body)}`;
    const params = `\n\tparams: ${JSON.stringify(req?.params)}`;
    const query = `\n\tquery: ${JSON.stringify(req?.query)}`;
    console.log(`${method}${body}${params}${query}`);
  }
  next();
};
