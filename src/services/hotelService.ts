import type { Hotel } from '../types/hotel';
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS
} from '../config';
import { HotelModel } from '../database/models';
import { throwError } from './utils';

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
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : ['']
      }
    });
    return hotels as unknown as Hotel[];
  } catch (error) {
    throwError('findAllHotels:', error);
  }
};

export const finOneHotelByCode = async (
  code: string,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Hotel | undefined> => {
  try {
    const hotel = await HotelModel.findOne({
      where: {
        code,
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : ['']
      }
    });

    return hotel as unknown as Hotel;
  } catch (error) {
    throwError('finOneAuthorById', error);
  }
};
