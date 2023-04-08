import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    schemas: {
      roomRequest: {
        type: 'object',
        required: ['code', 'name'],
        properties: {
          code: {
            type: 'string',
            description: "Room's code, the code field must be unique."
          },
          name: {
            type: 'string',
            description: "Room's name."
          }
        },
        example: {
          code: 'R001',
          name: 'Deluxe Room'
        }
      },
      roomBadRequest: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            description: 'Contains information related to one or more errors.',
            properties: {
              status: {
                type: 'number',
                description: 'Status code associated with the error.'
              },
              message: {
                type: 'string',
                description: 'Description related to the error.'
              }
            }
          }
        }
      },
      roomUpdateRequest: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: "Room's code, the code field must be unique.",
            example: 'R001'
          },
          name: {
            type: 'string',
            description: "Room's name.",
            example: 'Deluxe Room'
          }
        },
        example: {
          code: 'R001',
          name: 'Deluxe Room'
        }
      },
      getRoom: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['rooms'],
            properties: {
              rooms: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['id', 'code', 'name'],
                  properties: {
                    id: {
                      type: 'number',
                      description:
                        'Assigned by the database, is used to identify the ledger in database queries (no in use), if the `EXCLUDE_ORM_FIELDS` option is active, this field is not returned.'
                    },
                    code: {
                      type: 'string',
                      description: "Room's code, the code field must be unique."
                    },
                    name: {
                      type: 'string',
                      description: "Room's name."
                    }
                  },
                  example: {
                    id: 1,
                    cone: 'R001',
                    code: 'Deluxe Room'
                  }
                }
              }
            }
          }
        }
      },
      room: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['room'],
            properties: {
              hotel: {
                type: 'object',
                required: ['id', 'code', 'name'],
                properties: {
                  id: {
                    type: 'number',
                    description:
                      'Assigned by the database, is used to identify the ledger in database queries (no in use), if the `EXCLUDE_ORM_FIELDS` option is active, this field is not returned.'
                  },
                  code: {
                    type: 'string',
                    description: "Room's code, the code field must be unique."
                  },
                  name: {
                    type: 'string',
                    description: "Room's name."
                  },
                  example: {
                    id: 1,
                    cone: 'R001',
                    code: 'Deluxe Room'
                  }
                }
              }
            }
          }
        }
      },
      roomUpdate: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['affectedRows'],
            properties: {
              affectedRows: {
                type: 'array',
                items: {
                  type: 'number',
                  description: 'number of records affected'
                }
              }
            }
          }
        }
      },
      roomDeleted: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['affectedRows'],
            properties: {
              affectedRows: {
                type: 'object',
                required: ['deletedHotel'],
                properties: {
                  deletedRoom: {
                    type: 'number',
                    description: 'Number of records affected.'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition?.components?.schemas;
