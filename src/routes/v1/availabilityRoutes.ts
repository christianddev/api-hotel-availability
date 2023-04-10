/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {} from '../../controllers';
import {
  Logger,
  validatesHotelCodeParam,
  validatesCheckOutDateParam,
  validatesCheckInDateParam,
  validatesHotelByCodeHasNotBeenDeleted
} from '../../middleware';
import { getAvailabilitiesByHotelCodeAndCheckDays } from '../../controllers/';

const availabilityRouter = Router();

/**
 * Get Availability by Hotel, checkIn & checkOut Dates
 * @openapi
 * /api/v1/availability/{hotelCode}/{checkInDate}/{checkOutDate}:
 *    get:
 *      tags:
 *        - Availability
 *      summary: "Get Availability by Hotel, checkIn & checkOut Dates"
 *      operationId: getAvailabilityByHotelCheckInCheckOutDates
 *      parameters:
 *        - $ref: "#/components/parameters/hotelCode"
 *        - $ref: "#/components/parameters/checkInDate"
 *        - $ref: "#/components/parameters/checkOutDate"
 *      description: "Returns the information of availability by hotel, checkIn & checkOut dates.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getAvailabilityByHotelCheckInCheckOutDates"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
availabilityRouter.get(
  '/:hotelCode/:checkInDate/:checkOutDate',
  [
    Logger,
    validatesHotelCodeParam,
    validatesCheckInDateParam,
    validatesCheckOutDateParam,
    validatesHotelByCodeHasNotBeenDeleted
  ],
  getAvailabilitiesByHotelCodeAndCheckDays
);

export default availabilityRouter;
