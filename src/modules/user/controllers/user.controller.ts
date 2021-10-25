import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { GetUsersDto } from '../dto/request/get-users.dto';
import { UserDto } from '../dto/response/user.dto';
import { CustomApiBadRequestResponse } from '../../../system/decorators/swagger/apibadrequest.decorator';

@Controller('user')
@ApiTags('User')
@ApiHeader({
  name: 'client_id',
  required: true,
})
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create an User' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Headers('client_id') clientId: string,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 201,
    description: 'List of users',
    type: UserDto,
    isArray: true,
  })
  async findAll(@Query() params: GetUsersDto) {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an User' })
  @ApiResponse({
    status: 200,
    description: 'User with said id',
    type: UserDto,
  })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an User' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserDto,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an User' })
  @ApiResponse({
    status: 204,
    description: 'User deleted',
  })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
