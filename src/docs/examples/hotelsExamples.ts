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
      },
      hotelsExists: {
        summary: 'Hotel exists',
        description: 'The field **code** must be unique.',
        value: {
          error: {
            status: 400,
            message: "a hotel exists with the code '###' & name '###'"
          }
        }
      },
      hotelNotFound: {
        summary: 'Hotel not found',
        description: 'Resource not found.',
        value: {
          error: {
            status: 404,
            message: "hotel with code '###' not found"
          }
        }
      },
      hotel: {
        summary: 'Hotel',
        description: '',
        value: {
          data: {
            hotel: {
              id: 1,
              code: 'hotel1a',
              name: 'Hotel 1a'
            }
          }
        }
      },
      hotelsList: {
        summary: 'List of hotels',
        description: '',
        value: {
          data: {
            hotels: [
              {
                id: 1,
                code: 'hotel1a',
                name: 'Hotel 1a'
              },
              {
                id: 2,
                code: 'hotel2',
                name: 'Hotel Office Paper'
              }
            ]
          }
        }
      },
      hotelUpdatedRows: {
        summary: 'Affected rows',
        description:
          'fields:<br><br>**deletedHotelRelatedEntities**: number of tables related with an hotel that have been **temporarily** or **permanently** deleted..<br><br>**deletedHotel**: number of records in the **hotels** table that have been **temporarily** or **permanently** deleted.',
        value: {
          data: {
            affectedRows: {
              deletedHotel: [1]
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.examples;
