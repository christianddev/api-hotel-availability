/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  Logger,
  validatesCodeFieldOfBody,
  validatesHotelCodeParam,
  validatesRoomByCodeHasNotBeenDeleted,
  validatesIfTheRoomCodeIsInUse,
  validatesNameFieldOfBody,
  validatesRoomCodeParam,
  validatesHotelByCodeHasNotBeenDeleted
} from '../../middleware';
import {
  deleteRoom,
  getRoom,
  getRooms,
  patchRoom,
  postRoom
} from '../../controllers';

import rateRouter from './rateRoutes';

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
 *      description: "Returns a list of rooms.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getRooms"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.get(
  '/',
  [Logger, validatesHotelCodeParam, validatesHotelByCodeHasNotBeenDeleted],
  getRooms
);

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
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesHotelByCodeHasNotBeenDeleted
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
    validatesHotelCodeParam,
    validatesCodeFieldOfBody,
    validatesNameFieldOfBody,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesIfTheRoomCodeIsInUse
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
 *                $ref: "#/components/schemas/roomUpdateRequest"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/patchRoom"
 *        '400':
 *          $ref: "#/components/responses/patchRoomBadRequest"
 *        '404':
 *          $ref: "#/components/responses/roomNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
roomRouter.patch(
  '/:roomCode',
  [
    Logger,
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesNameFieldOfBody,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted
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
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *      description: "Deletes a room's record.<br><br>**By default records are `NOT` **permanently deleted**, updating the rooms table with the **isDeleted** property set to true.<br><br>**If the `TEMPORARY_DELETE` environment variable is set, the records will be permanently deleted**."
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
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted
  ],
  deleteRoom
);

roomRouter.use(`/:roomCode/rates`, rateRouter);

export default roomRouter;
