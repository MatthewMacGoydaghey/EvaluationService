import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../lib/DTO/users/user-entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../lib/DTO/users/userDTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UsersRepostitory: Repository<User>
  ) {}


  async findUsers() {
    const users = await this.UsersRepostitory.find()
    users.forEach((obj) => delete obj.password)
    return users
  }


  async findUser(id: number) {
    const foundUser = await this.UsersRepostitory.findOneBy({id})
    if (!foundUser) {
      throw new NotFoundException({message: `Студент c ID ${id} не найден`})
    }
    return foundUser
  }


  async createUser(body: UserDTO) {
  return this.UsersRepostitory.save(body)
  }
}
