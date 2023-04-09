import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../common';

const validatesRequiredParam = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!field || !req?.params?.[field]) {
    return badRequest(`check '${field}' field.`, res);
  }
  next();
};

const validatesRequiredFieldOfBody = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!field || !req?.body?.[field]) {
    return badRequest(`check '${field}' field.`, res);
  }
  next();
};

const validatesTypeOfFieldNumber = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (isNaN(Number(req?.params?.[field]))) {
    return badRequest(`field '${field}' only accepts numbers.`, res);
  }
  next();
};

export const validatesHotelCodeParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredParam('hotelCode', req, res, next);

export const validatesRoomCodeParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredParam('roomCode', req, res, next);

export const validatesRateCodeParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredParam('rateCode', req, res, next);

export const validatesInventoryIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesRequiredParam('inventoryId', req, res, next);

export const validatesInventoryIdType = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesTypeOfFieldNumber('inventoryId', req, res, next);

export const validatesNameFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredFieldOfBody('name', req, res, next);

export const validatesCodeFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredFieldOfBody('code', req, res, next);

export const validatesCheckInFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesRequiredFieldOfBody('checkIn', req, res, next);

export const validatesCheckOutFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesRequiredFieldOfBody('checkout', req, res, next);

export const validatesDateFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => validatesRequiredFieldOfBody('date', req, res, next);

export const validatesPriceFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesRequiredFieldOfBody('price', req, res, next);

export const validatesAvailabilityFieldOfBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesRequiredFieldOfBody('availability', req, res, next);
