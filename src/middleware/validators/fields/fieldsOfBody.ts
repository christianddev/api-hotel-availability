import type { NextFunction, Request, Response } from 'express';

import { badRequest } from '../../../common';

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
