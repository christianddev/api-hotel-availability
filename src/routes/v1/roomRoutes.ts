/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  Logger,
  validateCodeFieldOfBody,
  validateHotelCodeParam,
  validateIfHotelCodeParamExistsInDatabase,
  validateIfRoomByCodeExistsIntoDataBase,
  validateIfRoomByCodeNotExistsIntoDataBase,
  validateNameFieldOfBody,
  validateRoomCodeParam
} from '../../middleware';
import {
  deleteRoom,
  getRoom,
  getRooms,
  patchRoom,
  postRoom
} from '../../controllers';

const roomRouter = Router({ mergeParams: true });

/**
 * Get list of Rooms
 * @openapi
 *  /api/v1/hotels/{hotelCode}/rooms:
 *    get:
 *      tags:
 *        - Rooms
 *      summary: "Get list of roms"
 *      operationId: getAllRooms
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *      description: "Returns a list of rooms.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br> if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getRooms"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.get('/', [Logger], validateHotelCodeParam, getRooms);

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
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
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
    validateHotelCodeParam,
    validateRoomCodeParam,
    validateIfHotelCodeParamExistsInDatabase
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
 *      summary: "Create Room"
 *      operationId: createRoom
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
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
    validateHotelCodeParam,
    validateCodeFieldOfBody,
    validateNameFieldOfBody,
    validateIfHotelCodeParamExistsInDatabase,
    validateIfRoomByCodeNotExistsIntoDataBase
  ],
  postRoom
);

/**
 * Update Room
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}:
 *    patch:
 *      tags:
 *        - Rooms
 *      summary: "Update Room"
 *      operationId: updateRoom
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *      description: "Update the room's **name**."
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
roomRouter.patch(
  '/:roomCode',
  [
    Logger,
    validateHotelCodeParam,
    validateRoomCodeParam,
    validateNameFieldOfBody,
    validateIfRoomByCodeExistsIntoDataBase
  ],
  patchRoom
);

/**
 * Delete Room
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}:
 *    delete:
 *      tags:
 *        - Rooms
 *      summary: "Delete Room"
 *      operationId: deleteRoom
 *      parameters:
 *        - $ref: "#/components/parameters/roomCode"
 *      description: "Deletes a room's record.<br><br>`by default records are not permanently deleted`, updating the rooms table with the **isDeleted** property set to true.<br><br>**If the `TEMPORARY_DELETE` environment variable is set, the records will be permanently deleted**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/deletedRoom"
 *        '404':
 *          $ref: "#/components/responses/roomNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.delete(
  '/:roomCode',
  [
    Logger,
    validateHotelCodeParam,
    validateRoomCodeParam,
    validateIfRoomByCodeExistsIntoDataBase
  ],
  deleteRoom
);

export default roomRouter;
