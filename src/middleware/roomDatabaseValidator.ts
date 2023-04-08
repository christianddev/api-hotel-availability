import type { NextFunction, Request, Response } from 'express';

import { badRequest, defaultErrorResponse, resourceNotFound } from '../common';
import { findOneHotelByCode, findOneRoomByCodeAndHotelId } from '../services';
import type { ValidationByCodeProps } from '../types';

const validateRoomByCode = async ({
  isUpdateOperation,
  findWithFKField,
  req,
  res,
  next
}: ValidationByCodeProps): Promise<Response | undefined> => {
  try {
    const hotelCode: string = req?.params.hotelCode;

    const hotel = await findOneHotelByCode({ code: hotelCode }, false);

    if (!hotel?.code) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }
    const roomCode = req?.body?.roomCode
      ? String(req?.body?.roomCode)
      : req?.params?.roomCode
      ? String(req?.params?.roomCode)
      : req?.body?.code
      ? String(req?.body?.code)
      : '';

    const room = await findOneRoomByCodeAndHotelId(
      { roomCode, ...(findWithFKField ? { hotelId: hotel?.id } : '') },
      false
    );

    if (isUpdateOperation && !room?.code) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    if (!isUpdateOperation && room?.code) {
      return badRequest(`a room exists with the code '${roomCode}'`, res);
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateIfRoomByCodeExistsIntoDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> =>
  await validateRoomByCode({ isUpdateOperation: true, req, res, next });

export const validateIfRoomByCodeNotExistsIntoDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> =>
  await validateRoomByCode({
    isUpdateOperation: false,
    findWithFKField: false,
    req,
    res,
    next
  });
