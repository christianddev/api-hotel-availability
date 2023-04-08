import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';

import type { ErrorOperation } from '../types';

const validateFieldOfParamsNotFalsy = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!field || !req?.params?.[field]) {
    const error: ErrorOperation = {
      status: httpStatus?.BAD_REQUEST,
      message: `check ${field} field`
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

const validateFieldOfBodyNotFalsy = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!field || !req?.body?.[field]) {
    const error: ErrorOperation = {
      status: httpStatus?.BAD_REQUEST,
      message: `check ${field} field`
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateRoomCodeFromParamsNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validateFieldOfParamsNotFalsy('roomCode', req, res, next);

export const validateHotelCodeFromParamsNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validateFieldOfParamsNotFalsy('hotelCode', req, res, next);

export const validateNameFromBodyNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateFieldOfBodyNotFalsy('name', req, res, next);
