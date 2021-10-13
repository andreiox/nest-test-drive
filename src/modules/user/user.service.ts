import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './repositories/user.repository';

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
    return this.repository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.save({
      ...updateUserDto,
      id,
    });
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
