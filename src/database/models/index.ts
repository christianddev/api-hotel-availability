import HotelModel from './HotelModel';
import RoomModel from './RoomModel';
import RateModel from './RateModel';
import InventoryModel from './InventoryModel';

HotelModel.hasMany(RoomModel);
RoomModel.belongsTo(HotelModel);

RoomModel.hasMany(RateModel);
RateModel.belongsTo(RoomModel);

RateModel.hasMany(InventoryModel);
InventoryModel.belongsTo(RateModel);

export { HotelModel, RoomModel, RateModel, InventoryModel };
