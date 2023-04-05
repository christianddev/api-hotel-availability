import { DataTypes } from 'sequelize';

import { sequelize } from '../configuration';
import {
  CREATED_AT_FIELD_NAME,
  HOTEL_MODEL_CODE_LENGTH,
  HOTEL_MODEL_NAME_LENGTH,
  HOTEL_MODEL_NAME,
  IS_DELETED_FIELD_NAME,
  UPDATED_AT_FIELD_NAME
} from '../../config';

export const HotelModel = sequelize.define(
  HOTEL_MODEL_NAME,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(HOTEL_MODEL_CODE_LENGTH),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(HOTEL_MODEL_NAME_LENGTH),
      allowNull: false
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

export default HotelModel;
