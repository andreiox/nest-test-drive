import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../response/user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'created_at',
  'updated_at',
] as const) {}
