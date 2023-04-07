import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { defaultErrorResponse } from './utils';
import { finOneHotelByCode, findAllRoomsByHotelId } from '../services';
import type { ErrorOperation } from '../types/api';

export const getRooms = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;

    const hotel = await finOneHotelByCode(hotelCode);
    if (!hotel) {
      const error: ErrorOperation = {
        status: httpStatus?.NOT_FOUND,
        message: `hotel with code '${hotelCode}' not found`
      };

      return res.status(httpStatus?.NOT_FOUND).json({ error });
    }
    const rooms = await findAllRoomsByHotelId(hotel.id);

    return res.status(httpStatus.OK).json({ data: { rooms } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

// export const getHotel = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const code = req?.params?.code;
//     const hotel: Hotel = (await finOneHotelByCode(code)) as Hotel;

//     if (hotel?.code) {
//       return res.status(httpStatus?.OK).json({ data: { hotel } });
//     }
//     const error: ErrorOperation = {
//       status: httpStatus?.NOT_FOUND,
//       message: `hotel with code '${code}' not found`
//     };

//     return res.status(httpStatus?.NOT_FOUND).json({ error });
//   } catch (err) {
//     return defaultErrorResponse(err, res);
//   }
// };

// export const postHotel = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const rawHotel: HotelRequest = req?.body;
//     const newHotel = await createHotel(rawHotel);

//     return res
//       .status(httpStatus?.CREATED)
//       .json({ data: { hotel: newHotel?.data } });
//   } catch (err) {
//     return defaultErrorResponse(err, res);
//   }
// };

// export const patchHotel = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const {
//     body: { name },
//     params: { code }
//   } = req;

//   try {
//     const response = await updateHotel({ code, name });

//     return res.status(httpStatus?.OK).json(response);
//   } catch (err) {
//     return defaultErrorResponse(err, res);
//   }
// };

// export const deleteHotel = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const response = await removeHotel(req?.params?.code);

//     return res.status(httpStatus?.OK).json(response);
//   } catch (err) {
//     return defaultErrorResponse(err, res);
//   }
// };
