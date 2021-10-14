import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import UserRepository from '../repositories/user.repository';

describe('UserController', () => {
  let userController;
  let userService;
  let userRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            find: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    userRepository = await moduleRef.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
