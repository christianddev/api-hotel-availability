import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    responses: {
      postRoom: {
        description:
          'Returns the information of an room.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/room'
            },
            examples: {
              room: {
                $ref: '#/components/examples/room'
              }
            }
          }
        },
        links: {
          roomCode: { $ref: '#/components/links/roomCode' }
        }
      },
      postRoomBadRequest: {
        description:
          "Bad Request, Error related to the request data.<br><br>**name** fields must not be null, if you do not send this field, an error similar to `check **####** field` will be returned.<br><br>If the the **code** already exists in the database, it returns an error message similar to:<br>`a room exists with the code '###'`.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/roomBadRequest'
            },
            examples: {
              codeField: {
                $ref: '#/components/examples/codeField'
              },
              nameField: {
                $ref: '#/components/examples/nameField'
              },
              roomExists: {
                $ref: '#/components/examples/roomExists'
              }
            }
          }
        }
      },
      getRooms: {
        description:
          'Returns a list of rooms.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/getRooms'
            },
            examples: {
              roomList: {
                $ref: '#/components/examples/roomList'
              }
            }
          }
        }
      },
      getRoom: {
        description:
          'Returns the information of an room.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/room'
            },
            examples: {
              room: {
                $ref: '#/components/examples/room'
              }
            }
          }
        }
      },
      roomNotFound: {
        description:
          'Not Found, The requested resource is not found,a **room** cannot be found for two reasons:<br><br> - There is no record related to the request CODE.<br><br> - Taking into account the setting of the environment variables `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`, the record may exist in the database, but is not available if the value of the **isDeleted** field is set to **true**.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/internalServerError'
            },
            examples: {
              roomNotFound: {
                $ref: '#/components/examples/roomNotFound'
              }
            }
          }
        }
      },
      patchroom: {
        description:
          "Update the room's **name**,<br><br>Taking into account the setting of environment variables  `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/roomUpdate'
            }
          }
        }
      },
      patchRoomBadRequest: {
        description:
          "Bad Request, Error related to the request data, **name** field must not be null,<br><br>If **code** or **name** field are not sent, it will return an error message similar to `check 'name' field`.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/internalServerError'
            },
            examples: {
              codeField: {
                $ref: '#/components/examples/codeField'
              },
              nameField: {
                $ref: '#/components/examples/nameField'
              },
              roomExists: {
                $ref: '#/components/examples/roomExists'
              }
            }
          }
        }
      },
      deletedRoom: {
        description: 'Delete a record temporarily.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/roomDeleted'
            },
            examples: {
              roomUpdatedRows: {
                $ref: '#/components/examples/roomUpdatedRows'
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.responses;
