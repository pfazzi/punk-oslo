import { Controller, Get, Param } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user';

@Controller('users')
export class UserController {
  constructor(private readonly repository: UserRepository) {}

  @Get()
  list(): User[] {
    return this.repository.getAll();
  }

  @Get(':username')
  get(@Param('username') username: string): User {
    return this.repository.oneByUsername(username);
  }
}
