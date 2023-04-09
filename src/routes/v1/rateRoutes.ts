/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  Logger,
  validatesCheckInFieldOfBody,
  validatesCheckOutFieldOfBody,
  validatesCodeFieldOfBody,
  validatesHotelCodeParam,
  validatesNameFieldOfBody,
  validatesRoomCodeParam,
  validatesHotelByCodeHasNotBeenDeleted,
  validatesIfTheRateCodeIsInUse,
  validatesRateByCodeHasNotBeenDeleted,
  validatesRoomByCodeHasNotBeenDeleted
} from '../../middleware';
import {
  deleteRate,
  getRate,
  getRates,
  patchRate,
  postRate
} from '../../controllers';
import inventoryRouter from './inventoryRoutes';

const rateRouter = Router({ mergeParams: true });

/**
 * Get list of Rates
 * @openapi
 *  /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates:
 *    get:
 *      tags:
 *        - Rates
 *      summary: "Get list of rates"
 *      operationId: getAllRates
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *      description: "Returns a list of rates.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
rateRouter.get(
  '/',
  [
    Logger,
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted
  ],
  getRates
);

/**
 * Get Rate
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}:
 *    get:
 *      tags:
 *        - Rates
 *      summary: "Get Rate"
 *      operationId: getRate
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Returns the information of an rate.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
rateRouter.get(
  '/:rateCode',
  [
    Logger,
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted
  ],
  getRate
);

/**
 * Create Rate
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates:
 *    post:
 *      tags:
 *        - Rates
 *      summary: "Create Rate"
 *      operationId: createRate
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *      description: "This endpoint will add a new record to the **rates** table.<br><br>**code** field must be unique."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
rateRouter.post(
  '/',
  [
    Logger,
    validatesHotelCodeParam,
    validatesCodeFieldOfBody,
    validatesNameFieldOfBody,
    validatesCheckInFieldOfBody,
    validatesCheckOutFieldOfBody,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesIfTheRateCodeIsInUse
  ],
  postRate
);

/**
 * Update Rate
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}:
 *    patch:
 *      tags:
 *        - Rates
 *      summary: "Update Rate"
 *      operationId: updateRate
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/roomCode"
 *        - $ref: "#/components/parameters/rateCode"
 *      description: "Update the rate's **name**."
 *      responses:
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 */
rateRouter.patch(
  '/:rateCode',
  [
    Logger,
    validatesHotelCodeParam,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted,
    validatesRateByCodeHasNotBeenDeleted
  ],
  patchRate
);

/**
 * Delete Rate
 * @openapi
 * /api/v1/hotels/{hotelCode}/rooms/{roomCode}/rates/{rateCode}:
 *    delete:
 *      tags:
 *        - Rates
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
rateRouter.delete(
  '/:rateCode',
  [
    Logger,
    validatesHotelCodeParam,
    validatesRoomCodeParam,
    validatesHotelByCodeHasNotBeenDeleted,
    validatesRoomByCodeHasNotBeenDeleted,
    validatesRateByCodeHasNotBeenDeleted
  ],
  deleteRate
);

rateRouter.use('/:rateCode/inventories', inventoryRouter);

export default rateRouter;
