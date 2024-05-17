import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../lib/DTO/users/userDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../lib/DTO/users/user-entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService
  ) {}



  @ApiOperation({summary: "Возвращает массив пользователей"})
  @ApiResponse({status: 200})
  @Get()
  findUsers() {
    return this.UsersService.findUsers()
  }


  @ApiOperation({summary: "Создаёт и регистрирует пользователя"})
  @ApiResponse({status: 201})
  @Post()
  createUser(@Body() body: UserDTO) {
    return this.UsersService.createUser(body)
  }
}
