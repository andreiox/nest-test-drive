import { InjectRepository } from '@nestjs/typeorm';
import HttpError from 'src/system/errors/HttpError';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import UserRepository from '../repositories/user.repository';

export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) throw new HttpError(404, 'User not found');

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
    if (!response.affected) throw new HttpError(404, 'User not found');

    return response;
  }
}
