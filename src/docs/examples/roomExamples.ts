import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    examples: {
      roomExists: {
        summary: 'Room exists',
        description: 'The field **code** must be unique.',
        value: {
          error: {
            status: 400,
            message: "a room exists with the code '###'."
          }
        }
      },
      roomNotFound: {
        summary: 'Room not found',
        description: 'Resource not found.',
        value: {
          error: {
            status: 404,
            message: "room with code '###' not found"
          }
        }
      },
      room: {
        summary: 'Room',
        description: '',
        value: {
          data: {
            room: {
              id: 1,
              code: 'R001',
              name: 'Room 1'
            }
          }
        }
      },
      roomList: {
        summary: 'List of rooms',
        description: '',
        value: {
          data: {
            rooms: [
              {
                code: 'R001',
                name: 'Room 1a'
              },
              {
                code: 'R002',
                name: 'Room 21'
              }
            ]
          }
        }
      },
      roomUpdatedRows: {
        summary: 'Affected rows',
        description:
          'fields:**deletedRoom**: number of records in the **rooms** table that have been **temporarily** or **permanently** deleted.',
        value: {
          data: {
            affectedRows: {
              deletedRoom: [1]
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.examples;
