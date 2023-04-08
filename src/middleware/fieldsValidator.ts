import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../common';

const validateRequiredParam = (
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

const validateRequiredFieldOfBody = (
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

export const validateRoomCodeParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateRequiredParam('roomCode', req, res, next);

export const validateHotelCodeParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateRequiredParam('hotelCode', req, res, next);

export const validateNameFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateRequiredFieldOfBody('name', req, res, next);

export const validateCodeFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validateRequiredFieldOfBody('code', req, res, next);
