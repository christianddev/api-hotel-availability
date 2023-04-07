import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';

import type { ErrorOperation } from '../types/api';

export const validateCodeNotFalsy = (
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

export const validateNameNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!req?.body?.name) {
    const error: ErrorOperation = {
      status: httpStatus?.BAD_REQUEST,
      message: "check 'name' field"
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};
