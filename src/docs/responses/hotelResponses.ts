import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    responses: {
      postHotel: {
        description:
          'Returns the information of an hotel.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/hotel'
            },
            examples: {
              hotel: {
                $ref: '#/components/examples/hotel'
              }
            }
          }
        },
        links: {
          hotelCode: { $ref: '#/components/links/hotelCode' }
        }
      },
      postHotelBadRequest: {
        description:
          "Bad Request, Error related to the request data.<br><br>**name** fields must not be null, if you do not send this field, an error similar to `check **####** field` will be returned.<br><br>If the the **code** already exists in the database, it returns an error message similar to:<br>`a hotel exists with the code '###' & name '###'`.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/hotelBadRequest'
            },
            examples: {
              codeField: {
                $ref: '#/components/examples/codeField'
              },
              nameField: {
                $ref: '#/components/examples/nameField'
              },
              hotelsExists: {
                $ref: '#/components/examples/hotelsExists'
              }
            }
          }
        }
      },
      getHotels: {
        description:
          'Returns a list of hotels.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/getHotels'
            },
            examples: {
              hotelsList: {
                $ref: '#/components/examples/hotelsList'
              }
            }
          }
        }
      },
      getHotel: {
        description:
          'Returns the information of an hotel.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/hotel'
            },
            examples: {
              hotel: {
                $ref: '#/components/examples/hotel'
              }
            }
          }
        }
      },
      hotelNotFound: {
        description:
          'Not Found, The requested resource is not found,a **hotel** cannot be found for two reasons:<br><br> - There is no record related to the request CODE.<br><br> - Taking into account the setting of the environment variables `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`, the record may exist in the database, but is not available if the value of the **isDeleted** field is set to **true**.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/internalServerError'
            },
            examples: {
              hotelNotFound: {
                $ref: '#/components/examples/hotelNotFound'
              }
            }
          }
        }
      },
      patchHotel: {
        description:
          "Update the hotel's **name**,<br><br>Taking into account the setting of environment variables  `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/hotelUpdate'
            }
          }
        }
      },
      patchHotelBadRequest: {
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
              hotelsExists: {
                $ref: '#/components/examples/hotelsExists'
              }
            }
          }
        }
      },
      deletedHotel: {
        description: 'Delete a record temporarily.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/hotelDeleted'
            },
            examples: {
              hotelUpdatedRows: {
                $ref: '#/components/examples/hotelUpdatedRows'
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.responses;
