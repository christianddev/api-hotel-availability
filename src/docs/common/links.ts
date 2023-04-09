import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    links: {
      hotelCode: {
        operationId: 'getHotel',
        description:
          'The `code` value returned in the response can be used as the code parameter in:<br><br> - `GET`<br>api/v1/hotels/{hotelCode}<br> - `PATCH`<br>api/v1/hotels/{hotelCode}<br> - `DELETE`<br>api/v1/hotels/{hotelCode} and others request of **Rooms**, **Rates** & **Inventory**',
        parameters: {
          code: '$request.path.code'
        }
      },
      roomCode: {
        operationId: 'getRoom',
        description:
          'The `code` value returned in the response can be used as the code parameter in:<br><br> - `GET`<br>api/v1/hotels/{hotelCode}/rooms/{roomCode}<br> - `PATCH`<br>api/v1/hotels/{hotelCode}/rooms/{roomCode}<br> - `DELETE`<br>api/v1/hotels/{hotelCode}/rooms/{roomCode} and others request of **Rates** & **Inventory**',
        parameters: {
          code: '$request.path.code'
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.links;
