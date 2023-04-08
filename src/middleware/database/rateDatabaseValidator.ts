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
import type { ValidationByCodeProps } from '../../types';
import { getFirstTruthyValue } from '../utils';

const validateRateByCode = async ({
  isUpdateOperation,
  findWithFKField,
  req,
  res,
  next
}: ValidationByCodeProps): Promise<Response | undefined> => {
  try {
    const roomCode: string = req?.params.roomCode;

    const room = await findOneRoomByCodeAndHotelId({ roomCode }, false, false);
    console.log('room', room);

    if (!room) {
      return resourceNotFound(`room with code '${roomCode}' not found`, res);
    }

    const code = getFirstTruthyValue(
      req?.body?.rateCode,
      req?.params?.rateCode,
      req?.body?.code
    );

    const rate = await findOneRateByCodeRoomId(
      { code, ...(findWithFKField ? { roomId: room?.id } : '') },
      false,
      !findWithFKField
    );

    if (isUpdateOperation && !rate?.code) {
      return resourceNotFound(`rate with code '${code}' not found`, res);
    }

    if (!isUpdateOperation && rate?.code) {
      return badRequest(`a rate exists with the code '${code}'`, res);
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateIfRateByCodeExistsIntoDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> =>
  await validateRateByCode({
    isUpdateOperation: true,
    findWithFKField: true,
    req,
    res,
    next
  });
