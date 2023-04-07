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
  code: string;
  name?: string;
  isDeleted?: boolean;
}
