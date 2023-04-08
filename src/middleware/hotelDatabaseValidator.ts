import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';

import { defaultErrorResponse } from '../controllers';
import { findOneHotelByCode } from '../services';
import type { HotelRequest, ErrorOperation } from '../types';

export const validateHotelByCodeExistsIntoDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const rawHotel: HotelRequest = req?.body;
    const hotel = await findOneHotelByCode({ code: rawHotel?.code }, false);

    if (hotel?.id) {
      const error: ErrorOperation = {
        status: httpStatus?.BAD_REQUEST,
        message: `a hotel exists with the code '${hotel?.code}' & name '${hotel?.name}'`
      };
      return res.status(httpStatus?.BAD_REQUEST).json({ error });
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateHotelByCodeNotExistsIntoDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const code: string = req?.params?.hotelCode;
    const hotel = await findOneHotelByCode({ code }, true);

    if (!hotel) {
      const error: ErrorOperation = {
        status: httpStatus?.NOT_FOUND,
        message: `hotel with code '${code}' not found`
      };
      return res.status(httpStatus?.NOT_FOUND).json({ error });
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
