import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  HOTEL_FK_ID_FIELD_NAME_SEQUELIZE,
  SEQUELIZE_FIELDS
} from '../config';
import { RoomModel } from '../database/models';
import { throwError } from './utils';
import type { Room, RoomDatabaseResponse, RoomRequest } from '../types';

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

export const findOneRoomByCodeAndHotelId = async (
  { roomCode: code, hotelId }: RoomRequest,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
): Promise<Room | undefined> => {
  try {
    const room = await RoomModel.findOne({
      where: {
        code,
        ...(hotelId ? { hotelId } : ''),
        ...(excludeTemporaryDeleted && { isDeleted: false })
      },
      attributes: {
        exclude: excludeORMFields
          ? [...SEQUELIZE_FIELDS, HOTEL_FK_ID_FIELD_NAME_SEQUELIZE]
          : ['']
      }
    });

    return room as unknown as Room;
  } catch (error) {
    throwError('findOneRoomByCodeAndHotelId', error);
  }
};

const createRoomFromModel = async ({
  name,
  roomCode,
  hotelId
}: RoomRequest): Promise<any | undefined> => {
  try {
    const room = await RoomModel.create({
      name,
      code: roomCode,
      hotelId
    });

    return room;
  } catch (error) {
    throwError('createRoomFromModel', error);
  }
};

export const createRoom = async (
  rawRoom: RoomRequest
): Promise<any | undefined> => {
  try {
    const {
      dataValues: { id, name, code }
    }: { dataValues: RoomDatabaseResponse } = await createRoomFromModel({
      roomCode: rawRoom?.code,
      name: rawRoom?.name,
      hotelId: rawRoom?.hotelId
    });

    return {
      data: { id, name, code }
    };
  } catch (error) {
    throwError('createRoom', error);
  }
};

const updateRoomFromModel = async ({
  code,
  name,
  hotelId,
  isDeleted
}: RoomRequest): Promise<[affectedCount: number] | undefined> => {
  try {
    const response = await RoomModel.update(
      { name, isDeleted },
      { where: { code, hotelId } }
    );

    return response;
  } catch (error) {
    throwError('updateRoomFromModel', error);
  }
};

export const updateRoom = async ({
  code,
  hotelId,
  name
}: RoomRequest): Promise<any | undefined> => {
  try {
    const affectedRows = await updateRoomFromModel({ code, hotelId, name });

    return {
      data: { affectedRows }
    };
  } catch (error) {
    throwError('updateRoom', error);
  }
};
