export const BadRequestSchema = {
  required: ['code', 'message'],
  properties: {
    code: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['msg', 'param'],
        properties: {
          msg: {
            type: 'string',
          },
          param: {
            type: 'string',
          },
        },
      },
    },
  },
};
