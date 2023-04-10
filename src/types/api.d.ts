import type { NextFunction, Response, Request } from 'express';

export interface ErrorOperation {
  status?: number;
  message?: string;
  errors?: string[] | object[];
}

export interface ValidationByCodeProps {
  isUpdateOperation: boolean;
  findWithFKField?: boolean;
  req: Request;
  res: Response;
  next: NextFunction;
}

export type BreakdownByRate = Record<
  string,
  {
    price: number;
    availability: number;
  }
>;

export type RatesByRoom = Record<
  string,
  {
    breakdown: BreakdownByRate;
  }
>;

export type AvailabilityByHotel = Record<
  string,
  {
    rates: RatesByRoom;
  }
>;
