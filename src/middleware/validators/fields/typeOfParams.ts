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

export const validatesInventoryIdType = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined =>
  validatesTypeOfFieldNumber('inventoryId', req, res, next);
