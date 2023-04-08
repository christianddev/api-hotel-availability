import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import {
  createHotel,
  findOneHotelByCode,
  findAllHotels,
  removeHotel,
  updateHotel
} from '../services';
import { defaultErrorResponse, resourceNotFound } from '../common';
import type { Hotel, HotelRequest } from '../types';

export const getHotels = async (
  _req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const hotels = await findAllHotels();

    return res.status(httpStatus.OK).json({ data: { hotels } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const getHotel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const code = req?.params?.hotelCode;
    const hotel = (await findOneHotelByCode(code)) as Hotel;

    if (!hotel) {
      return resourceNotFound(`hotel with code '${code}' not found`, res);
    }

    return res.status(httpStatus?.OK).json({ data: { hotel } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const postHotel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rawHotel: HotelRequest = req?.body;
    const newHotel = await createHotel(rawHotel);

    return res
      .status(httpStatus?.CREATED)
      .json({ data: { hotel: newHotel?.data } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const patchHotel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    body: { name },
    params: { hotelCode: code }
  } = req;

  try {
    const response = await updateHotel({ code, name });

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await removeHotel(req?.params?.hotelCode);

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
