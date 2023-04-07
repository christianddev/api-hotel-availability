import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';

import type { ErrorOperation } from '../types/api';

export const validateId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (req?.params?.code === '') {
    const error: ErrorOperation = {
      status: httpStatus?.BAD_REQUEST,
      message: "check 'code' field"
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};
