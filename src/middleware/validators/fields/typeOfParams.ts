import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../../../common';

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

const validDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const validatesTypeOfFieldDate = (
  field: string,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (!validDateFormat.test(req?.params?.[field])) {
    return badRequest(`field '${field}' only accepts YYYY-MM-DD format.`, res);
  }
  next();
};

export const validatesInventoryIdType = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesTypeOfFieldNumber('inventoryId', req, res, next);

export const validatesCheckInDateType = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesTypeOfFieldDate('checkInDate', req, res, next);

export const validatesCheckOutDateType = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesTypeOfFieldDate('checkOutDate', req, res, next);
