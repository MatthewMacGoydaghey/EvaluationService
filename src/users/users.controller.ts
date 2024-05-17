import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../lib/DTO/users/userDTO';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../lib/DTO/users/user-entity';
import { Public } from '../lib/DTO/auth/constats';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService
  ) {}



  @ApiOperation({summary: "Возвращает массив пользователей"})
  @ApiResponse({status: 200})
  @ApiHeader({
    name: 'jwt',
    description: 'Ввести полученный после авторизации JWT-token',
  })
  @Get()
  @Header('Cache-Control', 'none')
  findUsers() {
    return this.UsersService.findUsers()
  }


  @ApiOperation({summary: "Создаёт и регистрирует пользователя"})
  @ApiResponse({status: 201})
  @Public()
  @Post()
  createUser(@Body() body: UserDTO) {
    return this.UsersService.createUser(body)
  }
}
