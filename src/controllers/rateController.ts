import httpStatus from 'http-status';
import type { Request, Response } from 'express';

import { defaultErrorResponse, resourceNotFound } from '../common';
import {
  createRate,
  findAllRateByRoomId,
  findOneRateByCodeRoomId,
  findOneRoomByCodeAndHotelId,
  removeRate,
  updateRate
} from '../services/';
import type { Rate, RateRequest } from '../types/';

const getRoomByCode = async (
  code: string,
  excludeORMFields = false,
  excludeTemporaryDeleted = false
): Promise<Rate | undefined> =>
  await findOneRoomByCodeAndHotelId(
    { roomCode: code },
    excludeTemporaryDeleted,
    excludeORMFields
  );

export const getRates = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const roomCode = req?.params?.roomCode;

    const room = await getRoomByCode(roomCode);
    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }
    const rates = await findAllRateByRoomId(room.id);

    return res.status(httpStatus.OK).json({ data: { rates } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const getRate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roomCode = req?.params?.roomCode;
    const room = await getRoomByCode(roomCode);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }
    const rateCode = req?.params?.rateCode;

    const rate: Rate = (await findOneRateByCodeRoomId({
      code: rateCode,
      roomId: room?.id
    })) as Rate;

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }
    return res.status(httpStatus?.OK).json({ data: { rate } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const postRate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roomCode = req?.params?.roomCode;
    const room = await getRoomByCode(roomCode);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }
    const rawRate: RateRequest = req?.body;
    rawRate.roomId = room.id;
    const newRate = await createRate(rawRate);

    return res.status(httpStatus?.CREATED).json({
      data: { rate: { name: newRate?.data?.name, code: newRate?.data?.code } }
    });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const patchRate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roomCode = req?.params?.roomCode;
    const room = await getRoomByCode(roomCode);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    const {
      body: { name },
      params: { rateCode }
    } = req;

    const response = await updateRate({
      code: rateCode,
      roomId: room?.id,
      name
    });

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const deleteRate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roomCode = req?.params?.roomCode;
    const room = await getRoomByCode(roomCode);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    const response = await removeRate(req.params.rateCode, room?.id);
    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
