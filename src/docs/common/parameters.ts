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
      }
    }
  }
};

export default swaggerDefinition?.components?.parameters;
