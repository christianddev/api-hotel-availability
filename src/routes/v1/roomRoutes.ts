/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  Logger,
  validateCodeFromBodyNotFalsy,
  validateHotelCodeFromParamsNotFalsy,
  validateIfHotelByCodeFromParamsExistsIntoDataBase,
  validateIfRoomByCodeExistsIntoDataBase,
  validateIfRoomByCodeNotExistsIntoDataBase,
  validateNameFromBodyNotFalsy,
  validateRoomCodeFromParamsNotFalsy
} from '../../middleware';
import { getRoom, getRooms, postRoom } from '../../controllers';

const roomRouter = Router({ mergeParams: true });

/**
 * Get list of Rooms
 * @openapi
 *  /api/v1/hotels/{code}/rooms:
 *    get:
 *      tags:
 *        - Rooms
 *      operationId: getAllRooms
 *      summary: "Get list of roms"
 *      description: "Returns a list of rooms.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br> if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getRooms"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.get('/', [Logger], getRooms);

/**
 * Get Room
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}:
 *    get:
 *      tags:
 *        - Rooms
 *      summary: "Get Room"
 *      operationId: getRoom
 *      parameters:
 *        - $ref: "#/components/parameters/code"
 *      description: "Returns the information of an room.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getRoom"
 *        '404':
 *          $ref: "#/components/responses/roomNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.get(
  '/:roomCode',
  [
    Logger,
    validateHotelCodeFromParamsNotFalsy,
    validateRoomCodeFromParamsNotFalsy,
    validateIfHotelByCodeFromParamsExistsIntoDataBase
  ],
  getRoom
);

/**
 * Create Room
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms:
 *    post:
 *      tags:
 *        - Rooms
 *      summary: "Create Hotel"
 *      operationId: createHotel
 *      description: "This endpoint will add a new record to the **rooms** table.<br><br>**code** field must be unique."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/roomRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/postRoom"
 *        '400':
 *          $ref: "#/components/responses/postRoomBadRequest"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.post(
  '/',
  [
    Logger,
    validateHotelCodeFromParamsNotFalsy,
    validateCodeFromBodyNotFalsy,
    validateNameFromBodyNotFalsy,
    validateIfHotelByCodeFromParamsExistsIntoDataBase,
    validateIfRoomByCodeNotExistsIntoDataBase
  ],
  postRoom
);

// /**
//  * Update Hotel
//  * @openapi
//  * /api/v1/hotels/{code}:
//  *    patch:
//  *      tags:
//  *        - Hotels
//  *      summary: "Update Hotel"
//  *      operationId: updateHotel
//  *      parameters:
//  *        - $ref: "#/components/parameters/code"
//  *      description: "Update the hotel's **name**, the new data must be unique in combination."
//  *      requestBody:
//  *          required: true
//  *          content:
//  *            application/json:
//  *              schema:
//  *                $ref: "#/components/schemas/hotelUpdateRequest"
//  *      responses:
//  *        '200':
//  *          $ref: "#/components/responses/patchHotel"
//  *        '400':
//  *          $ref: "#/components/responses/patchHotelBadRequest"
//  *        '404':
//  *          $ref: "#/components/responses/hotelNotFound"
//  *        '500':
//  *          $ref: "#/components/responses/internalServerError"
//  *      security:
//  *       - jwtAuth: []
//  */
// roomRouter.patch(
//   '/:code',
//   [
//     Logger,
//     validateRoomCodeFromParamsNotFalsy,
//     validateNameFromBodyNotFalsy,
//     validateHotelByCodeNotExistsIntoDataBase
//   ],
//   patchHotel
// );

// /**
//  * Delete Hotel
//  * @openapi
//  * /api/v1/hotels/{code}:
//  *    delete:
//  *      tags:
//  *        - Hotels
//  *      summary: "Delete Hotel"
//  *      operationId: deleteHotel
//  *      parameters:
//  *        - $ref: "#/components/parameters/code"
//  *      description: "Deletes a hotel's record.<br><br>`by default records are not permanently deleted`, updating the hotels table with the **isDeleted** property set to true.<br><br>**If the `TEMPORARY_DELETE` environment variable is set, the records will be permanently deleted**."
//  *      responses:
//  *        '200':
//  *          $ref: "#/components/responses/deletedHotel"
//  *        '404':
//  *          $ref: "#/components/responses/hotelNotFound"
//  *        '500':
//  *          $ref: "#/components/responses/internalServerError"
//  *      security:
//  *       - jwtAuth: []
//  */
// roomRouter.delete(
//   '/:code',
//   [
//     Logger,
//     validateRoomCodeFromParamsNotFalsy,
//     validateHotelByCodeNotExistsIntoDataBase
//   ],
//   deleteHotel
// );

export default roomRouter;
