/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { defaultErrorResponse, resourceNotFound } from '../common';
import {
  findAllInventoryByRateId,
  findAllInventoryByRateIdAndCheckDates,
  findAllRateByRoomId,
  findAllRoomsByHotelId,
  findOneHotelByCode
} from '../services';
import type {
  AvailabilityByHotel,
  BreakdownByRate,
  Inventory,
  Rate,
  RatesByRoom,
  Room
} from '../types';
import { getDateFormatted } from './utils';

const getBreakdownByInventoryDate = async (
  inventoriesByRateId: Inventory[]
): Promise<BreakdownByRate> => {
  const breakdownInventory: BreakdownByRate = {};

  for (const inventory of inventoriesByRateId) {
    if (inventory?.date) {
      const date = getDateFormatted(inventory?.date);
      breakdownInventory[date] = {
        price: inventory.price ?? 0,
        availability: inventory.availability ?? 0
      };
    }
  }

  return breakdownInventory;
};

const getInventoriesByRates = async ({
  ratesByRooms,
  checkIn,
  checkOut,
  room
}: {
  ratesByRooms: Rate[];
  checkIn: Date;
  checkOut: Date;
  room: Room;
}): Promise<AvailabilityByHotel> => {
  const inventoriesByRoom: AvailabilityByHotel = {};

  for (const rate of ratesByRooms) {
    const inventoriesByRateId = await findAllInventoryByRateIdAndCheckDates(
      { rateId: rate?.id, checkIn, checkOut },
      false,
      false
    );

    if (inventoriesByRateId?.length) {
      const breakdownInventory: BreakdownByRate =
        await getBreakdownByInventoryDate(inventoriesByRateId);

      const rateInventory: RatesByRoom = {};
      rateInventory[rate.code] = {
        name: rate?.name,
        breakdown: { ...breakdownInventory }
      };

      inventoriesByRoom[room?.code] = {
        name: room?.name,
        rates: { ...rateInventory }
      };
    }
  }

  return inventoriesByRoom;
};

const getInventoriesByRooms = async (
  roomsByHotel: Room[],
  checkIn: Date,
  checkOut: Date
): Promise<AvailabilityByHotel> => {
  const inventories: AvailabilityByHotel = {};

  for (const room of roomsByHotel) {
    const ratesByRooms = await findAllRateByRoomId(room?.id, false, false);

    if (ratesByRooms?.length) {
      const inventoriesByRoom: AvailabilityByHotel =
        await getInventoriesByRates({
          ratesByRooms,
          checkIn,
          checkOut,
          room
        });

      if (Object.keys(inventoriesByRoom).length) {
        Object.assign(inventories, inventoriesByRoom);
      }
    }
  }

  return inventories;
};

export const getAvailabilitiesByHotelCodeAndCheckDays = async (
  req: Request,
  res: Response<unknown, Record<string, unknown>>
): Promise<Response> => {
  try {
    const hotelCode = req?.params?.hotelCode;
    const hotel = await findOneHotelByCode(hotelCode, false, false);

    if (!hotel?.id) {
      return resourceNotFound(`hotel with code '${hotelCode}' not found`, res);
    }

    const checkIn = new Date(req.params.checkInDate);
    const checkOut = new Date(req.params.checkOutDate);

    const roomsByHotel = await findAllRoomsByHotelId(hotel.id, false, false);

    if (!roomsByHotel?.length) {
      return res.status(httpStatus.OK).json({ data: { rooms: [] } });
    }

    const inventories: AvailabilityByHotel = await getInventoriesByRooms(
      roomsByHotel,
      checkIn,
      checkOut
    );

    return res.status(httpStatus.OK).json({ data: { rooms: inventories } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
