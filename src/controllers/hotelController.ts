import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { finOneHotelByCode, findAllHotels } from '../services';
import { defaultErrorResponse } from './utils';
import type { ErrorOperation } from '../types/api';
import type { Hotel } from '../types/hotel';

export const getHotels = async (
  _req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<void> => {
  try {
    const hotels = await findAllHotels();

    res.status(httpStatus.OK).json({ data: { hotels } });
  } catch (err) {
    defaultErrorResponse(err, res);
  }
};

export const getHotel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const code = req?.params?.code;
    const hotel: Hotel = (await finOneHotelByCode(code)) as Hotel;

    if (hotel?.code) {
      return res.status(httpStatus?.OK).json({ data: { hotel } });
    }
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: `hotel with id '${code}' not found`
    };

    return res.status(httpStatus?.NOT_FOUND).json({ error });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
