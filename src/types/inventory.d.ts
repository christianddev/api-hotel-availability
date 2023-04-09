export interface Inventory {
  id: number;
  code: string;
  name: string;
  date?: Date;
  price?: number;
  availability?: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryRequest {
  id?: number;
  code?: string;
  rateId?: number;
  date?: Date;
  price?: number;
  availability?: number;
  isDeleted?: boolean;
}

export interface InventoryDatabaseResponse {
  id?: string;
  code: string;
  name?: string;
  hotelId?: number;
  isDeleted?: boolean;
  checkIn?: Date;
  checkout?: Date;
}
