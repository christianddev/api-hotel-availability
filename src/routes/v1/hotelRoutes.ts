/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { getHotel, getHotels } from '../../controllers';
import { Logger, validateId } from '../../middleware';

const hotelRouter = Router();

/**
 * Get list of Hotels
 * @openapi
 * /api/v1/hotels:
 *    get:
 *      tags:
 *        - hotels
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
 *        - $ref: "#/components/parameters/id"
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
hotelRouter.get('/:code', [Logger, validateId], getHotel);
export default hotelRouter;
