import { HotelModel } from '../database/models';
import { throwError } from './serviceUtils';

export const findAllHotels = async (): Promise<unknown> => {
  try {
    const hotels = await HotelModel?.findAll();
    return hotels;
  } catch (error) {
    return throwError('findAllHotels', error);
  }
};
