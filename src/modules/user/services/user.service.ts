import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import UserRepository from '../repositories/user.repository';

export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  helloworld = 'aaa';

  async create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.save({
      ...updateUserDto,
      id,
    });
  }

  async remove(id: string) {
    const response = await this.repository.delete(id);
    if (!response.affected) throw new NotFoundException('User not found');
  }
}
