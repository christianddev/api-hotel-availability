import httpStatus from 'http-status';
import type { Response } from 'express';

import type { ErrorOperation } from '../types';

export const defaultErrorResponse = (
  catchError: unknown,
  res: Response
): Response => {
  console.trace(catchError);
  const error: ErrorOperation = {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'contact with the administrator'
  };

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
};

export const resourceNotFound = (message: string, res: Response): Response => {
  const error: ErrorOperation = {
    status: httpStatus?.NOT_FOUND,
    message
  };
  return res.status(httpStatus?.NOT_FOUND).json({ error });
};

export const badRequest = (message: string, res: Response): Response => {
  const error: ErrorOperation = {
    status: httpStatus?.BAD_REQUEST,
    message
  };
  return res.status(httpStatus?.BAD_REQUEST).json({ error });
};
