/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { Logger } from '../../middleware';
import { getRooms } from '../../controllers';

const roomRouter = Router({ mergeParams: true });

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
roomRouter.get('/', [Logger], getRooms);

export default roomRouter;
