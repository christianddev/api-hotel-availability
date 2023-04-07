import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';

import { defaultErrorResponse } from '../controllers';
import { findOneHotelByNameAndCode } from '../services';
import type { HotelRequest } from '../types/hotel';
import type { ErrorOperation } from '../types/api';

export const validateHotelByCodeDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const rawHotel: HotelRequest = req?.body;
    const hotel = await findOneHotelByNameAndCode(
      {
        code: rawHotel?.code
      },
      false
    );

    if (hotel?.id) {
      const error: ErrorOperation = {
        status: httpStatus?.BAD_REQUEST,
        message: `a hotel exists with the name '${hotel?.name}' & code '${hotel?.code}'`
      };
      return res.status(httpStatus?.BAD_REQUEST).json({ error });
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
