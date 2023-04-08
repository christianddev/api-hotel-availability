import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../common';

const validateFieldOfParamsNotFalsy = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!field || !req?.params?.[field]) {
    return badRequest(`check ${field} field`, res);
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
    return badRequest(`check ${field} field`, res);
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

export const validateCodeFromBodyNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateFieldOfBodyNotFalsy('code', req, res, next);
