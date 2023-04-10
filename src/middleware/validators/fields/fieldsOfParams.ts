import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../../../common';

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
