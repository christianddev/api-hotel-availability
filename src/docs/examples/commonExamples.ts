import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    examples: {
      codeField: {
        summary: 'Code field validation',
        description: 'The **code** field is required.',
        value: {
          error: {
            status: 400,
            message: "check 'code' field"
          }
        }
      },
      nameField: {
        summary: 'Name field validation',
        description: 'The **name** field is required.',
        value: {
          error: {
            status: 400,
            message: "check 'name' field"
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.examples;
