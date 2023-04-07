import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  HOTEL_FK_ID_FIELD_NAME_SEQUELIZE,
  SEQUELIZE_FIELDS
} from '../config';
import { RoomModel } from '../database/models';
import { throwError } from './utils';
import type { Room } from '../types/room';

export const findAllRoomsByHotelId = async (
  hotelId: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Room[] | undefined> => {
  try {
    const rooms = await RoomModel?.findAll({
      where: {
        hotelId,
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, HOTEL_FK_ID_FIELD_NAME_SEQUELIZE]
          : ['']
      }
    });
    return rooms as unknown as Room[];
  } catch (error) {
    throwError('findAllRoomsByHotelId:', error);
  }
};
