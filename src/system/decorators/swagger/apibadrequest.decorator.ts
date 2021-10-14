import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const CustomApiBadRequestResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
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
      },
    }),
  );
};
