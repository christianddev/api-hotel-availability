import type { NextFunction, Request, Response } from 'express';

import {
  badRequest,
  defaultErrorResponse,
  resourceNotFound
} from '../../../common';
import { findOneHotelByCode } from '../../../services';

export const validatesHotelByCodeHasNotBeenDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const hotelCode = req?.params.hotelCode;
    const hotel = await findOneHotelByCode(hotelCode, true, false);

    if (!hotel?.id) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validatesIfTheHotelCodeIsInUse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const hotelCode = String(req?.body.code);
    const hotel = await findOneHotelByCode(hotelCode, false, false);

    if (hotel?.code) {
      return badRequest(`a hotel exists with the code '${hotelCode}'`, res);
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
