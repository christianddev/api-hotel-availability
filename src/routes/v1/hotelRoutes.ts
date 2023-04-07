/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  deleteHotel,
  getHotel,
  getHotels,
  patchHotel,
  postHotel
} from '../../controllers';
import {
  validateHotelByCodeNotExistsIntoDataBase,
  Logger,
  validateCodeFromParamsNotFalsy,
  validateHotelByCodeExistsIntoDataBase,
  validateNameFromBodyNotFalsy
} from '../../middleware';

const hotelRouter = Router();

/**
 * Get list of Hotels
 * @openapi
 * /api/v1/hotels:
 *    get:
 *      tags:
 *        - Hotels
 *      operationId: getAllHotels
 *      summary: "Get list of hotels"
 *      description: "Returns a list of hotels.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br> if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getHotels"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
hotelRouter.get('/', [Logger], getHotels);

/**
 * Get Hotel
 * @openapi
 * /api/v1/hotels/{code}:
 *    get:
 *      tags:
 *        - Hotels
 *      summary: "Get Hotel"
 *      operationId: getHotel
 *      parameters:
 *        - $ref: "#/components/parameters/code"
 *      description: "Returns the information of an hotel.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getHotel"
 *        '404':
 *          $ref: "#/components/responses/hotelNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
hotelRouter.get('/:code', [Logger, validateCodeFromParamsNotFalsy], getHotel);

/**
 * Create Hotel
 * @openapi
 * /api/v1/hotels:
 *    post:
 *      tags:
 *        - Hotels
 *      summary: "Create Hotel"
 *      operationId: createHotel
 *      description: "This endpoint will add a new record to the **hotels** table.<br><br>**code** field must be unique."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/hotelRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/postHotel"
 *        '400':
 *          $ref: "#/components/responses/postHotelBadRequest"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
hotelRouter.post(
  '/',
  [Logger, validateNameFromBodyNotFalsy, validateHotelByCodeExistsIntoDataBase],
  postHotel
);

/**
 * Update Hotel
 * @openapi
 * /api/v1/hotels/{code}:
 *    patch:
 *      tags:
 *        - Hotels
 *      summary: "Update Hotel"
 *      operationId: updateHotel
 *      parameters:
 *        - $ref: "#/components/parameters/code"
 *      description: "Update the hotel's **name**, the new data must be unique in combination."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/hotelUpdateRequest"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/patchHotel"
 *        '400':
 *          $ref: "#/components/responses/patchHotelBadRequest"
 *        '404':
 *          $ref: "#/components/responses/hotelNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
hotelRouter.patch(
  '/:code',
  [
    Logger,
    validateCodeFromParamsNotFalsy,
    validateNameFromBodyNotFalsy,
    validateHotelByCodeNotExistsIntoDataBase
  ],
  patchHotel
);

/**
 * Delete Hotel
 * @openapi
 * /api/v1/hotels/{code}:
 *    delete:
 *      tags:
 *        - Hotels
 *      summary: "Delete Hotel"
 *      operationId: deleteHotel
 *      parameters:
 *        - $ref: "#/components/parameters/code"
 *      description: "Deletes a hotel's record.<br><br>`by default records are not permanently deleted`, updating the hotels table with the **isDeleted** property set to true.<br><br>**If the `TEMPORARY_DELETE` environment variable is set, the records will be permanently deleted**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/deletedHotel"
 *        '404':
 *          $ref: "#/components/responses/hotelNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
hotelRouter.delete(
  '/:code',
  [
    Logger,
    validateCodeFromParamsNotFalsy,
    validateHotelByCodeNotExistsIntoDataBase
  ],
  deleteHotel
);

export default hotelRouter;
