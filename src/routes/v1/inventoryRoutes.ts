/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  Logger,
  validateCheckInFieldOfBody,
  validateCheckOutFieldOfBody,
  validateCodeFieldOfBody,
  validateHotelCodeParam,
  validateIfHotelCodeParamExistsInDatabase,
  validateIfRateByCodeExistsIntoDataBase,
  validateIfRoomByCodeExistsIntoDataBase,
  validateNameFieldOfBody,
  validateRoomCodeParam
} from '../../middleware';
import {
  deleteInventory,
  getInventories,
  getInventory,
  patchInventory,
  postInventory
} from '../../controllers/';

const inventoryRouter = Router({ mergeParams: true });

/**
 * Get list of Inventories
 * @openapi
 *  /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}/inventories:
 *    get:
 *      tags:
 *        - Inventory
 *      summary: "Get list of inventories"
 *      operationId: getAllInventories
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Returns a list of inventories.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
inventoryRouter.get(
  '/',
  [Logger],
  validateHotelCodeParam,
  validateRoomCodeParam,
  getInventories
);

/**
 * Get Inventory
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}/inventories:
 *    get:
 *      tags:
 *        - Inventory
 *      summary: "Get Inventory"
 *      operationId: getInventory
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Returns the information of an inventory.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
inventoryRouter.get(
  '/:inventoryId',
  [
    Logger,
    validateHotelCodeParam,
    validateRoomCodeParam,
    validateIfHotelCodeParamExistsInDatabase,
    validateIfRoomByCodeExistsIntoDataBase
  ],
  getInventory
);

/**
 * Create Inventory
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}/inventories:
 *    post:
 *      tags:
 *        - Inventory
 *      summary: "Create Inventory"
 *      operationId: createInventory
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "This endpoint will add a new record to the **inventories** table.<br><br>**date** and **rate_id** fields must be unique."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
inventoryRouter.post(
  '/',
  [
    Logger,
    validateHotelCodeParam,
    validateCodeFieldOfBody,
    validateNameFieldOfBody,
    validateCheckInFieldOfBody,
    validateCheckOutFieldOfBody,
    validateIfHotelCodeParamExistsInDatabase,
    validateIfRoomByCodeExistsIntoDataBase
  ],
  postInventory
);

/**
 * Update Inventory
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}:
 *    patch:
 *      tags:
 *        - Inventory
 *      summary: "Update Inventory"
 *      operationId: updateInventory
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Update the inventory's **price**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
inventoryRouter.patch(
  '/:inventoryId',
  [
    Logger,
    validateHotelCodeParam,
    validateCodeFieldOfBody,
    validateNameFieldOfBody,
    validateCheckInFieldOfBody,
    validateCheckOutFieldOfBody,
    validateIfHotelCodeParamExistsInDatabase,
    validateIfRoomByCodeExistsIntoDataBase
  ],
  patchInventory
);

/**
 * Delete Room
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}:
 *    delete:
 *      tags:
 *        - Inventory
 *      summary: "Delete Rate"
 *      operationId: deleteRate
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Deletes a rate's record.<br><br>**By default records are `NOT` **permanently deleted**, updating the rates table with the **isDeleted** property set to true.<br><br>**If the `TEMPORARY_DELETE` environment variable is set, the records will be permanently deleted**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
inventoryRouter.delete(
  '/:inventoryId',
  [
    Logger,
    validateHotelCodeParam,
    validateRoomCodeParam,
    validateIfRoomByCodeExistsIntoDataBase,
    validateIfRateByCodeExistsIntoDataBase
  ],
  deleteInventory
);

export default inventoryRouter;
