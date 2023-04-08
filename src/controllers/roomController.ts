import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { defaultErrorResponse, resourceNotFound } from '../common';
import {
  createRoom,
  findAllRoomsByHotelId,
  findOneHotelByCode,
  findOneRoomByCodeAndHotelId,
  removeRoom,
  updateRoom
} from '../services';
import type { Hotel, Room, RoomRequest } from '../types';

const getHotelByCode = async (
  code: string,
  excludeORMFields = false,
  excludeTemporaryDeleted = false
): Promise<Hotel | undefined> =>
  await findOneHotelByCode(code, excludeORMFields, excludeTemporaryDeleted);

export const getRooms = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const code = req?.params?.hotelCode;

    const hotel = await getHotelByCode(code);
    if (!hotel) {
      return resourceNotFound(`hotel with code '${code}' not found`, res);
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
    const hotel = await getHotelByCode(hotelCode);

    if (!hotel) {
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
    const hotel = await getHotelByCode(hotelCode);

    if (!hotel) {
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

export const patchRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;
    const hotel = await getHotelByCode(hotelCode);

    if (!hotel) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }

    const {
      body: { name },
      params: { roomCode }
    } = req;

    const response = await updateRoom({
      code: roomCode,
      hotelId: hotel?.id,
      name
    });

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;
    const hotel = await getHotelByCode(hotelCode);

    if (!hotel) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }
    const roomCode = req.params.roomCode;
    const response = await removeRoom(roomCode, hotel?.id);
    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
