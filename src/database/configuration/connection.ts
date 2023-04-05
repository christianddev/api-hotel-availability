import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';

import {
  DATABASE_HOST,
  DATABASE_LOGGING,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_DIALECT
} from '../../config/constant';

const port = DATABASE_PORT !== '' ? `:${DATABASE_PORT}` : '';
const host = `${DATABASE_HOST}${port}`;
const logging = DATABASE_LOGGING;
const database = DATABASE_NAME;
const username = DATABASE_USER;
const password = DATABASE_PASSWORD;
const dialect = DATABASE_DIALECT;

const options: Options = {
  database,
  username,
  password,
  host,
  dialect,
  logging
};
export const sequelize = new Sequelize(options);
