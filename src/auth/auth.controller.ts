import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../lib/DTO/auth/authDTO';
import { AuthService } from './auth.service';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService
  ) {}

  @ApiOperation({summary: "Возвращает JWT-token"})
  @ApiResponse({status: 201})
  @Post()
  login(@Body() body: AuthDTO) {

  }
}
