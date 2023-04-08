import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  RATE_ID_FIELD_NAME,
  ROOM_FK_ID_FIELD_NAME_SEQUELIZE,
  SEQUELIZE_FIELDS,
  TEMPORARY_DELETE
} from '../config';
import { RateModel } from '../database';
import { throwError } from './utils';
import type { Rate, RateRequest, RoomDatabaseResponse } from '../types';

export const findAllRateByRoomId = async (
  roomId: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Rate[] | undefined> => {
  try {
    const rates = await RateModel?.findAll({
      where: {
        roomId,
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [
              ...SEQUELIZE_FIELDS,
              RATE_ID_FIELD_NAME,
              ROOM_FK_ID_FIELD_NAME_SEQUELIZE
            ]
          : ['']
      }
    });
    return rates as unknown as Rate[];
  } catch (error) {
    throwError('findAllRateByRoomId:', error);
  }
};

export const findOneRateByCodeRoomId = async (
  { code, roomId }: RateRequest,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Rate | undefined> => {
  try {
    const rate = await RateModel.findOne({
      where: {
        code,
        ...(roomId ? { roomId } : ''),
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [
              ...SEQUELIZE_FIELDS,
              RATE_ID_FIELD_NAME,
              ROOM_FK_ID_FIELD_NAME_SEQUELIZE
            ]
          : ['']
      }
    });

    return rate as unknown as Rate;
  } catch (error) {
    throwError('findOneRateByCodeRoomId', error);
  }
};

const createRateFromModel = async ({
  name,
  rateCode,
  roomId,
  checkIn,
  checkout
}: RateRequest): Promise<any | undefined> => {
  try {
    const rate = await RateModel.create({
      name,
      code: rateCode,
      roomId,
      checkIn,
      checkout
    });

    return rate;
  } catch (error) {
    throwError('createRateFromModel', error);
  }
};

export const createRate = async (
  rawRate: RateRequest
): Promise<any | undefined> => {
  try {
    const {
      dataValues: { id, name, code }
    }: { dataValues: RoomDatabaseResponse } = await createRateFromModel({
      rateCode: rawRate?.code,
      name: rawRate?.name,
      roomId: rawRate?.roomId,
      checkIn: rawRate?.checkIn,
      checkout: rawRate?.checkout
    });

    return {
      data: { id, name, code }
    };
  } catch (error) {
    throwError('createRate', error);
  }
};

const updateRateFromModel = async ({
  code,
  name,
  roomId,
  isDeleted
}: RateRequest): Promise<[affectedCount: number] | undefined> => {
  try {
    const response = await RateModel.update(
      { name, isDeleted },
      { where: { code, roomId } }
    );

    return response;
  } catch (error) {
    throwError('updateRateFromModel', error);
  }
};

export const updateRate = async ({
  code,
  roomId,
  name
}: RateRequest): Promise<any | undefined> => {
  try {
    const affectedRows = await updateRateFromModel({ code, roomId, name });

    return {
      data: { affectedRows }
    };
  } catch (error) {
    throwError('updateRate', error);
  }
};

const destroyRateFromModel = async (
  code: string,
  roomId: number
): Promise<number | undefined> => {
  try {
    const response = await RateModel.destroy({
      where: {
        code,
        roomId
      }
    });

    return response;
  } catch (error) {
    throwError('destroyRateFromModel', error);
  }
};

export const removeRate = async (
  code: string,
  roomId: number
): Promise<any | undefined> => {
  try {
    if (TEMPORARY_DELETE) {
      const deletedHotel = await updateRateFromModel({
        code,
        roomId,
        isDeleted: true
      });

      return {
        data: { affectedRows: { deletedHotel } }
      };
    }

    const deletedRate = await destroyRateFromModel(code, roomId);

    return {
      data: { affectedRows: { deletedRate } }
    };
  } catch (error) {
    throwError('removeRate', error);
  }
};
