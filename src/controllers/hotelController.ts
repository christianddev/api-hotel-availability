import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { findAllHotels } from '../services';
import { defaultErrorResponse } from './utils';

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
