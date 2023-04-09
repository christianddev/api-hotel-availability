import type { NextFunction, Request, Response } from 'express';

import {
  badRequest,
  defaultErrorResponse,
  resourceNotFound
} from '../../common';
import {
  findOneHotelByCode,
  findOneRoomByCodeAndHotelId
} from '../../services';

export const validatesRoomByCodeHasNotBeenDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const hotelCode = req?.params.hotelCode;

    const hotel = await findOneHotelByCode(hotelCode, false, false);

    if (!hotel?.code) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }

    const roomCode = req?.params?.roomCode;

    const room = await findOneRoomByCodeAndHotelId(
      { roomCode, hotelId: hotel?.id },
      true,
      false
    );

    if (!room?.code) {
      return resourceNotFound(
        `room with code '${roomCode}' & hotel with code '${hotelCode}' not found`,
        res
      );
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validatesIfTheRoomCodeIsInUse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const hotelCode = req?.params.hotelCode;

    const hotel = await findOneHotelByCode(hotelCode, false, false);

    if (!hotel?.code) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }

    const roomCode = String(req?.body?.code);

    const room = await findOneRoomByCodeAndHotelId(
      { roomCode, hotelId: hotel?.id },
      false,
      false
    );

    if (room?.code) {
      return badRequest(`a room exists with the code '${roomCode}'`, res);
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
