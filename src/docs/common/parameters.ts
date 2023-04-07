import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    parameters: {
      code: {
        name: 'code',
        in: 'path',
        description: 'Code of the item to retrieve',
        required: true,
        schema: {
          type: 'string'
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.parameters;
