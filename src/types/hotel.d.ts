export interface Hotel {
  id: number;
  code: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HotelRequest {
  id?: string;
  code: string;
  name?: string;
  isDeleted?: boolean;
}
