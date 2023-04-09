import type { NextFunction, Request, Response } from 'express';

import {
  badRequest,
  defaultErrorResponse,
  resourceNotFound
} from '../../common';
import {
  findOneRateByCodeRoomId,
  findOneRoomByCodeAndHotelId
} from '../../services';

export const validatesRateByCodeHasNotBeenDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const roomCode: string = req?.params.roomCode;

    const room = await findOneRoomByCodeAndHotelId({ roomCode }, false, false);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    const code = req?.params?.rateCode;

    const rate = await findOneRateByCodeRoomId(
      { code, roomId: room?.id },
      true,
      false
    );

    if (!rate?.code) {
      return resourceNotFound(
        `rate with code '${code}' and room code '${roomCode}' not found`,
        res
      );
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validatesIfTheRateCodeIsInUse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const roomCode: string = req?.params.roomCode;

    const room = await findOneRoomByCodeAndHotelId({ roomCode }, false, false);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    const code = String(req?.body?.code);

    const rate = await findOneRateByCodeRoomId(
      { code, roomId: room?.id },
      false,
      false
    );

    if (rate?.code) {
      return badRequest(`a rate exists with the code '${code}'`, res);
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
