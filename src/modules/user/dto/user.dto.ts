import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'User id',
    example: '3f620513-42bd-4670-a731-e80c939ed9e4',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Andre',
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Macedo',
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
  })
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    description: 'User email',
    example: 'contato@andremacedo.dev',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: 'User phone',
    example: '+55 99 99999-9999',
  })
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({
    description: 'User creation date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  readonly created_at: Date;

  @ApiProperty({
    description: 'User update date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  readonly updated_at: Date;
}
