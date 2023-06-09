import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    parameters: {
      hotelCode: {
        name: 'hotelCode',
        in: 'path',
        description: 'Code of the hotel to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      },
      roomCode: {
        name: 'roomCode',
        in: 'path',
        description: 'Code of the room to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      },
      rateCode: {
        name: 'rateCode',
        in: 'path',
        description: 'Code of the rate to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      },
      inventoryId: {
        name: 'inventoryId',
        in: 'path',
        description: 'Id of the inventory to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      },
      checkInDate: {
        name: 'checkInDate',
        in: 'path',
        description: 'Date of the inventory to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      },
      checkOutDate: {
        name: 'checkOutDate',
        in: 'path',
        description: 'Date of the inventory to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.parameters;
