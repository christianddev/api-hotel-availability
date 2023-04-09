import httpStatus from 'http-status';
import type { Request, Response } from 'express';

import { defaultErrorResponse, resourceNotFound } from '../common';
import {
  findOneRateByCodeRoomId,
  createInventory,
  findAllInventoryByRateId,
  removeInventory,
  updateInventory,
  findOneInventoryByCodeAndRateId
} from '../services';
import type { Inventory, InventoryRequest, Rate } from '../types';

const getRateByCode = async (
  code: string,
  excludeORMFields = false,
  excludeTemporaryDeleted = false
): Promise<Rate | undefined> =>
  await findOneRateByCodeRoomId(
    { code },
    excludeTemporaryDeleted,
    excludeORMFields
  );

export const getInventories = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const rateCode = req?.params?.rateCode;

    const rate = await getRateByCode(rateCode);
    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }
    const inventories = await findAllInventoryByRateId(rate.id);

    return res.status(httpStatus.OK).json({ data: { inventories } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const getInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rateCode = req?.params?.rateCode;
    const rate = await getRateByCode(rateCode);

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }
    const id = Number(req?.params?.inventoryId);

    const inventory: Inventory = (await findOneInventoryByCodeAndRateId({
      id,
      rateId: rate?.id
    })) as Inventory;

    if (!inventory) {
      return resourceNotFound(
        `inventory with id '${id}' & rate code '${rateCode}' not found`,
        res
      );
    }
    return res.status(httpStatus?.OK).json({ data: { inventory } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const postInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rateCode = req?.params?.rateCode;
    const rate = await getRateByCode(rateCode);

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }
    const rateInventory: InventoryRequest = req?.body;
    rateInventory.rateId = rate.id;
    const newInventory = await createInventory(rateInventory);

    return res.status(httpStatus?.CREATED).json({
      data: { inventory: newInventory?.data }
    });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const patchInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rateCode = req?.params?.rateCode;
    const rate = await getRateByCode(rateCode);

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }

    const { price, availability, date } = req.body;

    // TODO: check this into middleware
    const id = Number(req.params?.inventoryId);
    const response = await updateInventory({
      id,
      price,
      availability,
      rateId: rate?.id,
      date
    });

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const deleteInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rateCode = req?.params?.rateCode;
    const rate = await getRateByCode(rateCode);

    if (!rate) {
      return resourceNotFound(`rate with code '${rateCode}' not found`, res);
    }
    // TODO: check this into middleware
    const id = Number(req.params?.inventoryId);
    const response = await removeInventory(id, rate?.id);
    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
