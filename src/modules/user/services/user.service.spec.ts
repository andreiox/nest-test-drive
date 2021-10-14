import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import UserRepository from '../repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService;
  let userRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    userService = moduleRef.get<UserService>(UserService);
    userRepository = await moduleRef.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
