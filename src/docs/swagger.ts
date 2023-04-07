import swaggerJSDoc from 'swagger-jsdoc';

import type { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import links from './common/links';
import parameters from './common/parameters';
import defaultSchemas from './schemas/defaultSchemas';
import hotelSchemas from './schemas/hotelSchemas';
import hotelResponses from './responses/hotelResponses';
import defaultResponses from './responses/defaultResponses';
import hotelsExamples from './examples/hotelsExamples';
import { SERVER_ENVIRONMENT, SERVER_PORT } from '../config';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'API Hotel Availability',
    version: '0.0.1'
  },
  servers: [
    {
      url: `http://localhost:${SERVER_PORT}`
    },
    {
      url: `${SERVER_ENVIRONMENT}:${SERVER_PORT}`
    }
  ],
  components: {
    securitySchemes: {
      jwtAuth: {
        // TODO: check this
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: { ...defaultSchemas, ...hotelSchemas },
    parameters,
    responses: { ...defaultResponses, ...hotelResponses },
    links,
    examples: { ...hotelsExamples }
  }
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/v1/*.ts']
};

export default swaggerJSDoc(swaggerOptions);
