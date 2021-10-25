import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let app;

  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = moduleRef.get<UserController>(UserController);
    service = moduleRef.get<UserService>(UserService);
  });

  afterAll(async () => {
    app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should pass the create validation and call the service', async () => {
      const user = {
        firstName: 'Andre',
        lastName: 'Macedo',
        age: 25,
      };

      await request(app.getHttpServer()).post('/user').send(user).expect(201);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(user);
    });

    it('should throw bad request for empty body', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send({})
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: [
            'firstName must be a string',
            'lastName must be a string',
            'age must be a number conforming to the specified constraints',
          ],
        });

      expect(service.create).toHaveBeenCalledTimes(0);
    });
  });
});
