import type { NextFunction, Request, Response } from 'express';

import {
  badRequest,
  defaultErrorResponse,
  resourceNotFound
} from '../../../common';
import {
  findOneInventoryByOptionalParams,
  findOneRateByCodeRoomId
} from '../../../services';

export const validatesInventoryByIdHasNotBeenDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const rateCode: string = req?.params.rateCode;

    const rate = await findOneRateByCodeRoomId(
      { code: rateCode },
      false,
      false
    );

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }

    const id = Number(req?.params?.inventoryId);

    const inventory = await findOneInventoryByOptionalParams(
      { id, rateId: rate?.id },
      true,
      false
    );

    if (!inventory?.id) {
      return resourceNotFound(
        `inventory with id '${id}' and rate code '${rateCode}' not found`,
        res
      );
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validatesIfTheInventoryByDateAndRateCodeIsInUse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const rateCode: string = req?.params.rateCode;

    const rate = await findOneRateByCodeRoomId(
      { code: rateCode },
      false,
      false
    );

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }

    const date = new Date(req?.body?.date);

    const inventory = await findOneInventoryByOptionalParams(
      { date, rateId: rate?.id },
      false,
      false
    );

    if (inventory?.id) {
      return badRequest(
        `a inventory exists with the id '${inventory?.id}', date '${String(
          inventory?.date
        )}' & the rate code '${rate?.code}'`,
        res
      );
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
