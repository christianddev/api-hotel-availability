import type { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '',
  info: {
    title: '',
    version: ''
  },
  components: {
    schemas: {
      hotelRequest: {
        type: 'object',
        required: ['code', 'name'],
        properties: {
          code: {
            type: 'string',
            description: "Hotel's code, the code field must be unique."
          },
          name: {
            type: 'string',
            description: "Hotel's name."
          }
        },
        example: {
          code: 'hotelOF',
          name: 'Hotel Office Paper'
        }
      },
      hotelBadRequest: {
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
      hotelUpdateRequest: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: "hotel's code, the code field must be unique.",
            example: 'Hotel-O-P'
          },
          name: {
            type: 'string',
            description: "Hotel's name.",
            example: 'Hotel Office Paper'
          }
        },
        example: {
          code: 'Hotel-O-P',
          name: 'Hotel Office Paper'
        }
      },
      getHotels: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['hotels'],
            properties: {
              hotels: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['id', 'code', 'name'],
                  properties: {
                    id: {
                      type: 'number',
                      description:
                        'Assigned by the database, is used to identify the ledger in database queries (no in use).'
                    },
                    code: {
                      type: 'string',
                      description:
                        "hotel's code, the code field must be unique."
                    },
                    name: {
                      type: 'string',
                      description:
                        "hotel's name, the name field must be unique."
                    }
                  }
                }
              }
            }
          }
        }
      },
      hotel: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['hotel'],
            properties: {
              hotel: {
                type: 'object',
                required: ['id', 'code', 'name'],
                properties: {
                  id: {
                    type: 'number',
                    description:
                      'Assigned by the database, is used to identify the ledger in database queries (no in use).'
                  },
                  code: {
                    type: 'string',
                    description: "Hotel's name, the code field must be unique."
                  },
                  name: {
                    type: 'string',
                    description: "Hotel's name."
                  }
                }
              }
            }
          }
        }
      },
      hotelUpdate: {
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
      hotelDeleted: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['affectedRows'],
            properties: {
              affectedRows: {
                type: 'object',
                required: ['deletedHotelRelatedEntities', 'deletedHotel'],
                properties: {
                  deletedHotelRelatedEntities: {
                    type: 'number',
                    description:
                      'Number of hotel associations and other tables that have been **temporarily** or **permanently** deleted.'
                  },
                  deletedHotel: {
                    type: 'array',
                    description:
                      'Number of records in the **hotels** table that have been **temporarily** or **permanently** deleted.',
                    items: {
                      types: 'number',
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
  }
};

export default swaggerDefinition?.components?.schemas;
