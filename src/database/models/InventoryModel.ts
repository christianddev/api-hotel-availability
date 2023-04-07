import { DataTypes } from 'sequelize';

import { sequelize } from '../configuration';
import {
  CREATED_AT_FIELD_NAME,
  INVENTORY_MODEL_NAME,
  IS_DELETED_FIELD_NAME,
  ON_DELETE_ATTRIBUTE,
  PRICE_PRECISION,
  PRICE_SCALE,
  RATE_FK_ID_FIELD_NAME,
  RATE_ID_FIELD_NAME,
  RATE_MODEL_NAME,
  UPDATED_AT_FIELD_NAME
} from '../../config';

export const InventoryModel = sequelize.define(
  INVENTORY_MODEL_NAME,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(PRICE_PRECISION, PRICE_SCALE),
      allowNull: false
    },
    availability: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    rateCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: RATE_MODEL_NAME,
        key: RATE_ID_FIELD_NAME
      },
      onDelete: ON_DELETE_ATTRIBUTE,
      field: RATE_FK_ID_FIELD_NAME
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

export default InventoryModel;
