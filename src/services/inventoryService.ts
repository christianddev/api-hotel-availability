import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  INVENTORY_ID_FIELD_NAME,
  RATE_FK_ID_FIELD_NAME_SEQUELIZE,
  SEQUELIZE_FIELDS,
  TEMPORARY_DELETE
} from '../config';
import { InventoryModel } from '../database';
import { throwError } from './utils';
import type {
  Inventory,
  InventoryDatabaseResponse,
  InventoryRequest
} from '../types';

export const findAllInventoryByRateId = async (
  rateId: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Inventory[] | undefined> => {
  try {
    const inventories = await InventoryModel?.findAll({
      where: {
        rateId,
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, RATE_FK_ID_FIELD_NAME_SEQUELIZE]
          : ['']
      }
    });
    return inventories as unknown as Inventory[];
  } catch (error) {
    throwError('findAllInventoryByRateId:', error);
  }
};

export const findOneInventoryByCodeAndRateId = async (
  { id, rateId }: InventoryRequest,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Inventory | undefined> => {
  try {
    const inventory = await InventoryModel.findOne({
      where: {
        id,
        ...(rateId ? { rateId } : ''),
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, RATE_FK_ID_FIELD_NAME_SEQUELIZE]
          : ['']
      }
    });

    return inventory as unknown as Inventory;
  } catch (error) {
    throwError('findOneInventoryByCodeAndRateId', error);
  }
};

const createInventoryFromModel = async ({
  date,
  rateId,
  price,
  availability
}: InventoryRequest): Promise<any | undefined> => {
  try {
    const inventory = await InventoryModel.create({
      date,
      rateId,
      price,
      availability
    });

    return inventory;
  } catch (error) {
    throwError('createInventoryFromModel', error);
  }
};

export const createInventory = async (
  rawInventory: InventoryRequest
): Promise<any | undefined> => {
  try {
    const { dataValues }: { dataValues: InventoryDatabaseResponse } =
      await createInventoryFromModel({
        date: rawInventory?.date,
        rateId: rawInventory?.rateId,
        price: rawInventory?.price,
        availability: rawInventory?.availability
      });

    console.log('dataValues', dataValues);
    return {
      data: dataValues
    };
  } catch (error) {
    throwError('createInventory', error);
  }
};

const updateInventoryFromModel = async ({
  id,
  price,
  availability,
  rateId,
  date,
  isDeleted
}: InventoryRequest): Promise<[affectedCount: number] | undefined> => {
  try {
    const response = await InventoryModel.update(
      { date, price, availability, isDeleted },
      { where: { id, rateId } }
    );

    return response;
  } catch (error) {
    throwError('updateInventoryFromModel', error);
  }
};

export const updateInventory = async ({
  id,
  price,
  availability,
  rateId,
  date,
  isDeleted
}: InventoryRequest): Promise<any | undefined> => {
  try {
    const affectedRows = await updateInventoryFromModel({
      id,
      price,
      availability,
      rateId,
      date,
      isDeleted
    });

    return {
      data: { affectedRows }
    };
  } catch (error) {
    throwError('updateInventory', error);
  }
};

const destroyInventoryFromModel = async (
  id: number,
  rateId: number
): Promise<number | undefined> => {
  try {
    const response = await InventoryModel.destroy({
      where: {
        id,
        rateId
      }
    });

    return response;
  } catch (error) {
    throwError('destroyInventoryFromModel', error);
  }
};

export const removeInventory = async (
  id: number,
  rateId: number
): Promise<any | undefined> => {
  try {
    if (TEMPORARY_DELETE) {
      const deletedHotel = await updateInventoryFromModel({
        id,
        rateId,
        isDeleted: true
      });

      return {
        data: { affectedRows: { deletedHotel } }
      };
    }

    const deletedInventory = await destroyInventoryFromModel(id, rateId);

    return {
      data: { affectedRows: { deletedRate: deletedInventory } }
    };
  } catch (error) {
    throwError('removeInventory', error);
  }
};
