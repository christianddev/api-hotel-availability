import { DataTypes } from 'sequelize';

import { sequelize } from '../configuration/';
import {
  CREATED_AT_FIELD_NAME,
  IS_DELETED_FIELD_NAME,
  ON_DELETE_ATTRIBUTE,
  RATE_CHECK_IN_FIELD_NAME,
  RATE_CHECK_OUT_FIELD_NAME,
  RATE_MODEL_CODE_LENGTH,
  RATE_MODEL_NAME_LENGTH,
  RATE_MODEL_NAME,
  ROOM_FK_ID_FIELD_NAME,
  ROOM_ID_FIELD_NAME,
  ROOM_MODEL_NAME,
  UPDATED_AT_FIELD_NAME
} from '../../config/';

export const RateModel = sequelize.define(
  RATE_MODEL_NAME,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(RATE_MODEL_CODE_LENGTH),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(RATE_MODEL_NAME_LENGTH),
      allowNull: false
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
      field: RATE_CHECK_IN_FIELD_NAME
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: false,
      field: RATE_CHECK_OUT_FIELD_NAME,
      defaultValue: DataTypes.NOW
    },
    roomCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ROOM_MODEL_NAME,
        key: ROOM_ID_FIELD_NAME
      },
      onDelete: ON_DELETE_ATTRIBUTE,
      field: ROOM_FK_ID_FIELD_NAME
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

export default RateModel;
