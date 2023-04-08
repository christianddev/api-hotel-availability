import type { NextFunction, Request, Response } from 'express';

import {
  badRequest,
  defaultErrorResponse,
  resourceNotFound
} from '../../common';
import { findOneHotelByCode } from '../../services';
import type { ValidationByCodeProps } from '../../types';
import { getFirstTruthyValue } from '../utils';

const validateHotelByCode = async ({
  isUpdateOperation,
  req,
  res,
  next
}: ValidationByCodeProps): Promise<Response | undefined> => {
  try {
    const code = getFirstTruthyValue(
      req?.body?.hotelCode,
      req?.params?.hotelCode,
      req?.body?.code
    );
    const hotel = await findOneHotelByCode(code, false, false);

    if (isUpdateOperation && !hotel?.id) {
      return resourceNotFound(`hotel with code '${code}' not found`, res);
    }
    if (!isUpdateOperation && hotel?.code) {
      return badRequest(`a hotel exists with the code '${code}'`, res);
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateIfHotelExistsByCodeInDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> =>
  await validateHotelByCode({
    isUpdateOperation: false,
    req,
    res,
    next
  });

export const validateIfHotelCodeParamExistsInDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> =>
  await validateHotelByCode({
    isUpdateOperation: true,
    req,
    res,
    next
  });
