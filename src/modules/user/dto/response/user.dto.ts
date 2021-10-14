import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'User id',
    example: '3f620513-42bd-4670-a731-e80c939ed9e4',
  })
  @IsString()
  id: string;

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

  @ApiProperty({
    description: 'User creation date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  created_at: Date;

  @ApiProperty({
    description: 'User update date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  updated_at: Date;
}
