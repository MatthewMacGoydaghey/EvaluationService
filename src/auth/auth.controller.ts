import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../lib/DTO/auth/authDTO';
import { AuthService } from './auth.service';
import { Public } from '../lib/DTO/auth/constats';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService
  ) {}

  @ApiOperation({summary: "Возвращает JWT-token"})
  @ApiResponse({status: 201})
  @Public()
  @Post()
  login(@Body() body: AuthDTO) {
    return this.AuthService.login(body)
  }
}
