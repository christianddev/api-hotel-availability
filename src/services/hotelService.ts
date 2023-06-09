import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  HOTEL_ID_FIELD_NAME,
  SEQUELIZE_FIELDS,
  TEMPORARY_DELETE
} from '../config';
import { HotelModel } from '../database';
import { throwError } from './utils';
import type { Hotel, HotelRequest } from '../types';

export const findAllHotels = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Hotel[] | undefined> => {
  try {
    const hotels = await HotelModel?.findAll({
      where: {
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, HOTEL_ID_FIELD_NAME]
          : ['']
      }
    });
    return hotels as unknown as Hotel[];
  } catch (error) {
    throwError('findAllHotels:', error);
  }
};

export const findOneHotelByCode = async (
  code: string,
  excludeTemporaryDeleted = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields = EXCLUDE_ORM_FIELDS
): Promise<Hotel | undefined> => {
  try {
    const hotel = await HotelModel.findOne({
      where: {
        code,
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, HOTEL_ID_FIELD_NAME]
          : ['']
      }
    });

    return hotel as unknown as Hotel;
  } catch (error) {
    throwError('findOneHotelByCode', error);
  }
};

const createHotelFromModel = async ({
  name,
  code
}: HotelRequest): Promise<any | undefined> => {
  try {
    const hotel = await HotelModel.create({
      name,
      code
    });

    return hotel;
  } catch (error) {
    throwError('createHotelFromModel', error);
  }
};

export const createHotel = async (
  rawHotel: HotelRequest
): Promise<any | undefined> => {
  try {
    const {
      dataValues: { id, name, code }
    }: { dataValues: HotelRequest } = await createHotelFromModel({
      code: rawHotel?.code,
      name: rawHotel?.name
    });

    return {
      data: { id, name, code }
    };
  } catch (error) {
    throwError('createHotel', error);
  }
};

const updateHotelFromModel = async ({
  code,
  name,
  isDeleted
}: HotelRequest): Promise<[affectedCount: number] | undefined> => {
  try {
    const response = await HotelModel.update(
      {
        name,
        isDeleted
      },
      {
        where: {
          code
        }
      }
    );

    return response;
  } catch (error) {
    throwError('updateHotelFromModel', error);
  }
};

export const updateHotel = async ({
  code,
  name
}: HotelRequest): Promise<any | undefined> => {
  try {
    const affectedRows = await updateHotelFromModel({ code, name });

    return {
      data: { affectedRows }
    };
  } catch (error) {
    throwError('updateHotel', error);
  }
};

const destroyHotelFromModel = async (
  code: string
): Promise<number | undefined> => {
  try {
    const response = await HotelModel.destroy({
      where: {
        code
      }
    });

    return response;
  } catch (error) {
    throwError('destroyHotelFromModel', error);
  }
};

export const removeHotel = async (code: string): Promise<any | undefined> => {
  try {
    if (TEMPORARY_DELETE) {
      const deletedHotel = await updateHotelFromModel({
        code,
        isDeleted: true
      });

      return {
        data: { affectedRows: { deletedHotel } }
      };
    }

    const deletedHotel = await destroyHotelFromModel(code);

    return {
      data: { affectedRows: { deletedHotel } }
    };
  } catch (error) {
    throwError('removeHotel', error);
  }
};
