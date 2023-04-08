export interface Rate {
  id: number;
  code: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RateRequest {
  id?: string;
  code?: string;
  rateCode?: string;
  name?: string;
  isDeleted?: boolean;
  roomId?: number;
  checkIn?: Date;
  checkout?: Date;
}

export interface RateDatabaseResponse {
  id?: string;
  code: string;
  name?: string;
  hotelId?: number;
  isDeleted?: boolean;
  checkIn?: Date;
  checkout?: Date;
}
