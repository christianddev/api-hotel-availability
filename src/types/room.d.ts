export interface Room {
  id: number;
  code: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomRequest {
  id?: string;
  roomCode?: string;
  code?: string;
  name?: string;
  hotelId?: number;
  hotelCode?: string;
  isDeleted?: boolean;
}

export interface RoomDatabaseResponse {
  id?: string;
  code: string;
  name?: string;
  hotelId?: number;
  isDeleted?: boolean;
}
