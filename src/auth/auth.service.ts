import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../lib/DTO/users/user-entity';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from '../lib/DTO/auth/authDTO';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UsersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}


  async login(body: AuthDTO) {
    const {email, password} = body
    const foundUser = await this.UsersRepository.findOneBy({email})
    if (!foundUser) {
      throw new NotFoundException({Message: `Пользователь с почтой ${email} не найден`})
    }
    console.log(typeof password, typeof foundUser.password)
    if (!(password === foundUser.password)) {
      throw new ForbiddenException({Message: `Неверный пароль`})
    }
    const payload = {
      id: foundUser.id
    }
    const token = this.jwtService.sign(payload)
    return token
  }
}
