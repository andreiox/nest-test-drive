import { IsIn, IsOptional } from 'class-validator';

export class GetUsersDto {
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sort?: string;
}
