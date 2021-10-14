import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Andre',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Macedo',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'User email',
    example: 'contato@andremacedo.dev',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User phone',
    example: '+55 99 99999-9999',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
