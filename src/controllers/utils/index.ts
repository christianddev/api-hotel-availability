import { type Response } from 'express';
import httpStatus from 'http-status';

import type { ErrorOperation } from '../../types';

export const defaultErrorResponse = (
  catchError: unknown,
  res: Response
): Response => {
  // eslint-disable-next-line no-console
  console.trace(catchError);

  const status: number = httpStatus.INTERNAL_SERVER_ERROR;
  const error: ErrorOperation = {
    status,
    message: 'contact with the administrator'
  };

  return res.status(status).json({ error });
};
