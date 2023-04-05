import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';

dotenv.config();

// SERVER
export const SERVER_PORT = process.env.SERVER_PORT ?? '';

export const DEVELOPMENT_SERVER = process.env.DEVELOPMENT_SERVER ?? '';

export const PRODUCTION_SERVER = process.env.PRODUCTION_SERVER ?? '';

// DATABASE BASE CONFIG
export const ON_DELETE_ATTRIBUTE =
  process.env.DATABASE_ON_DELETE_ATTRIBUTE ?? 'CASCADE';

export const EXCLUDE_ORM_FIELDS =
  process.env.DATABASE_DEFAULT_EXCLUDE_ORM_FIELDS === 'true';

export const TEMPORARY_DELETE =
  process.env.DATABASE_DEFAULT_TEMPORARY_DELETED === 'true';

export const EXCLUDE_TEMPORARY_DELETED =
  process.env.DATABASE_DEFAULT_EXCLUDE_TEMPORARY_DELETED === 'true';

export const DATABASE_NAME: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_NAME ?? ''
    : process.env.DATABASE_TEST_NAME ?? '';

export const DATABASE_USER: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_USER ?? ''
    : process.env.DATABASE_TEST_USER ?? '';

export const DATABASE_PASSWORD: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_PASSWORD ?? ''
    : process.env.DATABASE_TEST_PASSWORD ?? '';

export const DATABASE_HOST: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_HOST ?? ''
    : process.env.DATABASE_TEST_HOST ?? '';

export const DATABASE_PORT: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_PORT ?? ''
    : process.env.DATABASE_TEST_PORT ?? '';

export const DATABASE_LOGGING: boolean =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_TEST_LOGGING === 'true'
    : process.env.DATABASE_LOGGING === 'true';

export const DATABASE_DIALECT: Dialect =
  (process.env.DATABASE_DIALECT as Dialect) ?? 'mysql';

export const PRICE_PRECISION: number =
  Number(process.env.DATABASE_PRICE_PRECISION) ?? 10;

export const PRICE_SCALE: number =
  Number(process.env.DATABASE_PRICE_SCALE) ?? 2;

export const IS_DELETED_FIELD_NAME: string =
  process.env.DATABASE_IS_DELETED_FIELD_NAME ?? 'is_deleted';

export const CREATED_AT_FIELD_NAME: string =
  process.env.DATABASE_CREATED_AT_FIELD_NAME ?? 'created_at';

export const UPDATED_AT_FIELD_NAME: string =
  process.env.DATABASE_UPDATED_AT_FIELD_NAME ?? 'updated_at';

// DATABASE MODELS
export const HOTEL_ID_FIELD_NAME: string =
  process.env.DATABASE_HOTEL_ID_FIELD_NAME ?? 'id';

export const HOTEL_FK_ID_FIELD_NAME: string =
  process.env.DATABASE_HOTEL_FK_ID_FIELD_NAME ?? 'hotel_id';

export const HOTEL_MODEL_NAME: string =
  process.env.DATABASE_HOTELS_MODEL_NAME ?? 'hotels';

export const HOTEL_MODEL_CODE_LENGTH: number =
  Number(process.env.DATABASE_HOTEL_MODEL_CODE_LENGTH) ?? 150;

export const HOTEL_MODEL_NAME_LENGTH: number =
  Number(process.env.DATABASE_HOTEL_MODEL_NAME_LENGTH) ?? 150;

export const ROOM_MODEL_NAME: string =
  process.env.DATABASE_ROOMS_MODEL_NAME ?? 'rooms';

export const ROOM_ID_FIELD_NAME: string =
  process.env.DATABASE_ROOM_ID_FIELD_NAME ?? 'id';

export const ROOM_FK_ID_FIELD_NAME: string =
  process.env.DATABASE_ROOM_FK_ID_FIELD_NAME ?? 'room_id';

export const ROOM_MODEL_NAME_LENGTH: number =
  Number(process.env.DATABASE_ROOM_MODEL_NAME_LENGTH) ?? 150;

export const ROOM_MODEL_CODE_LENGTH: number =
  Number(process.env.DATABASE_ROOM_MODEL_CODE_LENGTH) ?? 150;

export const RATE_MODEL_NAME: string =
  process.env.DATABASE_RATES_MODEL_NAME ?? 'rates';

export const RATE_ID_FIELD_NAME: string =
  process.env.DATABASE_RATE_ID_FIELD_NAME ?? 'id';

export const RATE_FK_ID_FIELD_NAME: string =
  process.env.DATABASE_RATE_FK_ID_FIELD_NAME ?? 'room_id';

export const RATE_MODEL_NAME_LENGTH: number =
  Number(process.env.DATABASE_RATE_MODEL_NAME_LENGTH) ?? 150;

export const RATE_MODEL_CODE_LENGTH: number =
  Number(process.env.DATABASE_RATE_MODEL_CODE_LENGTH) ?? 150;

export const RATE_CHECK_IN_FIELD_NAME: string =
  process.env.DATABASE_RATE_CHECK_IN_FIELD_NAME ?? 'check_in';

export const RATE_CHECK_OUT_FIELD_NAME: string =
  process.env.DATABASE_RATE_CHECK_OUT_FIELD_NAME ?? 'check_out';

export const INVENTORY_MODEL_NAME: string =
  process.env.DATABASE_INVENTORY_MODEL_NAME ?? 'inventories';

// URLs
export const HOTEL_PATH = `${process.env.SERVER_BASE_URL ?? ''}${
  process.env.SERVER_API_VERSION_URL ?? ''
}${process.env.SERVER_URL_HOTEL ?? ''}`;

export const DOCUMENTATION_PATH = `${process.env.SERVER_BASE_URL ?? ''}${
  process.env.SERVER_API_VERSION_URL ?? ''
}${process.env.SERVER_DOCUMENTATION_URL ?? ''}`;

export const SEQUELIZE_FIELDS = ['isDeleted', 'createdAt', 'updatedAt'];

export const SERVER_PUBLIC_DIR = process.env.SERVER_PUBLIC_DIR ?? '';
