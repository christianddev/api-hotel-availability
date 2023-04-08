import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { defaultErrorResponse, resourceNotFound } from '../common';
import {
  createRoom,
  findAllRoomsByHotelId,
  findOneHotelByCode,
  findOneRoomByCodeAndHotelId
} from '../services';
import type { ErrorOperation, Room, RoomRequest } from '../types';

export const getRooms = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const code = req?.params?.hotelCode;

    const hotel = await findOneHotelByCode({ code });
    if (!hotel) {
      const error: ErrorOperation = {
        status: httpStatus?.NOT_FOUND,
        message: `hotel with code '${code}' not found`
      };

      return res.status(httpStatus?.NOT_FOUND).json({ error });
    }
    const rooms = await findAllRoomsByHotelId(hotel.id);

    return res.status(httpStatus.OK).json({ data: { rooms } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const getRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;
    const hotel = await findOneHotelByCode({ code: hotelCode }, false);

    if (!hotel?.id) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }
    const roomCode = req?.params?.roomCode;

    const room: Room = (await findOneRoomByCodeAndHotelId({
      roomCode,
      hotelId: hotel?.id
    })) as Room;

    if (room?.code) {
      return res.status(httpStatus?.OK).json({ data: { room } });
    }
    return resourceNotFound(`room with code '${roomCode}' not found`, res);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const postRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;
    const hotel = await findOneHotelByCode({ code: hotelCode }, false);

    if (!hotel?.code) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }
    const rawRoom: RoomRequest = req?.body;
    rawRoom.hotelId = hotel.id;
    const newRoom = await createRoom(rawRoom);

    return res
      .status(httpStatus?.CREATED)
      .json({ data: { room: newRoom?.data } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

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
