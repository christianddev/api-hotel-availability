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
          'The `code` value returned in the response can be used as the code parameter in:<br><br> - `GET`<br>api/v1/hotels/{code}<br> - `PATCH`<br>api/v1/hotels/{code}<br> - `DELETE`<br>api/v1/hotels/{code}.',
        parameters: {
          id: '$request.path.code'
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.links;
