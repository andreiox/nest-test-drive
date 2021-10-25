import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import UserRepository from '../repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {},
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    repository = await moduleRef.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.save with param', async () => {
      repository.save = jest.fn();

      const user = { firstName: 'Andre', lastName: 'Macedo', age: 25 };
      await service.create(user);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should call repository.find', async () => {
      repository.find = jest.fn();

      await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne with param', async () => {
      repository.findOne = jest.fn().mockResolvedValue({ hello: true });

      await service.findOne('1234');

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith('1234');
    });

    it('should call throw user not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(undefined);

      try {
        await service.findOne('1234');
      } catch (e) {
        expect(e.message).toBe('User not found');
      }

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith('1234');
    });
  });

  describe('update', () => {
    it('should call repository.save with body and id', async () => {
      repository.save = jest.fn();

      const id = '1234';
      const user = { firstName: 'Andre', lastName: 'Macedo', age: 25 };
      await service.update(id, user);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith({ ...user, id });
    });
  });

  describe('remove', () => {
    it('should call repository.remove with param', async () => {
      repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await service.remove('1234');

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith('1234');
    });

    it('should call throw user not found', async () => {
      repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove('1234');
      } catch (e) {
        expect(e.message).toBe('User not found');
      }

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith('1234');
    });
  });
});
