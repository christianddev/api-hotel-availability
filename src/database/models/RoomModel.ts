import { DataTypes } from 'sequelize';

import { sequelize } from '../configuration/';
import {
  CREATED_AT_FIELD_NAME,
  HOTEL_FK_ID_FIELD_NAME,
  HOTEL_ID_FIELD_NAME,
  HOTEL_MODEL_NAME,
  IS_DELETED_FIELD_NAME,
  ON_DELETE_ATTRIBUTE,
  ROOM_MODEL_CODE_LENGTH,
  ROOM_MODEL_NAME_LENGTH,
  ROOM_MODEL_NAME,
  UPDATED_AT_FIELD_NAME
} from '../../config/';

export const RoomModel = sequelize.define(
  ROOM_MODEL_NAME,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(ROOM_MODEL_CODE_LENGTH),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(ROOM_MODEL_NAME_LENGTH),
      allowNull: false
    },
    hotelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: HOTEL_MODEL_NAME,
        key: HOTEL_ID_FIELD_NAME
      },
      onDelete: ON_DELETE_ATTRIBUTE,
      field: HOTEL_FK_ID_FIELD_NAME
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: IS_DELETED_FIELD_NAME
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: CREATED_AT_FIELD_NAME,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: UPDATED_AT_FIELD_NAME
    }
  },
  {
    timestamps: true
  }
);

export default RoomModel;
